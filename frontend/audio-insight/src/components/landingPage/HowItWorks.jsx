import { Box, Flex, Text, SimpleGrid } from "@chakra-ui/react";
import { IconUpload, IconBolt, IconBulb } from "@tabler/icons-react";
import { colors, fonts } from "../../theme/tokens";

const STEPS = [
  {
    icon: IconUpload,
    title: "Upload your audio",
    description: "Drag and drop a file or choose one — any common format, up to 200MB.",
  },
  {
    icon: IconBolt,
    title: "AI processes it",
    description: "Transcription, summarization, and speaker detection all run automatically in the background.",
  },
  {
    icon: IconBulb,
    title: "Get insights",
    description: "Read the transcript, generate a summary, or ask questions — translated into any language you need.",
  },
];

const HowItWorks = () => (
  <Box as="section" bg={colors.bgCanvas} px={6} pb={{ base: 20, md: 28 }}>
    <Box maxW="1160px" mx="auto">
      <Box textAlign="center" mb={12}>
        <Text fontFamily={fonts.heading} fontSize={{ base: "26px", md: "32px" }} fontWeight={600} letterSpacing="-0.01em" color={colors.textPrimary}>
          How it works
        </Text>
        <Text fontSize="15px" color={colors.textMuted} mt={2}>
          From audio to answers in three steps.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 8 }}>
        {STEPS.map((step, index) => (
          <Flex key={step.title} direction="column" align="center" textAlign="center">
            <Flex position="relative" w="56px" h="56px" borderRadius="16px" bg={colors.accentTint} align="center" justify="center" mb={5}>
              <step.icon size={24} color={colors.accent} />
              <Flex
                position="absolute"
                top="-8px"
                right="-8px"
                w="22px"
                h="22px"
                borderRadius="50%"
                bg={colors.accent}
                align="center"
                justify="center"
              >
                <Text fontSize="11px" fontWeight={700} color={colors.accentOn}>
                  {index + 1}
                </Text>
              </Flex>
            </Flex>
            <Text fontFamily={fonts.heading} fontSize="16px" fontWeight={600} color={colors.textPrimary} mb="8px">
              {step.title}
            </Text>
            <Text fontSize="13.5px" color={colors.textMuted} lineHeight="1.6" maxW="280px">
              {step.description}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  </Box>
);

export default HowItWorks;
