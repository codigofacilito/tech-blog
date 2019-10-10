/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import { Link } from 'gatsby';


export default ({currentPage, numPages})=>{
  let prevPage = currentPage - 1;
  if(prevPage >= 1) prevPage = 0;
  return(
    <div sx={{variant:"blocks.flexContainer"}}>
      <div style={{flex:1}}>
        {
          
          currentPage > 1 && <Link to={`/${prevPage == 0 ? '' : prevPage}`} sx={{variant:"buttons.flat"}}>Previous</Link>
        }
      </div>
      <div style={{ flex: 1, textAlign:"right" }}>
        {

          currentPage < numPages && <Link to={`/${currentPage + 1}`} sx={{ variant: "buttons.flat" }}>Next</Link>
        }
      </div>
      
    </div>
  );
}

