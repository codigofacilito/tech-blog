/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import PostCard from './post-card';

export default ({posts})=>{
  return(<div>
    {posts.map(post => (<PostCard post={post} />))}
  </div>);
}

