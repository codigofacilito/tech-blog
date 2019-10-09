module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-tech-blog`,
      options: {
        prefixWithDate: false,
        basePath: '/'
      }
    }
  ],
  siteMetadata: {
    title: "Blog - CódigoFacilito",
    siteUrl: "https://blog.codigofacilito.com"
  }
}
