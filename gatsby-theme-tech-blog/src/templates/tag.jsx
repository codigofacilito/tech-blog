import React from 'react';
import Post from '../components/post';
import Layout from '../components/layout';
import Tag from '../components/tag';

export default ({data}) => {
  
  return (
    <Layout>
      <Tag posts={data.allMarkdownRemark.edges.map(e => e.node.frontmatter)} />

    </Layout>
  )
}


export const pageQuery = graphql`
  query($tagID: String) {
    allMarkdownRemark(
      limit: 40
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tagID] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            slug
            author{
              name
            }
            tags
          }
        }
      }
    }
  }
`