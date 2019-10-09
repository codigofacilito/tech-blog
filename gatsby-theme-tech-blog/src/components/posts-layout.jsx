/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from 'theme-ui';
import PostCard from '../components/post-card';
import Sidebar from '../components/sidebar';

export default ({ posts, tags })=>{
  return(
    <Fragment>
      <div sx={{
        variant: "blocks.flexContainer"
      }}>
        <div sx={{
          width: "main"
        }}>
          { posts.map(post => ( <PostCard post={post} /> )) }
        </div>
        <div sx={{
          width: "sidebar",
          mt: 12,
          pl:12
        }}>
          <Sidebar tags={tags} />
        </div>
      </div>
      
    </Fragment>
  );
}

