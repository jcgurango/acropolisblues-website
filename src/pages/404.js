import { graphql } from 'gatsby';
import React from 'react';
import PageLayout from '../components/PageLayout';

const Home = ({ data }) => {
  return (
    <PageLayout background={data.backgroundImage} style={{ backgroundSize: 'cover', backgroundPosition: '75% center', textAlign: 'center' }} title="Not Found">
      <h1 style={{ fontFamily: 'Zoika Bold', fontSize: '64px', marginTop: '48px', marginBottom: '12px' }}>Not Found</h1>
      <main style={{ padding: '24px' }}>This page doesn't seem to exist. I might've moved it or deleted it. If you think this page should be here, send me an email at jc@acropolisblues.com!</main>
    </PageLayout>
  )
};

export default Home;

export const query = graphql`
  query {
    backgroundImage: file(relativePath: { eq: "404.jpg" }) {
      image: childImageSharp {
        portrait: fluid(maxWidth: 1080, maxHeight: 1920, quality: 90, cropFocus: CENTER) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
        landscape: fluid(maxWidth: 1920, maxHeight: 1080, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
  }
`;
