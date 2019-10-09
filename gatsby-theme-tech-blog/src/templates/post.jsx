import React from 'react';
import Post from '../components/post';
import Layout from '../components/layout';
import slugify from 'slugify'
import SEO from '../components/SEO';

export default ({ data })=>{
  const metadata = data.site.siteMetadata;
  const post = data.markdownRemark;
  return(
    <Layout>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || 'nothin’'}
        image={`/post-thumbs/${slugify(data.markdownRemark.frontmatter.title)}.png`}
        pathname={post.frontmatter.slug}
        article
      />
      <Post post={data.markdownRemark}  />
      
    </Layout>
  )
}


export const pageQuery = graphql`
  query($postID: String!) {
    markdownRemark(id: { eq: $postID } ) {
      htmlAst
      frontmatter{
        title
        date
        author{
          name
          email
        }
        tags
        
      }
    }
    site{
      siteMetadata{
        siteUrl
      }
    }
  }
`;