import React from "react";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
  Image,
  Avatar,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { ProjectName } from "./projectName";
import FeatureModal from "./modelComponent";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isModalOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Flex
        bg={"rgb(17,21,24)"}
        color={"white"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        style={{ borderBottomWidth: "0.2px" }}
        align={"center"}
      >
        <FeatureModal
          isOpen={isModalOpen}
          onClose={() => {
            onClose();
          }}
        />
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            _hover={{ bg: "none" }}
            bg={"none"}
            color={"white"}
            // variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <img
            src="./Logo.png"
            alt="AI Logo"
            width="50px"
            height="50px"
            // overflow={"hidden"}
            // objectFit={"cover"}
          />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav onOpen={onOpen} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Link to={"/login"}>
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={500}
              variant={"link"}
              href={"#"}
              color={"#CBD5E0"}
              pt={2}
            >
              Sign In
            </Button>
          </Link>
          <Link to={"/signup"}>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"#881337"}
              _hover={{  bg: "#4c0519" }}
              href={"#"}
              colorScheme="whiteAlpha"
            >
              Sign Up
            </Button>
          </Link>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ onOpen }) => {
  const linkColor = useColorModeValue("white", "black.200");
  const linkHoverColor = useColorModeValue("#CBD5E0", "#CBD5E0");
  const popoverContentBgColor = useColorModeValue("black", "black");

  return (
    <Stack direction={"row"} spacing={8} pt={3}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                borderWidth="0.2px"
                borderColor="#EDF2F7"
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                      onOpen={onOpen}
                      key={child.label}
                      {...child}
                    />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel, onOpen }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"} onClick={() => onOpen()}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "black" }}
            fontWeight={500}
            onClick={() => onOpen()}
            //  onClick={() => navItem.children && onOpen()}
          >
            {label}
          </Text>
          <Text _groupHover={{ color: "black" }} fontSize={"sm"}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"black"} w={6} h={6} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack bg={"black"} color={"white"} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  const LinkHoverColor = useColorModeValue("#CBD5E0", "#CBD5E0");
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={"white"}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box
                as="a"
                key={child.label}
                _hover={{ color: LinkHoverColor }}
                py={2}
                href={child.href}
              >
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Features",
    children: [
      {
        label: "Transcribe",
        subLabel: "Accurately transcribe your audio files with ease.",
        href: "#",
      },
      {
        label: "Summarization",
        subLabel: "Get concise summaries of your lengthy audio recordings.",
        href: "#",
      },
      {
        label: "Speaker Diarization",
        subLabel:
          "Identify and differentiate speakers in your audio recordings.",
        href: "#",
      },
      {
        label: "Audio Q&A",
        subLabel:
          "Create interactive Q&A sessions based on your audio content.",
        href: "#",
      },
    ],
  },

  {
    label: "Contact Us",
    href: "#",
  },
  {
    label: "About Us",
    href: "#",
  },
];
