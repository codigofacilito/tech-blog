/** @jsx jsx */
import React from 'react';
import { jsx,Styled } from 'theme-ui'
import renderAst from './rehype-app';
import Separator from './separator';
import PostHeader from './post-header';



export default ({ post }) => {
  const { htmlAst } = post;
  const { title, author, date, tags } = post.frontmatter;
  return(
    <article sx={{
      mb: 100
    }}>
      <PostHeader {...post.frontmatter}  />
      <Separator />
      <div>
        {
          renderAst(
            htmlAst
          )
        }
      </div>
    </article>
  )
}
