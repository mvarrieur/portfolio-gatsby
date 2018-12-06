/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const pageCreators = require('./page-creators');
const slug = require('./src/helpers/slug');

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  await pageCreators.projects(createPage, graphql);
  await pageCreators.projectTags(createPage, graphql);
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
