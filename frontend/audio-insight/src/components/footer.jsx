"use client";

import {
  Box,
  chakra,
  Container,
  SimpleGrid,
  Stack,
  Text,
  VisuallyHidden,
  Input,
  IconButton,
} from "@chakra-ui/react";

import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BiMailSend } from "react-icons/bi";
import WaveformMark from "./WaveformMark";
import { colors, fonts } from "../theme/tokens";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={colors.bgSurface2}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      color={colors.textTertiary}
      transition={"background 0.3s ease"}
      _hover={{
        bg: colors.bgSurface3,
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={600} fontSize={"14px"} color={colors.textPrimary} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box bg={colors.bgSurface} color={colors.textTertiary} borderTop={`1px solid ${colors.border}`}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box display="flex" alignItems="center" gap="10px">
              <WaveformMark size={28} color={colors.accent} tint={colors.accentTint} radius="8px" />
              <Text fontFamily={fonts.heading} fontWeight={600} fontSize="15px" color={colors.textPrimary}>
                AudioInsight
              </Text>
            </Box>
            <Text fontSize={"13px"}>
              © 2026 AudioInsight. All rights reserved.
            </Text>
            <Stack direction={"row"} spacing={4}>
              <SocialButton label={"Twitter"} href={"#"}>
                <FaTwitter size={14} />
              </SocialButton>
              <SocialButton label={"YouTube"} href={"#"}>
                <FaYoutube size={14} />
              </SocialButton>
              <SocialButton label={"Instagram"} href={"#"}>
                <FaInstagram size={14} />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack align={"flex-start"} fontSize="13.5px" spacing={3}>
            <ListHeader>Company</ListHeader>
            <Box as="a" href={"#"}>
              About us
            </Box>
            <Box as="a" href={"#"}>
              Blog
            </Box>
            <Box as="a" href={"#"}>
              Contact us
            </Box>
          </Stack>
          <Stack align={"flex-start"} fontSize="13.5px" spacing={3}>
            <ListHeader>Support</ListHeader>
            <Box as="a" href={"#"}>
              Help Center
            </Box>
            <Box as="a" href={"#"}>
              Terms of Service
            </Box>
            <Box as="a" href={"#"}>
              Privacy Policy
            </Box>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>
            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={colors.bgSurface2}
                border={`1px solid ${colors.border}`}
                fontSize="13.5px"
                _placeholder={{ color: colors.textDim }}
                _focus={{
                  bg: colors.bgSurface3,
                  borderColor: colors.accent,
                }}
              />
              <IconButton
                color={colors.accentOn}
                bg={colors.accent}
                _hover={{ bg: colors.accentStrong }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
