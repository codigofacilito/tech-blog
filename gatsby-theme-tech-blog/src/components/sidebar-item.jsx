/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';
import { Link } from 'gatsby';

export default ({tag})=>{
  return(
    <li sx={{
      color: "dark",
      p:8,
      width:"full",
      mt:8
    }}>
      <div sx={{variant:"blocks.flexContainer"}} style={{alignItems:"center"}}>
        <Link to={`/tags/${tag.tag}`} sx={{variant:"buttons.flat"}} style={{flex:"1"}}>{tag.tag}</Link>
        <span sx={{ variant: "blocks.circleBadge", backgroundColor:"primaryDark", color:"dark" }}> {tag.totalCount} </span>
      </div>
    </li>
  );
}

