import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { colors, fonts } from "../../theme/tokens";

const FinalCTA = () => (
  <Box as="section" position="relative" overflow="hidden" bg={colors.bgCanvas} px={6} pb={{ base: 20, md: 28 }}>
    <Box maxW="1160px" mx="auto">
      <Box
        position="relative"
        overflow="hidden"
        bg={colors.bgSurface}
        border={`1px solid ${colors.border}`}
        borderRadius="24px"
        p={{ base: "40px 28px", md: "56px" }}
        textAlign="center"
      >
        <Box
          position="absolute"
          top="-100px"
          left="50%"
          transform="translateX(-50%)"
          w="480px"
          h="280px"
          borderRadius="50%"
          bg={colors.accentTint}
          filter="blur(100px)"
          pointerEvents="none"
        />

        <Box position="relative">
          <Text
            fontFamily={fonts.heading}
            fontSize={{ base: "26px", md: "34px" }}
            fontWeight={600}
            letterSpacing="-0.01em"
            color={colors.textPrimary}
            mb="12px"
          >
            Ready to turn your audio into insight?
          </Text>
          <Text fontSize="15px" color={colors.textMuted} mb="28px">
            Upload your first file and see the transcript, summary, and Q&amp;A in minutes.
          </Text>
          <Flex justify="center">
            <Link to="/signup">
              <Button
                bg={colors.accent}
                color={colors.accentOn}
                fontWeight={700}
                fontSize="14px"
                borderRadius="10px"
                px="26px"
                h="46px"
                rightIcon={<IconArrowRight size={17} />}
                _hover={{ bg: colors.accentStrong }}
              >
                Get Started Free
              </Button>
            </Link>
          </Flex>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default FinalCTA;
