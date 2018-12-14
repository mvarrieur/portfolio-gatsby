const path = require('path');
const slug = require('../src/helpers/slug');

const BlogPostPageCreator = (createPage, graphql) => {
  /**
   * Blog Posts
   */
  const blogTemplate = path.resolve(`src/templates/blogPost.js`);
  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { fileAbsolutePath: { regex: "/(/content/blog)/.*.md$/" } }
      ) {
        edges {
          node {
            frontmatter {
              title
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
      const blogSlug = slug(node.frontmatter.title);
      console.log('creating blog', blogSlug);
      createPage({
        path: `blog/${blogSlug}`,
        component: blogTemplate,
        context: {
          slug: blogSlug,
        },
      });
    });

    return Promise.resolve(true);
  });
};

module.exports = BlogPostPageCreator;
