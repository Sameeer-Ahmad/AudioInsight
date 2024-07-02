import {
  Box,
  Flex,
  Text,
  IconButton,
  useColorModeValue,
  CloseButton,
  Drawer,
  DrawerContent,
  useDisclosure,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

import { FiChevronDown, FiMenu } from "react-icons/fi";
import { IoHomeSharp } from "react-icons/io5";
import { MdQuestionAnswer, MdSummarize } from "react-icons/md";
import { FaQuoteRight } from "react-icons/fa";
import { RxActivityLog } from "react-icons/rx";
import { NavLink, useLocation } from "react-router-dom";
import Logout from "../Logout/Logout";
import { useState } from "react";
import Popup from "../../components/popup";

const LinkItems = [
  { name: "Dashboard", icon: IoHomeSharp, path: "/dashboard" },
  { name: "Transcriptions", icon: FaQuoteRight, path: "/transcribe" },
  { name: "Summarizatons", icon: MdSummarize, path: "/summary" },
  { name: "Diarizations", icon: RxActivityLog, path: "/diarization" },
  { name: "Q&A", icon: MdQuestionAnswer, path: "/Qna" },
];

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const hideSidebarPaths = ["/login", "/signup", "/"];
  const shouldHideSidebar = hideSidebarPaths.includes(location.pathname);
  return (
    !shouldHideSidebar && (
      <Box minH="100vh" bg={"rgb(17,21,24)"} color={"white"}>
        <SidebarContent
          onClose={onClose}
          display={{ base: "none", md: "block" }}
        />
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
        <Box ml={{ base: 0, md: 80 }} p="4"></Box>
      </Box>
    )
  );
}

function SidebarContent({ onClose, ...rest }) {
  const username = localStorage.getItem("username");
  const uploadSuccess = localStorage.getItem("uploadSuccess") === "true";
  return (
    <Box
      bg={"rgb(17,21,24)"}
      borderRight="1px"
      color={"white"}
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 80 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <img
          src="https://i.ibb.co/7JtfWw2/audio-insight-logo.png"
          alt="AI Logo"
          width="50px"
          height="50px"
          overflow={"hidden"}
          // objectFit={"cover"}
        />
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Audio Insight
        </Text>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          to={link.path}
          icon={link.icon}
          onClose={onClose}
          disabled={!uploadSuccess && link.name === "Dashboard"}
        >
          {link.name}
        </NavItem>
      ))}

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<Icon as={FiChevronDown} />}
          mt={4}
          bg="none"
          color="white"
          _hover={{ bg: "rgb(50, 60, 68)" }}
          _expanded={{ bg: "rgb(50, 60, 68)" }}
          w="90%"
          ml="5%"
        >
          {username}
        </MenuButton>
        <MenuList p={2} bg="rgb(17, 21, 24)" color="white" mt={2}>
          <MenuItem
            pl={4}
            borderRadius={"0.5rem"}
            _hover={{ bg: "rgb(40, 50, 58)" }}
            bg="rgb(17, 21, 24)"
          >
            Profile
          </MenuItem>
          <MenuItem
            pl={4}
            borderRadius={"0.5rem"}
            _hover={{ bg: "rgb(40, 50, 58)" }}
            bg="rgb(17, 21, 24)"
          >
            Settings
          </MenuItem>
          <MenuItem
            borderRadius={"0.5rem"}
            _hover={{ bg: "rgb(40, 50, 58)" }}
            bg="rgb(17, 21, 24)"
          >
            <Logout />
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}


function NavItem({ icon, children,disabled, to, onClose, ...rest }) {
  const [showPopup, setShowPopup] = useState(false);
  const uploadSuccess = localStorage.getItem("uploadSuccess") === "true";
// console.log("uploadSuccess",uploadSuccess);
  const handleClick = (e) => {
    if (!uploadSuccess && !disabled) {
      e.preventDefault(); // Prevent navigation if popup should be shown
      setShowPopup(true);
    } else {
      onClose();
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Popover
        placement="top"
        isOpen={showPopup}
        onClose={handleClosePopup}
      >
        <PopoverTrigger>
          <NavLink
            to={disabled ? "#" : to}
            onClick={handleClick}
            style={({ isActive }) => ({
              backgroundColor: isActive ? "rgb(40, 50, 58)" : "rgb(17,21,24)",
              color: "white",
              textDecoration: "none",
              display: "block",
              width: "90%",
              margin: "10px auto",
              borderRadius: "0.5rem",
            })}
          >
            <Box
              _focus={{ boxShadow: "none" }}
              _hover={{
                bg: "rgb(40, 50, 58)",
                color: "white",
                borderRadius: "0.5rem",
              }}
              {...rest}
              onClick={onClose}
            >
              <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
              >
                {icon && (
                  <Icon
                    mr="4"
                    fontSize="16"
                    _groupHover={{
                      color: "white",
                    }}
                    as={icon}
                  />
                )}
                {children}
              </Flex>
            </Box>
          </NavLink>
        </PopoverTrigger>
        <PopoverContent bg="#881337" color="white">
          <PopoverArrow />
          <PopoverCloseButton onClick={handleClosePopup} />
          <PopoverHeader fontWeight="semibold">Upload File</PopoverHeader>
          <PopoverBody>Please upload an audio file to proceed.</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}

function MobileNav({ onOpen, ...rest }) {
  return (
    <Flex
      ml={{ base: 0, md: 80 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={"rgb(17,21,24)"}
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
        color={"white"}
        _hover={{ bg: "rgb(40,50,58)" }}
      />
      <img
        src="https://i.ibb.co/7JtfWw2/audio-insight-logo.png"
        alt="AI Logo"
        width="50px"
        height="50px"
        overflow={"hidden"}
        // objectFit={"cover"}
      />
    </Flex>
  );
}
