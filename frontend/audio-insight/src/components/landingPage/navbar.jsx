import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import WaveformMark from "../WaveformMark";
import { colors, fonts } from "../../theme/tokens";

export default function Navbar() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box position="sticky" top={0} zIndex={10} bg={colors.bgCanvas} borderBottom={`1px solid ${colors.border}`}>
      <Flex minH="64px" px={{ base: 5, md: 10 }} align="center" justify="space-between">
        <Link to="/">
          <Flex align="center" gap="10px">
            <WaveformMark size={30} color={colors.accent} tint={colors.accentTint} radius="8px" />
            <Text fontFamily={fonts.heading} fontWeight={600} fontSize="16px" color={colors.textPrimary} letterSpacing="-0.01em">
              AudioInsight
            </Text>
          </Flex>
        </Link>

        <Flex align="center" gap="10px">
          <Link to="/login">
            <Button
              variant="ghost"
              fontSize="14px"
              fontWeight={600}
              color={colors.textSecondary}
              _hover={{ bg: colors.bgSurface2 }}
              _active={{ bg: colors.bgSurface3 }}
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              display={{ base: "none", md: "inline-flex" }}
              bg={colors.accent}
              color={colors.accentOn}
              fontWeight={700}
              fontSize="13.5px"
              borderRadius="10px"
              _hover={{ bg: colors.accentStrong }}
            >
              Get Started
            </Button>
          </Link>
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onToggle}
            icon={isOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
            variant="ghost"
            color={colors.textPrimary}
            _hover={{ bg: colors.bgSurface2 }}
            _active={{ bg: colors.bgSurface3 }}
            aria-label="Toggle Navigation"
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Stack bg={colors.bgSurface} borderTop={`1px solid ${colors.border}`} p={4} spacing={3}>
          <Link to="/signup" onClick={onClose}>
            <Button w="full" bg={colors.accent} color={colors.accentOn} fontWeight={700} borderRadius="10px" _hover={{ bg: colors.accentStrong }}>
              Get Started
            </Button>
          </Link>
        </Stack>
      </Collapse>
    </Box>
  );
}
