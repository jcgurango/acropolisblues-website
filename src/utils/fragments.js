import { graphql } from 'gatsby';

export const BackgroundImage = graphql`
fragment BackgroundImage on File {
  image: childImageSharp {
    portrait: fluid(maxWidth: 1080, maxHeight: 1920, quality: 90) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
      ...GatsbyImageSharpFluidLimitPresentationSize
    }
    landscape: fluid(maxWidth: 1920, maxHeight: 1080, quality: 90) {
      ...GatsbyImageSharpFluid_withWebp_noBase64
      ...GatsbyImageSharpFluidLimitPresentationSize
    }
  }
}
`;
