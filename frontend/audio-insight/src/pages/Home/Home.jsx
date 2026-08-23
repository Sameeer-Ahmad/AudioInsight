import Navbar from "../../components/landingPage/navbar";
import Hero from "../../components/landingPage/Hero";
import HowItWorks from "../../components/landingPage/HowItWorks";
import Features from "../../components/landingPage/Features";
import { MovingCard } from "../../components/landingPage/movingCard";
import FAQ from "../../components/landingPage/FAQ";
import FinalCTA from "../../components/landingPage/FinalCTA";
import Footer from "../../components/footer";
import { Box } from "@chakra-ui/react";
import { colors } from "../../theme/tokens";

function Home() {
  return (
    <Box bg={colors.bgCanvas}>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <MovingCard />
      <FAQ />
      <FinalCTA />
      <Footer />
    </Box>
  );
}

export default Home;
