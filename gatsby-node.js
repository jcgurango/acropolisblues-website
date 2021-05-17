const path = require('path');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data: { discography: { nodes: discography } } } = await graphql(`
  query {
    discography: allDiscographyJson {
      nodes {
        slug
        unlisted
      }
    }
  }
  `);

  discography.forEach(({ slug, unlisted }) => {
    if (!unlisted) {
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
    }

    createPage({
      path: `/discography/${slug}/interstitial/`,
      component: path.resolve(`./src/templates/discography-interstitial.js`),
      context: {
        slug,
        headerImage: `discography/covers/${slug}.jpg`,
      },
    });
  });
};
