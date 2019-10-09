/** @jsx jsx */
import React from 'react';
import { jsx,Styled } from 'theme-ui';
import Author from './author';
import { Link } from 'gatsby';
import Tags from './tags';

export default ({post})=>{
  return(
    <Link to={post.slug}>
      <div sx={{
        variant: 'blocks.card',
        mt:12
      }}>
        <div sx={{
          variant: 'blocks.dark',
          minHeight: '200px'
        }} style={{display:'flex', alignItems:'flex-end'}}>
          <Styled.h3 sx={{ color: 'primaryDark', margin: 0 }} style={{ textDecoration: 'none'}}>
            {post.title}
          </Styled.h3>
          
        </div>
        <div sx={{p:12, variant:"blocks.flexContainer"}} >
          <div style={{flex:"1"}}><Author author={post.author} /></div>
          <div style={{ flex: 1 }}><Tags tags={post.tags} /></div>
          
        </div>
      </div>
    </Link>
  );
}

