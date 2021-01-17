const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data: { discography: { nodes: discography } } } = await graphql(`
  query {
    discography: allDiscographyJson {
      nodes {
        slug
      }
    }
  }
  `);

  discography.forEach(({ slug }) => {
    createPage({
      path: `/discography/${slug}/`,
      component: path.resolve(`./src/templates/discography-entry.js`),
      context: {
        slug,
        headerImage: `discography/covers/${slug}.jpg`,
        lyrics: `discography/lyrics/${slug}.md`,
        liners: `discography/linernotes/${slug}.md`,
      },
    });
  });
};
