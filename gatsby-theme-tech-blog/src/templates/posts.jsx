import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import PostsLayout from '../components/posts-layout';

export default ({ data }) => (
  <Layout>
    <PostsLayout posts={data.allMarkdownRemark.nodes.map(d => d.frontmatter)} tags={data.allMarkdownRemark.group} />
    
  </Layout>
)


export const pageQuery = graphql`
  {
    allMarkdownRemark{
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
      group(field: frontmatter___tags, limit: 15) {
        tag: fieldValue
        totalCount
      }
    }
  }
`;