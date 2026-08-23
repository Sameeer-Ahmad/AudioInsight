import { Box, Text } from "@chakra-ui/react";
import { InfiniteMovingCards } from "../../utils/infinite-moving-cards";
import { colors, fonts } from "../../theme/tokens";

export function MovingCard() {
  return (
    <Box bg={colors.bgCanvas} pb={{ base: 16, md: 24 }} display={{ base: "none", lg: "block" }}>
      <Text
        fontFamily={fonts.heading}
        fontSize={{ base: "26px", md: "32px" }}
        fontWeight={600}
        letterSpacing="-0.01em"
        color={colors.textPrimary}
        textAlign="center"
        mb={10}
      >
        What people are saying
      </Text>
      <Box
        className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden"
      >
        <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
      </Box>
    </Box>
  );
}


const testimonials = [
  {
    quote:
      "Audio Insight has completely changed how we process audio data. The real-time transcription is accurate and has made a huge difference in our team discussions.",
    name: "Rohit Verma",
    title: "Project Manager at AudioWave Solutions",
  },
  {
    quote:
      "The summarization feature is a lifesaver! It efficiently condenses lengthy audio into insightful summaries, helping me focus on the key points without getting lost in the details.",
    name: "Anjali Mehra",
    title: "Research Analyst at SoundTech Labs",
  },
  {
    quote:
      "Audio Insight's audio Q&A feature is truly remarkable. It provides real-time, accurate responses to queries based on the audio, making our live sessions run smoothly.",
    name: "Vikram Singh",
    title: "Event Coordinator at LiveEvents India",
  },
  {
    quote:
      "With its seamless integration with MySQL and Node.js, Audio Insight has made it easy to manage our audio data efficiently. This tool has significantly improved our workflow.",
    name: "Nisha Kapoor",
    title: "Lead Developer at Sonic Systems Pvt. Ltd.",
  },
  {
    quote:
      "Audio Insight has cut down our podcast production time by half with its accurate transcription and summarization. It's an indispensable tool for our media production team.",
    name: "Rajesh Iyer",
    title: "Podcast Producer at VoiceBox Media India",
  },
];
