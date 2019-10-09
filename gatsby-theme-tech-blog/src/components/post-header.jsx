/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';
import Author from './author';
import DateBadge from './post-date';
import InlineSeparator from './inline-separator';
import Tags from './tags';

export default ({title,author,date,tags})=>{
  return(
    <header>
      <Styled.h1>{title}</Styled.h1>
      <div sx={{variant:"blocks.flexContainer"}}>
        <Author author={author} />
        <InlineSeparator />
        <DateBadge date={date} />
        <InlineSeparator />
        <div style={{display:"inline-block", flex:1}}>
          <Tags tags={tags} />
        </div>
        
      </div>
    </header>
  );
}

