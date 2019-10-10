module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-tech-blog`,
      options: {
        prefixWithDate: false,
        basePath: '/',
        pagination:{
          perPage: 2
        }
      }
    }
  ],
  siteMetadata: {
    title: "Blog - CódigoFacilito",
    siteUrl: "https://blog.codigofacilito.com"
  }
}
