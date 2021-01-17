import { graphql } from 'gatsby';
import React from 'react';
import PageLayout from '../components/PageLayout';

const Home = ({ data }) => {
  return (
    <PageLayout background={data.backgroundImage} style={{ backgroundSize: 'cover', backgroundPosition: '75% center' }} title="Home">
      <main className="visible-hidden" style={{ color: 'white' }}>
        My new single "City" focuses on my feelings of isolation. Living in my country I often feel like a stranger. If you feel that way too, I hope you know that you're far more than the sum of your parts. You're far more than a beating heart and pounds of skin. You have something to offer, something to say that needs to be heard. I hope someday, it will be.
      </main>
    </PageLayout>
  )
};

export default Home;

export const query = graphql`
  query {
    backgroundImage: file(relativePath: { eq: "bg-home.jpg" }) {
      image: childImageSharp {
        portrait: fluid(maxWidth: 1080, maxHeight: 1920, quality: 90, cropFocus: ENTROPY) {
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
