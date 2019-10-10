/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx } from 'theme-ui';
import PostCard from '../components/post-card';
import Sidebar from '../components/sidebar';
import Pagination from './pagination';

export default ({ posts, tags, paginationContext })=>{
  return(
    <Fragment>
      <div sx={{
        variant: "blocks.flexContainer"
      }}>
        <div sx={{
          width: "main"
        }}>
          { posts.map((post,index) => ( <PostCard post={post} key={index} /> )) }
          <div sx={{mt:20}}>
            <Pagination {...paginationContext} />
          </div>
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

