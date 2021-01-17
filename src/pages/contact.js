import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { MainContainer } from '../components/Container';
import PageLayout from '../components/PageLayout';
import { H1, P } from '../components/Typography';
import { SocialLinks } from '../components/Socials';
import media from '../media';

const Container = styled(MainContainer)`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 64px;
`;

const EmailLink = styled(H1)`
  font-size: 24px;

  ${media.desktopOnly} {
    font-size: 48px;
  }
`;

const Contact = ({ data }) => {
  return (
    <PageLayout background={data.backgroundImage} style={{ backgroundSize: 'cover', backgroundAttachment: 'fixed' }} title="Bio">
      <Container>
        <EmailLink>jc<span style={{ fontFamily: 'sans-serif' }}>@</span>acropolisblues.com</EmailLink>
        <P>Shoot me an email or find me on social media.</P>
        <div>
          <SocialLinks />
        </div>
      </Container>
    </PageLayout>
  )
};

export default Contact;

export const query = graphql`
  query {
    backgroundImage: file(relativePath: { eq: "bg-contact.jpg" }) {
      image: childImageSharp {
        portrait: fluid(maxWidth: 1080, maxHeight: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
        landscape: fluid(maxWidth: 1920, maxHeight: 1080, quality: 90, cropFocus: ENTROPY) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
  }
`;
