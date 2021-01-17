import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { MainContainer } from '../components/Container';
import PageLayout from '../components/PageLayout';
import BackgroundImage from 'gatsby-background-image';
import colors from '../colors';
import media from '../media';

const Container = styled(MainContainer)`
  @media only screen and (min-width: 1000px) {
    display: flex;
    flex-direction: row-reverse;

    > div {
      flex: 2;
    } 

    > .text {
      flex: 3;
      margin-left: 24px;
    }
  }
`;

const Description = styled.div`
  background-color: ${colors.grey1};
  padding: 24px 48px;
  text-align: center;

  > h1 {
    font-family: 'Zoika Bold';
  }

  > h2 {
    font-size: 20px;
  }

  ${media.desktopOnly} {
    marginn-bottom: 48px;
  }
`;

const AlbumImage = styled(Img)`
  width: 75%;
  max-width: 400px;
  margin-bottom: 24px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
`;

const DiscographyEntry = ({ data }) => {
  return (
    <PageLayout title={data.pageData.name}>
      <BackgroundImage fluid={data.headerImage.image.fluid} style={{ width: '100%', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundAttachment: 'fixed' }}>
        <AlbumImage fluid={data.albumArt.image.fluid} style={{ marginTop: '48px' }} />
        <Description>
          <h1>{data.pageData.name}</h1>
          <h2>{data.pageData.year} {data.pageData.type} by Acropolis Blues</h2>
        </Description>
      </BackgroundImage>
      <Container style={{ marginTop: '48px' }}>
        <div className="text" style={{ marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: data.linerNotes.markdown.html }} />
        <div style={{ textAlign: 'center', whiteSpace: 'pre-line', fontStyle: 'italic' }}>
          <iframe width="100%" height="52" title={`Listen to ${data.pageData.title}`} src={data.pageData.songlink} frameborder="0" allowfullscreen sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"></iframe>
          <div dangerouslySetInnerHTML={{ __html: data.lyrics.markdown.html }} style={{ marginTop: '24px' }} />
        </div>
      </Container>
    </PageLayout>
  )
};

export default DiscographyEntry;

export const query = graphql`
  query($slug: String, $headerImage: String, $lyrics: String, $liners: String) {
    pageData: discographyJson(slug: { eq: $slug }) {
      name
      type
      year
      slug
      links {
        type
        url
      }
    }
    headerImage: file(relativePath: { eq: $headerImage }) {
      image: childImageSharp {
        fluid(maxWidth: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
    albumArt: file(relativePath: { eq: $headerImage }) {
      image: childImageSharp {
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
    lyrics: file(relativePath: { eq: $lyrics }) {
      markdown: childMarkdownRemark {
        html
      }
    }
    linerNotes: file(relativePath: { eq: $liners }) {
      markdown: childMarkdownRemark {
        html
      }
    }
  }
`;
