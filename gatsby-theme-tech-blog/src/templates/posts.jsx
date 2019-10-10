import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostsLayout from '../components/posts-layout';

export default ({ data, pageContext }) => {
  console.log(pageContext);  
  return (
    <Layout>
      <PostsLayout paginationContext={pageContext} posts={data.allMarkdownRemark.nodes.map(d => d.frontmatter)} tags={data.posts.group} />
      
    </Layout>
  )
}


export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes{
        frontmatter{
          title
          date
          slug
          author{
            name
          }
          tags
        }
      }
      
    }
    posts: allMarkdownRemark{
      group(field: frontmatter___tags, limit: 15) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;