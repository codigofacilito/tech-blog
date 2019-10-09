import React from 'react';
import { Layout as ThemeLayout, Main  } from 'theme-ui'
import Header from './header';
import { useStaticQuery } from 'gatsby';
import { Helmet } from "react-helmet";

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>{metadata.site.siteMetadata.title}</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <Header />
      <Main>
        {props.children}
      </Main>
    </ThemeLayout>
  )
}