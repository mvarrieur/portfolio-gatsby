const path = require('path');
// const slug = require('../helpers/slug');
// const { uniq, get } = require('../helpers/lodash');

const ProjectTagsPageCreator = async (createPage, graphql) => {
  /**
   * Projects
   */
  const tagTemplate = path.resolve(`src/pages/projectTags.js`);
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/(/content/projects)/.*.md$/" } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 250)
            id
            frontmatter {
              title
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    createPage({
      path: `/tags/projects/`,
      component: tagTemplate,
    });

    return Promise.resolve(true);
  });
};

module.exports = ProjectTagsPageCreator;
