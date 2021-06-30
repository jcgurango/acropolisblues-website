import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { MainContainer } from '../components/Container';
import PageLayout from '../components/PageLayout';
import { H1 } from '../components/Typography';

const Container = styled(MainContainer)`
  @media only screen and (min-width: 1000px) {
    display: flex;
    flex-direction: row;

    > div {
      flex: 2;
    }

    > .text {
      flex: 3;
      margin-left: 24px;
    }
  }
`;

const Bio = ({ data }) => {
  return (
    <PageLayout background={data.backgroundImage} style={{ backgroundSize: 'cover' }} title="Bio">
      <Container>
        <div style={{ marginBottom: '16px' }}>
          <Img fluid={data.bioImage.image.fluid} width="100%" alt="Acropolis Blues on his guitar" style={{ marginLeft: 'auto', marginRight: 'auto' }} />
        </div>
        <div className="text">
          <H1>Biography</H1>
          <div dangerouslySetInnerHTML={{ __html: data.biography.markdown.html }} />
        </div>
      </Container>
    </PageLayout>
  )
};

export default Bio;

export const query = graphql`
  query {
    backgroundImage: file(relativePath: { eq: "bg-bio.jpg" }) {
      ...BackgroundImage
    }
    bioImage: file(relativePath: { eq: "bio.jpg" }) {
      image: childImageSharp {
        fluid(maxWidth: 500, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
    biography: file(relativePath: { eq: "bio.md" }) {
      markdown: childMarkdownRemark {
        html
      }
    }
  }
`;
