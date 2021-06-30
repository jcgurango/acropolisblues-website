import BackgroundImage from 'gatsby-background-image';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import styled from 'styled-components';
import '../style.css';
import colors from '../colors';
import { Link } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import media from '../media';
import Socials from './Socials';

const MainContainer = styled.div`
  font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
`;

const MainBackgroundImageContainer = styled(BackgroundImage)`
  font-family: Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;
  background-attachment: fixed;
  background-color: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
`;

const Logo = styled.img`
  width: 128px;

  ${media.mobileOnly} {
    width: 77px;
  }
`;

const MenuItemContainer = styled.nav`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;

  ${media.mobileOnly} {
    box-sizing: border-box;
    position: fixed;
    top: 0px;
    right: -75%;
    bottom: 0px;
    flex-direction: column;
    padding: 24px;
    width: 75%;
    background-color: ${colors.grey1};
    transition: right 0.5s;

    &.open {
      right: 0%;
    }
  }
`;

const MenuItem = styled(Link)`
  color: ${colors.text};
  text-decoration: none;
  margin-left: 12px;
  margin-right: 12px;
  font-size: 24px;
  font-family: 'Zoika Bold';
  transition: color 0.5s;

  :hover {
    color: ${colors.highlight};
  }

  ${media.mobileOnly} {
    margin-bottom: 8px;
  }
`;

const MobileOnlyIcon = styled(FontAwesomeIcon)`
  display: none;

  ${media.mobileOnly} {
    display: inline;
  }
`;

const CloseIcon = styled(MobileOnlyIcon)`
  color: ${colors.text};
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 24px;
`;

/**
 * @type {import('react').FunctionComponent<{
 *  title: String,
 *  background: any[],
 *  style: import('react').CSSProperties
 * }>}
 */
const PageLayout = ({
  title,
  background,
  style,
  children,
}) => {
  const fullStyle = { minHeight: '100%', paddingTop: '120px', boxSizing: 'border-box', ...style };

  const [withBg, setWithBg] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useScrollPosition(({ prevPos, currPos }) => {
    setWithBg(currPos.y !== 0);
  });

  const renderContents = () => {
    return (
      <>
        <Helmet
          title={`${title} — Acropolis Blues`}
          meta={[
            {
              name: 'description',
              content: 'Acropolis Blues is a Filipino Alternative Pop/Rock artist.',
            }
          ]}
        >
          <html lang="en" />
          <style>{'html, body { background-color: black; color: white; } a { color: white; }'}</style>
        </Helmet>
        {children}
        <nav className={`${withBg ? 'bg' : ''} menu-container`}>
          <Link to="/">
            <Logo src={require('../images/logo-horizontal.svg')} alt="Acropolis Blues" width="77" />
          </Link>
          <MenuItemContainer className={showMenu ? 'open' : ''}>
            <MenuItem to="/">home</MenuItem>
            <MenuItem to="/bio/">bio</MenuItem>
            <MenuItem to="/discography/">discography</MenuItem>
            <MenuItem to="/contact/">contact</MenuItem>
            <Socials mobile />
            <a href="/#" onClick={(e) => { setShowMenu(false); e.preventDefault(); }}>
              <CloseIcon icon={['fas', 'times']} />
              <span className="visible-hidden">Close Navigation Menu</span>
            </a>
          </MenuItemContainer>
          <Socials />
          <a href="/#" style={{ color: colors.text }} onClick={(e) => { setShowMenu(true); e.preventDefault(); }}>
            <MobileOnlyIcon icon={['fas', 'bars']} />
            <span className="visible-hidden">Open Navigation Menu</span>
          </a>
        </nav>
      </>
    );
  };

  if (background) {
    return (
      <MainBackgroundImageContainer style={fullStyle} fluid={[background.image.portrait, { ...background.image.landscape, media: '(orientation: landscape)'}]}>
        {renderContents()}
      </MainBackgroundImageContainer>
    );
  }

  return (
    <MainContainer>
      {renderContents()}
    </MainContainer>
  );
};

export default PageLayout;
