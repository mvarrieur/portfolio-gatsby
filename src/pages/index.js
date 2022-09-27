import React from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import Image from '../components/image';
import slug from '../helpers/slug';
import bostonSkyline from '../images/boston-skyline.jpg';
import portrait from '../images/portrait.png';
import gatsbyConfig from '../../gatsby-config';

/* eslint-disable react/jsx-one-expression-per-line */
const IndexPage = ({ data }) => {
  const { edges: projects } = data.allMarkdownRemark;

  return (
    <Layout>
      <header
        className="masthead custom-masthead"
        style={{
          backgroundImage: `url('${bostonSkyline}')`,
        }}
      >
        <div className="wrap">
          <Link
            to="/"
            className="site-logo"
            rel="home"
            title={gatsbyConfig.siteMetadata.title}
          >
            <img
              src={portrait}
              width="200"
              height="200"
              alt={`${gatsbyConfig.siteMetadata.title}`}
              className="animated fadeInDown home-logo"
            />
          </Link>
          <h1 className="feature-header">Michael Varrieur</h1>
          <h2 className="feature-header-2">Web Developer &mdash; Boston, MA</h2>
        </div>
      </header>

      <div id="main" role="main">
        <article className="entry">
          <div className="entry-wrapper">
            <header className="entry-header">
              <h1 id="work" className="entry-title">
                My Work
              </h1>
            </header>
            <div className="entry-content">
              <p>
                I have worked with a wide array of companies, from{' '}
                <em>mom-and-pops</em> to <strong>corporate giants.</strong> I
                strive to find the best solution for projects, big or small.
              </p>

              <p>
                From database architecture to front-end development, and the
                back-end in between, I have done it all. Take a look!
              </p>

              <div className="project-grid-container">
                {projects.map((project) => {
                  const { node: projectData } = project;
                  const { title, image } = projectData.frontmatter;

                  const imageFile = require(`../images/${image.home}`).default;
                  console.log('imageFile', imageFile);

                  return (
                    <div className="project-item">
                      <Link
                        className="project-link"
                        to={`/projects/${slug(title)}`}
                      >
                        <img
                          className="home-project-image"
                          src={imageFile}
                          alt={title}
                        />
                        <h1>{title}</h1>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </article>

        <article className="entry">
          <div className="entry-wrapper">
            <header className="entry-header">
              <h1 id="about" className="entry-title">
                About Me
              </h1>
            </header>
            <div className="entry-content">
              <p>
                I had the fortune of having <em>The Internet</em> before most
                people that I knew had a computer. In 1998 my cousin was
                visiting from California and showed me how he was starting his
                starting his own video game website; For the month he was around
                I learned how to create HTML pages, hyperlink them together, and
                how to upload my own AOL.com homepage to show off my stuff.
                Splash pages with &ldquo;click here to enter&rdquo; links and
                under construction gifs{' '}
                <sup>
                  <em>(gifs, not jifs...)</em>
                </sup>{' '}
                were now created by ME. It was <strong>amazing</strong>. When he
                left I continued to persue the hobby and picked up every book I
                could find about it at the library. I learned CSS, JavaScript,
                and a whole bunch of dynamic server side languages along the
                way. Now I am well versed in many back-end languages and
                front-end frameworks, as well as just about every database under
                the sun. I can work with what works best for you.
              </p>

              <p>
                I have been creating websites for over <strong>20</strong>{' '}
                years. What once was a curiosity in my childhood has bloomed
                into a fun and fulfilling career. I have been with the web every
                step of the way. I&lsquo;d love to join you on your next journey
                into the web world. Let&lsquo;s{' '}
                <a href="#contact">get in touch.</a>
              </p>
            </div>
          </div>
        </article>

        <article className="entry">
          <div className="entry-wrapper">
            <header className="entry-header">
              <h1 id="contact" className="entry-title">
                Contact
              </h1>
            </header>
            <div className="entry-content">
              <p>
                Do you want to work together? Reach out and drop me a line:{' '}
                <strong>
                  <em>
                    <a href="mailto:mike+website@varrieur.dev">
                      mike at varrieur dot dev
                    </a>
                  </em>
                </strong>
                .
              </p>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(/content/projects)/.*.md$/" } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            tags
            image {
              home
            }
          }
        }
      }
    }
  }
`;

/* eslint-enable react/jsx-one-expression-per-line */

export default IndexPage;
