/** @jsx jsx */
import React, { Fragment } from 'react';
import { jsx, Styled } from 'theme-ui';
import SidebarItem from './sidebar-item';

export default ({tags})=>{
  return(
    <Fragment>
      <Styled.h4 sx={{mt:0,mb:2}}>Categorías</Styled.h4>
      <ul sx={{
        p:0
      }}>
        {
          tags && tags.map((tag,index)=> <SidebarItem tag={tag} /> )
        }
      </ul>
    </Fragment>
  );
}

