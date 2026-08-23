import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import WaveformMark from "../WaveformMark";
import { colors, fonts } from "../../theme/tokens";

const Hero = () => (
  <Box position="relative" overflow="hidden" bg={colors.bgCanvas} pt={{ base: 20, md: 28 }} pb={{ base: 20, md: 32 }} px={6}>
    <Box
      position="absolute"
      top="-160px"
      left="50%"
      transform="translateX(-50%)"
      w="720px"
      h="480px"
      borderRadius="50%"
      bg={colors.accentTint}
      filter="blur(120px)"
      pointerEvents="none"
    />

    <Flex position="relative" direction="column" align="center" textAlign="center" maxW="760px" mx="auto" gap={5}>
      <Flex align="center" gap="8px" bg={colors.bgSurface} border={`1px solid ${colors.border}`} borderRadius="20px" px="14px" py="6px">
        <WaveformMark size={20} color={colors.accent2} tint="transparent" radius="0" gap="2px" />
        <Text fontSize="12.5px" fontWeight={600} color={colors.textTertiary}>
          Transcription · Summarization · Q&amp;A, powered by AI
        </Text>
      </Flex>

      <Text
        as="h1"
        fontFamily={fonts.heading}
        fontWeight={600}
        letterSpacing="-0.02em"
        fontSize={{ base: "40px", md: "58px" }}
        lineHeight="1.08"
        color={colors.textPrimary}
      >
        Turn audio into
        <br />
        answers, instantly.
      </Text>

      <Text fontSize={{ base: "15px", md: "17px" }} color={colors.textMuted} maxW="540px" lineHeight="1.6">
        Upload any recording and AudioInsight transcribes it, summarizes it, and answers
        questions about it — in the language you need.
      </Text>

      <Flex gap="12px" mt={2} wrap="wrap" justify="center">
        <Link to="/signup">
          <Button
            bg={colors.accent}
            color={colors.accentOn}
            fontWeight={700}
            fontSize="14px"
            borderRadius="10px"
            px="24px"
            h="46px"
            rightIcon={<IconArrowRight size={17} />}
            _hover={{ bg: colors.accentStrong }}
          >
            Get Started Free
          </Button>
        </Link>
        <Link to="/login">
          <Button
            bg={colors.bgSurface2}
            color={colors.textPrimary}
            border={`1px solid ${colors.border}`}
            fontWeight={600}
            fontSize="14px"
            borderRadius="10px"
            px="24px"
            h="46px"
            _hover={{ bg: colors.bgSurface3 }}
          >
            Sign In
          </Button>
        </Link>
      </Flex>
    </Flex>
  </Box>
);

export default Hero;
