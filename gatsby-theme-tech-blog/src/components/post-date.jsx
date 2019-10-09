/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui'

import prettyDate from 'pretty-date';

export default ({ date }) => {
  if (!date) return <span></span>;
  return (
    <p
      sx={{
        variant: 'text.secondary',
        m:0
      }}
    >
      <span></span>
      {prettyDate.format(new Date(date))}
    </p>
  )
}