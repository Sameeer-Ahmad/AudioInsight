import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import WaveformMark from "./WaveformMark";
import { colors, fonts } from "../theme/tokens";

const AuthCard = ({ title, subtitle, children, footer }) => (
  <Flex
    minH="100vh"
    align="center"
    justify="center"
    position="relative"
    bg={colors.bgCanvas}
    px={5}
    py={10}
    overflow="hidden"
  >
    <Box
      position="absolute"
      top="-160px"
      left="50%"
      transform="translateX(-50%)"
      w="640px"
      h="420px"
      borderRadius="50%"
      bg={colors.accentTint}
      filter="blur(120px)"
      pointerEvents="none"
    />

    <Link to="/" aria-label="Back to home">
      <IconButton
        position="absolute"
        top={{ base: 5, md: 8 }}
        left={{ base: 5, md: 8 }}
        icon={<IconArrowLeft size={18} />}
        aria-label="Back to home"
        bg={colors.bgSurface}
        border={`1px solid ${colors.border}`}
        color={colors.textSecondary}
        borderRadius="10px"
        _hover={{ bg: colors.bgSurface2 }}
      />
    </Link>

    <Box position="relative" w="full" maxW="420px" bg={colors.bgSurface} border={`1px solid ${colors.border}`} borderRadius="20px" p={{ base: 6, md: 8 }}>
      <Link to="/">
        <Flex align="center" gap="10px" mb={6} w="fit-content">
          <WaveformMark size={30} color={colors.accent} tint={colors.accentTint} radius="8px" />
          <Text fontFamily={fonts.heading} fontWeight={600} fontSize="16px" color={colors.textPrimary}>
            AudioInsight
          </Text>
        </Flex>
      </Link>

      <Text fontFamily={fonts.heading} fontSize="22px" fontWeight={600} letterSpacing="-0.01em" color={colors.textPrimary} mb="6px">
        {title}
      </Text>
      <Text fontSize="14px" color={colors.textMuted} mb={7} lineHeight="1.6">
        {subtitle}
      </Text>

      {children}

      {footer && (
        <Box mt={6} pt={6} borderTop={`1px solid ${colors.border}`} textAlign="center">
          {footer}
        </Box>
      )}
    </Box>
  </Flex>
);

export default AuthCard;
