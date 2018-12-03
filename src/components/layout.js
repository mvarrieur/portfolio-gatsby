import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import Footer from './footer';
import '../sass/main.scss';

const Layout = ({ children, bodyId }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content:
                'Michael Varrieur - A Boston, MA based web developer with a passion for all things web.',
            },
          ]}
        >
          <html lang="en" />
          <meta name="HandheldFriendly" content="True" />
          <meta name="MobileOptimized" content="320" />
          <meta name="theme-color" content="#5589d5" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <script
            src="https://use.edgefonts.net/source-sans-pro:n2,i2,n3,i3,n4,i4,n6,i6,n7,i7,n9,i9;source-code-pro:n4,n7;volkhov.js"
            async
          />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            integrity="sha384-XdYbMnZ/QjLh6iI4ogqCTaIjrFk87ip+ekIjefZch0Y+PvJ8CDYtEs1ipDmPorQ+"
            crossOrigin="anonymous"
          />

          <body id={bodyId} />
        </Helmet>
        <Header />
        {children}
        <Footer />
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  bodyId: PropTypes.string,
};

Layout.defaultProps = {
  bodyId: 'page',
};

export default Layout;
