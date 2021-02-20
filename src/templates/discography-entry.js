import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import BackgroundImage from 'gatsby-background-image';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faApple, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MainContainer } from '../components/Container';
import PageLayout from '../components/PageLayout';
import colors from '../colors';
import media from '../media';

library.add(faApple, faSpotify, faYoutube);

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

const ListenContainer = styled.div`
  text-align: left;
  display: ${({ mobile }) => mobile ? 'block' : 'none'};

  @media only screen and (min-width: 1000px) {
    display: ${({ mobile }) => mobile ? 'none' : 'block'};
  }
`;


const ListenLink = styled.a`
  display: block;
  text-align: center;
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 12px;
  font-size: 12px;
  padding: 8px 12px;
  color: ${({ color }) => (color || 'white')};
  border: 1px solid ${({ color }) => (color || 'white')};
  border-radius: 24px;
  text-decoration: none;

  > svg {
    font-size: 12px;
    margin-right: 4px;
  }

  @media only screen and (min-width: 1000px) {
    display: inline-block;
    margin-left: 0px;
    margin-top: 0px;
  }
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
      <ListenContainer mobile>
        {data.pageData.links.map((link) => (
          <ListenLink
            key={link.type}
            color={{
              spotify: '#1DB954',
              'spotify-presave': '#1DB954',
              'youtube-music': '#FF0000',
              youtube: '#FF0000'
            }[link.type]}
            href={link.url}
            target="_blank"
          >
            <FontAwesomeIcon
              icon={[
                'fab',
                {
                  spotify: 'spotify',
                  'spotify-presave': 'spotify',
                  apple: 'apple',
                  'youtube-music': 'youtube',
                  youtube: 'youtube'
                }[link.type],
              ]}
            />
            {{
              spotify: 'Listen on Spotify',
              'spotify-presave': 'Pre-Save on Spotify',
              apple: 'Listen on Apple Music',
              'youtube-music': 'Listen on YouTube',
              youtube: 'Watch on YouTube'
            }[link.type]}
          </ListenLink>
        ))}
      </ListenContainer>
      <Container style={{ marginTop: '48px' }}>
        <div className="text" style={{ marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: data.linerNotes.markdown.html }} />
        <div style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>
          <ListenContainer>
            {data.pageData.links.map((link) => (
              <ListenLink
                key={link.type}
                color={{
                  spotify: '#1DB954',
                  'spotify-presave': '#1DB954',
                  'youtube-music': '#FF0000',
                  youtube: '#FF0000'
                }[link.type]}
                href={link.url}
                target="_blank"
              >
                <FontAwesomeIcon
                  icon={[
                    'fab',
                    {
                      spotify: 'spotify',
                      'spotify-presave': 'spotify',
                      apple: 'apple',
                      'youtube-music': 'youtube',
                      youtube: 'youtube'
                    }[link.type],
                  ]}
                />
                {{
                  spotify: 'Listen on Spotify',
                  'spotify-presave': 'Pre-Save on Spotify',
                  apple: 'Listen on Apple Music',
                  'youtube-music': 'Listen on YouTube',
                  youtube: 'Watch on YouTube'
                }[link.type]}
              </ListenLink>
            ))}
          </ListenContainer>
          <div dangerouslySetInnerHTML={{ __html: data.lyrics.markdown.html }} style={{ marginTop: '24px', fontStyle: 'italic' }} />
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
