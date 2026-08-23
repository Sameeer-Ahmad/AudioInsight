import {
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
} from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { colors, fonts } from "../../theme/tokens";

const FAQS = [
  {
    q: "What audio formats can I upload?",
    a: "MP3, WAV, M4A, OGG, WEBM, AAC, FLAC, AIFF, WMA, and MP4 — up to 200MB per file.",
  },
  {
    q: "What languages can I translate into?",
    a: "Transcripts and summaries can be translated into 15 languages, including English, Hindi, French, Spanish, German, Japanese, Korean, and more.",
  },
  {
    q: "Can I tell who's speaking in a transcript?",
    a: "Yes — when more than one speaker is detected, AudioInsight automatically labels each turn (Speaker A, Speaker B, ...) in the transcript.",
  },
  {
    q: "How does the Q&A feature work?",
    a: "Ask any question about an uploaded audio file and AudioInsight answers using only the content of that recording's transcript — grounded, not guessed.",
  },
  {
    q: "Is my audio stored securely?",
    a: "Uploaded files are tied to your account and only accessible to you — no one else can see your uploads, transcripts, or summaries.",
  },
  {
    q: "Do I need to install anything?",
    a: "No — AudioInsight runs entirely in your browser. Just sign up and start uploading.",
  },
];

const FAQ = () => (
  <Box as="section" bg={colors.bgCanvas} px={6} pb={{ base: 20, md: 28 }}>
    <Box maxW="760px" mx="auto">
      <Box textAlign="center" mb={10}>
        <Text fontFamily={fonts.heading} fontSize={{ base: "26px", md: "32px" }} fontWeight={600} letterSpacing="-0.01em" color={colors.textPrimary}>
          Frequently asked questions
        </Text>
      </Box>

      <Accordion allowToggle>
        {FAQS.map((item) => (
          <AccordionItem
            key={item.q}
            border="none"
            mb="10px"
            bg={colors.bgSurface}
            borderRadius="14px"
            overflow="hidden"
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton p="18px 20px" _hover={{ bg: colors.bgSurface2 }}>
                  <Flex flex="1" textAlign="left" fontSize="14.5px" fontWeight={600} color={colors.textPrimary}>
                    {item.q}
                  </Flex>
                  <IconChevronDown
                    size={18}
                    color={colors.textMuted}
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </AccordionButton>
                <AccordionPanel px="20px" pb="18px" pt={0}>
                  <Text fontSize="13.5px" color={colors.textMuted} lineHeight="1.65">
                    {item.a}
                  </Text>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  </Box>
);

export default FAQ;
