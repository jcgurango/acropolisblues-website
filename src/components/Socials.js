import React from 'react';
import styled from 'styled-components';
import '../style.css';
import colors from '../colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faSoundcloud, faSpotify, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import media from '../media';

library.add(faSpotify, faInstagram, faFacebookSquare, faSoundcloud, faTwitter, faYoutube, faBars, faTimes);

const SocialsContainer = styled.div`
  ${({ mobile }) => mobile ? (`
  display: none;

  ${media.mobileOnly} {
    display: block;
    margin-bottom: 8px;
    margin-top: auto;
  }
  `) : (`
  text-align: right;

  ${media.mobileOnly} {
    display: none;
  }
  `)}
`;

const SocialIcon = styled(FontAwesomeIcon)`
  color: ${colors.text};
  font-size: 20px;
  margin-left: 8px;
  transition: color 0.5s;

  :hover {
    color: ${colors.highlight};
  }
`;

export const SocialLinks = () => {
  return (
    <>
      <a href="https://spoti.fi/2WFgP5I">
        <SocialIcon icon={['fab', 'spotify']} />
        <span className="visible-hidden">Acropolis Blues on Spotify</span>
      </a>{/* eslint-disable-line */}
      <a href="https://www.instagram.com/acropolisblues/">
        <SocialIcon icon={['fab', 'instagram']} />
        <span className="visible-hidden">Acropolis Blues on Instagram</span>
      </a>{/* eslint-disable-line */}
      <a href="https://www.facebook.com/acropolisblues">
        <SocialIcon icon={['fab', 'facebook-square']} />
        <span className="visible-hidden">Acropolis Blues on Facebook</span>
      </a>{/* eslint-disable-line */}
      <a href="https://soundcloud.com/acropolisblues">
        <SocialIcon icon={['fab', 'soundcloud']} />
        <span className="visible-hidden">Acropolis Blues on SoundCloud</span>
      </a>{/* eslint-disable-line */}
      <a href="https://twitter.com/acropolisblues">
        <SocialIcon icon={['fab', 'twitter']} />
        <span className="visible-hidden">Acropolis Blues on Twitter</span>
      </a>{/* eslint-disable-line */}
      <a href="https://www.youtube.com/channel/UCma3jfZUt--VuZ9zibZKHKQ">
        <SocialIcon icon={['fab', 'youtube']} />
        <span className="visible-hidden">Acropolis Blues on Facebook</span>
      </a>{/* eslint-disable-line */}
    </>
  );
};

const Socials = (props) => {
  return (
    <SocialsContainer {...props}>
      <SocialLinks />
    </SocialsContainer>
  );
}

export default Socials;
