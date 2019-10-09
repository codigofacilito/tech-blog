import React from 'react';
import Post from '../components/post';
import Layout from '../components/layout';
import slugify from 'slugify'
import { Helmet } from "react-helmet";

export default ({ data })=>{
  const metadata = data.site.siteMetadata;
  return(
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{data.markdownRemark.frontmatter.title}</title>
        <meta property="og:title" content={data.markdownRemark.frontmatter.title} />
        <meta property="og:image" content={`${metadata.siteUrl}/post-thumbs/${slugify(data.markdownRemark.frontmatter.title)}.png`} />
      </Helmet>
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