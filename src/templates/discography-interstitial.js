import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faApple, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackgroundImage from 'gatsby-background-image';
import { Helmet } from 'react-helmet';

library.add(faApple, faSpotify, faYoutube);

const Description = styled.div`
  text-align: center;
  width: 75%;
  max-width: 400px;
  box-sizing: border-box;
`;

const AlbumImage = styled(Img)`
  width: 75%;
  max-width: 400px;
  margin-bottom: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
`;

const ListenLink = styled.a`
  font-family: Arial, Helvetica, sans-serif;
  display: block;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  padding: 8px 12px;
  color: ${({ color }) => (color ? 'white' : 'black')};
  background-color: ${({ color }) => (color || 'white')};
  border-radius: 24px;
  text-decoration: none;
  margin-top: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

  > svg {
    margin-right: 4px;
  }
`;

const DiscographyInterstitial = ({ data }) => {
  return (
    <BackgroundImage fluid={data.headerImage.image.fluid} style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundAttachment: 'fixed' }} id="bg">
      <Helmet>
        <script>{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
                      n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '806126813446059');
          fbq('track', 'PageView');
        `}</script>
        <noscript>{`<img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=806126813446059&ev=PageView&noscript=1"
          alt="FB Pixel"
        />`}</noscript>
        <meta name="description" content={`${data.pageData.name} is a ${data.pageData.year} ${data.pageData.type} by Acropolis Blues. The Filipino alternative pop-rock band led by JC Mijares-Gurango.`} />
        <style>{`html, body { width: 100%; height: 100%; padding: 0; margin: 0; background-color: black; } #bg:before { opacity: 0.35; }`}</style>
        <title>Listen to {data.pageData.name} by Acropolis Blues</title>
      </Helmet>
      <AlbumImage fluid={data.albumArt.image.fluid} />
      <Description>
        {data.pageData.links.map((link) => (
          <ListenLink
            key={link.type}
            color={{
              spotify: '#1DB954',
              'spotify-presave': '#1DB954',
              'youtube-music': '#FF0000',
              youtube: '#FF0000',
              'youtube-bts': '#FF0000',
            }[link.type]}
            href={link.url}
            rel="noopener noreferrer"
            target="_blank" 
            onClick={() => {
              window.fbq('trackCustom', 'Listen', { destination: link.type, song: data.pageData.slug });
            }}
          >
            <FontAwesomeIcon
              icon={[
                'fab',
                {
                  spotify: 'spotify',
                  'spotify-presave': 'spotify',
                  apple: 'apple',
                  'youtube-music': 'youtube',
                  youtube: 'youtube',
                  'youtube-bts': 'youtube',
                }[link.type],
              ]}
            />
            {{
              spotify: 'Listen on Spotify',
              'spotify-presave': 'Pre-Save on Spotify',
              apple: 'Listen on Apple Music',
              'youtube-music': 'Listen on YouTube',
              youtube: 'Watch Music Video on YouTube',
              'youtube-bts': 'Watch Behind the Scenes on YouTube'
            }[link.type]}
          </ListenLink>
        ))}
        <ListenLink href={`/discography/${data.pageData.slug}/`}>
          More Info
        </ListenLink>
      </Description>
    </BackgroundImage>
  )
};

export default DiscographyInterstitial;

export const query = graphql`
  query($slug: String, $headerImage: String) {
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
  }
`;
