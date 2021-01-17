import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { MainContainer } from '../components/Container';
import PageLayout from '../components/PageLayout';
import { H1, P } from '../components/Typography';

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
          <H1>A Young Man’s Acropolis Blues</H1>
          <P>The new year 2020 is expected to usher new music trends and interesting recording acts to eventually define the new roaring decade ahead.</P>
          <P>One act poised to stir the mix is Acropolis Blues, a Filipino artist who by all indication effortlessly veers away from the usual lot. While the music already reached public consciousness with a debut album released a couple of years back, the new era looks set to really establish the identity it possesses.</P>
          <P>Acropolis Blues is a stage name by JC Gurango, a young man whose musical sense is brought about by his uniqueness in both looks and mindset.  The 22-year old talent, who works as a freelance software developer when not making music, argued, “Having a stage name makes me feel intact as a person as I allow my artist-self to let loose for the sake of creativity and openness.”</P>
          <P> JC grew up in Acropolis Subdivision in the area of Libis, Quezon City. It’s where he got the blues as he began making music as soon as he reached double figures while listening to Eminem, Fort Minor, and Asher Roth. He was just 10 years old when he wrote his first composition. By the time he was 15, he learned to play the guitar — a development which gravitated his musical direction from rap towards rock as influenced by the likes of My Chemical Romance and Taking Back Sunday. Thanks to the music of Fun, the fun in dabbling with the craft really hit a new peak for him and helped mold the artist he is now.</P>
          <P>“When I first heard the music of Fun, it made me really start making music seriously,” he noted.</P>
          <P>Acropolis Blues will release its first single “City” anytime soon. The song boasts a catchy run that captures the excitement coming from its creator born in a world empowered by digital technology and chooses to truly enjoy it to the hilt. He mused, “I couldn’t recall ever living in an analog world. But that’s fine with me as long as the connection among people remains strong. The problem comes when we allow technology or smartphones to drive us apart.”</P>
          <P>While born and raised here in the Philippines, JC has the look of a foreigner and sounds like one after having studied in an international school. His genes and the way he had been raised actually make him feel like, in his own words, “an outsider in Manila.” But it’s kind of a good blessing especially with how the Filipino public regard good-looking foreigners with real talents to boot. It is to his advantage that he can speak Tagalog and his accent sounds undoubtedly cute to Filipino listeners.</P>
          <P>Truth be told, this promising man is deeply Filipino, with his penchant for listening to OPM Playlist on Spotify driving the point and emphasizing his need to touch base in things Pinoy to create relatable music. His 2018 album “The Marketplace” is an invitation to some place familiar and fine. Versatility, too, is in his DNA, being a multi-instrumentalist with the ability to play guitar, drums, bass, piano, and ukulele. He said that he makes use of his guitar-playing as an ‘extension of vocabulary.”</P>
          <P>JC is also a thespian, having been taught to harness that side of his in PETA.</P>
          <P>When asked about his take on the decade about to unfold, he’d rather be hopeful like his music. “If you focus on it, it’s really about progress and not perfection. I am trying to focus on being a better musician. Good music evokes emotion and I like emotions that everybody will understand.”</P>
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
  }
`;
