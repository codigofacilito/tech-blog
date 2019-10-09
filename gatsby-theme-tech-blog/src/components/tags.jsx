/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';

export default ({tags})=>{
  return(
    <ul sx={{ variant:"blocks.flexContainer", p:0 }}>
      <span sx={{ variant: 'text.secondary' }}>Tags: </span>
      {tags && tags.map(tag=> ( <li sx={{mx:6, variant:"lists.noList"}}> <Link sx={{ color: "primary" }} to={`/tags/${tag}`}> {tag} </Link> </li> )) }
    </ul>
  );
}

