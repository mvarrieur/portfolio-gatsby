/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const pageCreators = require('./page-creators');
const slug = require('./src/helpers/slug');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  pageCreators.projects(createPage, graphql);
  pageCreators.projectTags(createPage, graphql);
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const markdownSlug = slug(node.frontmatter.title);
    createNodeField({
      node,
      name: 'slug',
      value: markdownSlug,
    });
  }
};
