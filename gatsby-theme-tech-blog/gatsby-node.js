const defaults = require('./defaults');
const fs = require(`fs`)
const slugify = require('slugify')
const dateHelpers = require('./src/utils/date-helpers');
const buildImage = require('./imageBuilder.js')

exports.onPreBootstrap = ({ reporter }, { contentPath = defaults.contentPath, navYMLPath = defaults.navYMLPath, basePath = defaults.basePath })=>{
  const imagesPath = defaults.imagesPath;
  [contentPath, navYMLPath, 'static', imagesPath].forEach(path=>{
    if (!fs.existsSync(path)) {
      reporter.info(`Creating the ${path} directory`);
      fs.mkdirSync(path);
    }
  });
  const mainNavYAMLPath = `${navYMLPath}/items.yaml`;
  if (!fs.existsSync(mainNavYAMLPath)) {
    reporter.info(`Creating the ${mainNavYAMLPath} file`);
    fs.writeFileSync(mainNavYAMLPath, `- title: Home
  link: /
- title: Posts
  link: ${basePath}`);
  }

}

exports.sourceNodes = ({actions})=>{
  actions.createTypes(`
    type Author implements Node{
      name: String!
      email: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      tags: [String!]!
      author: Author
      isPublished: Boolean,
      slug: String!
      date: Date!
      title: String!
    }
  `);
}

exports.createResolvers = ({ createResolvers }, { prefixWithDate = defaults.prefixWithDate, basePath = defaults.basePath })=>{
  createResolvers({
    Frontmatter: {
      slug: {
        resolve: (source) =>{
          const slug =  slugify(source.title, { replacement: '-', lower: true, })
          const date = new Date(source.date);
          return prefixWithDate ?
            `${basePath}${dateHelpers.getYear(date)}/${dateHelpers.getMonth(date)}/${dateHelpers.getDate(date)}/${slug}` :
            `${basePath}${slug}`
        }
      }
    }
  })
}


exports.createPages = async ({ actions, graphql, reporter }, { basePath = defaults.basePath, pagination = defaults.pagination }) => {
  const { createPage } = actions;

  const posts = (await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
              date
            }
          }
        }
      }
    }
  `)).data.allMarkdownRemark.edges;

  if (posts.errors) {
    return Promise.reject(posts.errors);
  }
  reporter.info(`Creating posts page and pagination`);

  const postsPerPage = pagination.perPage;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? basePath : `${basePath}${i + 1}`,
      component: require.resolve("./src/templates/posts.jsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  });
  
  reporter.info(`Creating each post page`);
  posts.forEach(async ({ node }) => {
    if (!node.frontmatter.slug) return;
    reporter.info(`Generating thumbs`);  

    await buildImage({
      text: node.frontmatter.title,
      fileName: `${slugify(node.frontmatter.title, { replacement: '-', lower: true, })}.png`,
      path: defaults.imagesPath
    });

    createPage({
      path: `${node.frontmatter.slug}`,
      component: require.resolve(`./src/templates/post.jsx`),
      context: {
        postID: node.id
      },
    });
  });

  const tags = await graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          tag: fieldValue
          id:fieldValue
        }
      }
    }
  `);
  if (tags.errors) {
    return Promise.reject(tags.errors);
  }

  reporter.info(`Creating tag pages`);

  tags.data.allMarkdownRemark.group.forEach(( t ) => {
    createPage({
      path: `tags/${slugify(t.tag, { replacement: '-', lower: true, })}`,
      component: require.resolve(`./src/templates/tag.jsx`),
      context: {
        tagID: t.id
      },
    });
  });


  
}