import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import slug from '../helpers/slug';

const Project = ({ data }) => {
  const post = data.markdownRemark;
  const { frontmatter } = post;
  const { title, image, color, tags, live_url: liveUrl } = frontmatter;
  const { html } = post;

  let featureImage;
  let circleImage;

  /* eslint-disable import/no-dynamic-require, global-require */
  if (image.feature) {
    featureImage = require(`../images/${image.feature}`);
  }
  if (image.circle) {
    circleImage = require(`../images/${image.circle}`);
  }
  /* eslint-enable import/no-dynamic-require, global-require */

  const css = `
    .project-body a, .project-body a:visited, .project-body a:active {
      color: ${color};
    }
  `;

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <style>{css}</style>
        <body id="post" />
      </Helmet>

      {image.feature && (
        <header
          className="masthead custom-masthead"
          style={{
            backgroundImage: `url('${featureImage}')`,
          }}
        >
          <div className="wrap">
            <Link to="/" className="site-logo" rel="home" title={title}>
              <img
                src={circleImage}
                width="200"
                height="200"
                alt={`${title} logo`}
                className="animated fadeInDown"
              />
            </Link>
          </div>
        </header>
      )}

      <div id="main" role="main" className="project-body">
        <article className="hentry">
          <div className="entry-wrapper">
            <header className="entry-header">
              <h1 className="entry-title text-center">{title}</h1>
            </header>

            <footer className="entry-meta">
              {liveUrl && (
                <Fragment>
                  <span>
                    <strong>Live Link:</strong>
                  </span>
                  <span>
                    <a href={liveUrl}>Visit URL</a>
                  </span>
                  <br />
                </Fragment>
              )}

              {tags && (
                <Fragment>
                  <span>
                    <strong>Featuring:</strong>
                  </span>
                  {tags.map(tag => (
                    <span key={slug(tag)}>
                      <a
                        href={`/tags/projects/#${slug(tag)}`}
                        title={`Pages tagged ${tag}`}
                      >
                        {tag}
                      </a>
                    </span>
                  ))}
                </Fragment>
              )}
            </footer>

            <div
              className="entry-content"
              dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
            />
          </div>
        </article>
      </div>
    </Layout>
  );
};

Project.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        color
        date
        title
        live_url
        tags
        image {
          feature
          circle
          home
        }
      }
    }
  }
`;

export default Project;
