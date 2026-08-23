import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import { IconAlignLeft, IconAlignCenter, IconMessageCircle } from "@tabler/icons-react";
import { QA, Summary, Transcribe } from "../../assets";
import { colors, fonts } from "../../theme/tokens";

const FEATURES = [
  {
    icon: IconAlignLeft,
    title: "Transcription",
    description:
      "Turn any audio file into an accurate, readable transcript — with speakers automatically labeled and the text translated into any language you need.",
    image: Transcribe,
  },
  {
    icon: IconAlignCenter,
    title: "Summarization",
    description:
      "Condense a long recording into a short, scannable summary in seconds, so you get the key points without reading the whole transcript.",
    image: Summary,
  },
  {
    icon: IconMessageCircle,
    title: "Audio Q&A",
    description:
      "Ask anything about an uploaded recording and get an answer grounded in its transcript — no digging through the audio yourself.",
    image: QA,
  },
];

const Features = () => (
  <Box as="section" id="features" bg={colors.bgCanvas} px={6} pb={{ base: 20, md: 28 }}>
    <Box maxW="1080px" mx="auto">
      <Box textAlign="center" mb={{ base: 14, md: 20 }}>
        <Text fontFamily={fonts.heading} fontSize={{ base: "26px", md: "32px" }} fontWeight={600} letterSpacing="-0.01em" color={colors.textPrimary}>
          Everything your audio needs
        </Text>
        <Text fontSize="15px" color={colors.textMuted} mt={2}>
          Three tools, one upload.
        </Text>
      </Box>

      <VStack spacing={{ base: 14, md: 24 }} align="stretch">
        {FEATURES.map((feature, index) => (
          <Flex
            key={feature.title}
            direction={{ base: "column", md: index % 2 === 0 ? "row" : "row-reverse" }}
            align="center"
            gap={{ base: 8, md: 14 }}
          >
            <Box flex="1" maxW={{ md: "380px" }} w="full">
              <Flex w="52px" h="52px" borderRadius="14px" bg={colors.accentTint} align="center" justify="center" mb={5}>
                <feature.icon size={24} color={colors.accent} />
              </Flex>
              <Text fontFamily={fonts.heading} fontSize="22px" fontWeight={600} color={colors.textPrimary} mb="10px">
                {feature.title}
              </Text>
              <Text fontSize="15px" color={colors.textMuted} lineHeight="1.7">
                {feature.description}
              </Text>
            </Box>

            <Box
              flex="1.3"
              w="full"
              bg={colors.bgSurface}
              border={`1px solid ${colors.border}`}
              borderRadius="18px"
              overflow="hidden"
              boxShadow="0 24px 60px -20px rgba(0,0,0,0.5)"
            >
              <Image src={feature.image} alt={feature.title} w="full" h="auto" display="block" />
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  </Box>
);

export default Features;
