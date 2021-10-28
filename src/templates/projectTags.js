import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';

import Layout from '../components/layout';
import slug from '../helpers/slug';
import { get, findIndex, sortBy } from '../helpers/lodash';

const ProjectTags = ({ data }) => {
  const posts = data.allMarkdownRemark.edges;

  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  posts.forEach((edge) => {
    if (get(edge, 'node.frontmatter.tags')) {
      const project = edge.node;
      const projectTags = project.frontmatter.tags;

      projectTags.forEach((projectTag) => {
        const projectUrl = `/projects/${slug(project.frontmatter.title)}`;
        let idx = -1;

        if (tags.length > 0) {
          idx = findIndex(tags, ['name', projectTag]);
        }

        if (idx === -1) {
          tags = tags.concat({
            name: projectTag,
            links: [],
          });

          idx = tags.length - 1;
        }

        tags[idx].links = tags[idx].links.concat({
          title: project.frontmatter.title,
          link: projectUrl,
        });
      });
    }
  });

  tags = sortBy(tags, (cTag) => get(cTag, 'links.length', 100) * -1);

  return (
    <Layout>
      <Helmet>
        <title>Project Tags</title>
      </Helmet>
      <div id="main" role="main" className="project-body">
        <article className="entry">
          <div className="entry-wrapper">
            <header className="entry-header">
              <h1 className="entry-title">Project Tags</h1>
            </header>
            <div className="entry-content">
              <ul className="tag-box inline">
                {tags.map((currentTag) => (
                  <li>
                    <a href={`#${slug(currentTag.name)}`}>
                      {currentTag.name}
                      <span>{currentTag.links.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
              {tags.map((currentTag) => (
                <Fragment>
                  <h2 id={slug(currentTag.name)}>{currentTag.name}</h2>
                  <ul className="post-list">
                    {currentTag.links.map((projectLink) => (
                      <li>
                        <Link to={projectLink.link}>{projectLink.title}</Link>
                      </li>
                    ))}
                  </ul>
                </Fragment>
              ))}
            </div>
          </div>
        </article>
      </div>
    </Layout>
  );
};

ProjectTags.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export const pageQuery = graphql`
  query ($tags: [String]) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/(/content/projects)/.*.md$/" }
        frontmatter: { tags: { in: $tags } }
      }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;

export default ProjectTags;
