import React from 'react';
import { Layout as ThemeLayout, Main  } from 'theme-ui'
import Header from './header';
import { useStaticQuery } from 'gatsby';
import { Helmet } from "react-helmet";
import SEO from './SEO';

export default (props) => {
  const metadata = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return(
    <ThemeLayout>
      <SEO />
      <Header />
      <Main>
        {props.children}
      </Main>
    </ThemeLayout>
  )
}