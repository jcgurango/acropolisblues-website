import { graphql, Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';
import colors from '../colors';
import { MainContainer } from '../components/Container';
import PageLayout from '../components/PageLayout';

const Container = styled(MainContainer)`
  display: grid;
  grid-template-columns: auto;
  justify-content: center;
  grid-template-rows: auto;
  row-gap: 60px;

  @media only screen and (min-width: 900px) {
    grid-template-columns: auto auto;
    justify-content: space-evenly;
  }

  @media only screen and (min-width: 1400px) {
    grid-template-columns: auto auto auto;
    justify-content: space-evenly;
  }

  padding-bottom: 64px;
`;

const ItemContainer = styled(Link)`
  display: block;
  position: relative;

  :hover > .details {
    opacity: 1 !important;
  }
`;

const ItemDetailsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  transition: opacity 0.25s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ItemName = styled.h3`
  font-family: 'Zoika Bold';
  color: ${colors.grey1};
  font-size: 36px;
  margin: 0px;
  margin-bottom: 12px;
`;

const ItemDescription = styled.h4`
  color: ${colors.grey1};
  font-size: 16px;
  margin: 0px;
`;

const Discography = ({ data }) => {
  const discography = data.music.nodes;
  const images = data.images.nodes;

  return (
    <PageLayout background={data.backgroundImage} style={{ backgroundSize: 'cover', backgroundPosition: 'center 20%' }} title="Discography">
      <Container>
        {discography.slice(0).reverse().map(({ slug, name, type, year }) => (
          <ItemContainer to={`/discography/${slug}/`} key={slug}>
            <Img fixed={images.find(({ relativePath }) => String(relativePath).startsWith(`discography/covers/${slug}`)).sharp.fixed} />
            <ItemDetailsContainer style={{ opacity: 0 }} className="details">
              <ItemName>{name}</ItemName>
              <ItemDescription>{year} {type}</ItemDescription>
            </ItemDetailsContainer>
          </ItemContainer>
        ))}
      </Container>
    </PageLayout>
  )
};

export default Discography;

export const query = graphql`
  query {
    backgroundImage: file(relativePath: { eq: "bg-discography.jpg" }) {
      image: childImageSharp {
        portrait: fluid(maxWidth: 1080, maxHeight: 1920, quality: 90) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
        landscape: fluid(maxWidth: 1920, maxHeight: 1080, quality: 90, cropFocus: NORTH) {
          ...GatsbyImageSharpFluid_withWebp_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
    music: allDiscographyJson {
      nodes {
        name
        type
        year
        slug
      }
    }
    images: allFile(filter: {relativePath: {regex: "/^discography\/covers\/.*/"}}) {
      nodes {
        relativePath
        sharp: childImageSharp {
          fixed(width: 360, height: 360) {
            ...GatsbyImageSharpFixed_withWebp_noBase64
          }
        }
      }
    }
  }
`;
