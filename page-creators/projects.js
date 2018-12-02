const path = require('path');
const slug = require('../src/helpers/slug');

const ProjectPageCreator = (createPage, graphql) => {
  /**
   * Projects
   */
  const projectTemplate = path.resolve(`src/templates/project.js`);
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
              date(formatString: "MMMM DD, YYYY")
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      const projectSlug = slug(node.frontmatter.title);
      createPage({
        path: `projects/${projectSlug}`,
        component: projectTemplate,
        context: {
          slug: projectSlug,
        },
      });
    });

    return Promise.resolve(true);
  });
};

module.exports = ProjectPageCreator;
