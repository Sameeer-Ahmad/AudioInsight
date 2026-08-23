import {
  Box,
  Flex,
  Text,
  IconButton,
  CloseButton,
  Drawer,
  DrawerContent,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import {
  IconMenu2,
  IconHome,
  IconAlignLeft,
  IconAlignCenter,
  IconMessageCircle,
  IconChevronDown,
  IconUser,
  IconLogout,
} from "@tabler/icons-react";
import { NavLink, useLocation } from "react-router-dom";
import { useLogout } from "../Logout/Logout";
import WaveformMark from "../../components/WaveformMark";
import { colors, fonts } from "../../theme/tokens";

const LinkItems = [
  { name: "Dashboard", icon: IconHome, path: "/dashboard" },
  { name: "Transcription", icon: IconAlignLeft, path: "/transcribe" },
  { name: "Summarization", icon: IconAlignCenter, path: "/summary" },
  { name: "Q&A", icon: IconMessageCircle, path: "/Qna" },
];

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const hideSidebarPaths = ["/login", "/signup", "/"];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);

  return (
    !shouldHideSidebar && (
      <Box
        w={{ base: "full", md: "264px" }}
        flexShrink={0}
        minH={{ base: "auto", md: "100vh" }}
        bg={colors.bgCanvas}
        color={colors.textPrimary}
      >
        <SidebarContent onClose={onClose} display={{ base: "none", md: "flex" }} />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      </Box>
    )
  );
}

function SidebarContent({ onClose, ...rest }) {
  const username = localStorage.getItem("username") || "Your account";
  const handleLogout = useLogout();

  const initials = username
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Flex
      direction="column"
      justify="space-between"
      bg={colors.bgSurface}
      borderRight={`1px solid ${colors.border}`}
      w={{ base: "full", md: "264px" }}
      pos="fixed"
      h="100vh"
      py={6}
      px={4}
      {...rest}
    >
      <Flex direction="column" gap={8}>
        <Flex align="center" gap="10px" px={2} py={1}>
          <WaveformMark size={32} color={colors.accent} tint={colors.accentTint} />
          <Text fontFamily={fonts.heading} fontWeight={600} fontSize="16px" letterSpacing="-0.01em" color={colors.textPrimary}>
            AudioInsight
          </Text>
          <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} ml="auto" />
        </Flex>

        <Flex direction="column" gap="2px">
          {LinkItems.map((link) => (
            <NavItem key={link.name} to={link.path} icon={link.icon} onClose={onClose}>
              {link.name}
            </NavItem>
          ))}
        </Flex>
      </Flex>

      <Flex direction="column" gap={2}>
        <Box h="1px" bg={colors.border} mb={1} />
        <Menu>
          <MenuButton
            display="flex"
            alignItems="center"
            gap="10px"
            px="10px"
            py="8px"
            borderRadius="12px"
            _hover={{ bg: colors.bgSurface2 }}
            _expanded={{ bg: colors.bgSurface2 }}
            w="full"
            textAlign="left"
          >
            <Flex align="center" gap="10px">
              <Flex
                w="32px"
                h="32px"
                borderRadius="50%"
                bg={colors.accent2Tint}
                align="center"
                justify="center"
                flexShrink={0}
              >
                <Text fontFamily={fonts.heading} fontSize="12px" fontWeight={600} color={colors.accent2}>
                  {initials || "?"}
                </Text>
              </Flex>
              <Flex direction="column" minW={0} flex={1}>
                <Text
                  fontSize="13px"
                  fontWeight={600}
                  color={colors.textPrimary}
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {username}
                </Text>
              </Flex>
              <IconChevronDown size={16} color={colors.textFaint} style={{ flexShrink: 0 }} />
            </Flex>
          </MenuButton>
          <MenuList bg={colors.bgSurface} borderColor={colors.border} p={2} mt={2}>
            <MenuItem
              as={NavLink}
              to="/profile"
              onClick={onClose}
              icon={<IconUser size={16} />}
              borderRadius="8px"
              bg={colors.bgSurface}
              color={colors.textSecondary}
              _hover={{ bg: colors.bgSurface2 }}
            >
              Profile
            </MenuItem>
            <MenuItem
              icon={<IconLogout size={16} />}
              onClick={handleLogout}
              borderRadius="8px"
              bg={colors.bgSurface}
              color={colors.textSecondary}
              _hover={{ bg: colors.bgSurface2 }}
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

function NavItem({ icon: Icon, children, to, onClose }) {
  return (
    <NavLink to={to} onClick={onClose} style={{ textDecoration: "none" }}>
      {({ isActive }) => (
        <Flex
          align="center"
          gap="12px"
          px="14px"
          py="10px"
          mx={0}
          borderRadius="10px"
          bg={isActive ? colors.accentTint : "transparent"}
          _hover={{ bg: isActive ? colors.accentTint : colors.bgSurface2 }}
        >
          <Icon size={19} color={isActive ? colors.accent : colors.textFaint} style={{ flexShrink: 0 }} />
          <Text
            fontSize="14px"
            fontWeight={isActive ? 600 : 500}
            color={isActive ? colors.textPrimary : colors.textTertiary}
          >
            {children}
          </Text>
        </Flex>
      )}
    </NavLink>
  );
}

function MobileNav({ onOpen, ...rest }) {
  return (
    <Flex
      w="full"
      px={4}
      height="20"
      alignItems="center"
      bg={colors.bgSurface}
      borderBottom={`1px solid ${colors.border}`}
      justifyContent="flex-start"
      gap={3}
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<IconMenu2 size={18} />}
        color={colors.textPrimary}
        borderColor={colors.border}
        _hover={{ bg: colors.bgSurface2 }}
      />
      <Flex align="center" gap="8px">
        <WaveformMark size={26} color={colors.accent} tint={colors.accentTint} radius="7px" gap="2px" />
        <Text fontFamily={fonts.heading} fontWeight={600} fontSize="15px" color={colors.textPrimary}>
          AudioInsight
        </Text>
      </Flex>
    </Flex>
  );
}
