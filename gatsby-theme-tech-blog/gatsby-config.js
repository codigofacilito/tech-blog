const defaults = require('./defaults');

module.exports = ({
  contentPath = defaults.contentPath, 
  navYMLPath = defaults.navYMLPath,
  basePath = defaults.basePath,
  prefixWithDate = defaults.prefixWithDate
})=> ({
  plugins:[
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentPath,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: navYMLPath,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-component', `gatsby-remark-prismjs` ]
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `montserrat\:300,400,600,700` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    `gatsby-transformer-yaml`, 
  ],
  siteMetadata: {
    title: "My Awesome blog",
    siteUrl: "localhost:8000"
  }
})