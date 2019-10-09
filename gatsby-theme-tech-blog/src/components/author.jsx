/** @jsx jsx */
import React from 'react';

import { jsx } from 'theme-ui'


export default ({author}) => {
  if(!author) return <span></span>;
  return(
    <p
      sx={{
        variant: 'text.secondary',
        m:0
      }}
    >
      By: <span sx={{
        color: 'primary'
      }}>{author.name} </span>
    </p>
  )
}