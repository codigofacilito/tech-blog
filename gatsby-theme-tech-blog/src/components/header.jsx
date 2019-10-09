/** @jsx jsx */
import React from 'react';
import { Main } from 'theme-ui'
import { jsx } from 'theme-ui'
import { Link ,useStaticQuery,graphql } from 'gatsby';

export default (props) => {
  const { allItemsYaml } = useStaticQuery(graphql`
    {
      allItemsYaml {
        nodes {
          id
          title
          link
        }
      }
    }
  `)
  const items = allItemsYaml.nodes;
  return(
    <header
      sx={{
        variant: 'blocks.dark',
      }}
    >
      <nav >
        <Main>
          {
            items.map((item,index)=>(
              <Link key={index} sx={{color:"primaryDark",mr:20}} to={item.link}>{item.title}</Link>
            ))
          }
        </Main>
      </nav>
    </header>
  )
}

