import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import ActiveAudioBar from "../../components/ActiveAudioBar";
import { Box, Flex } from "@chakra-ui/react";
import { colors } from "../../theme/tokens";

const PUBLIC_PATHS = ["/", "/login", "/signup"];

function Dashboard({ children }) {
  const location = useLocation();
  const isPublicPage = PUBLIC_PATHS.includes(location.pathname);

  if (isPublicPage) {
    return <Box bg={colors.bgCanvas}>{children}</Box>;
  }

  return (
    <Flex direction={{ base: "column", md: "row" }}>
      <Sidebar />
      <Box flex="1" position="relative" minW={0} bg={colors.bgCanvas} overflow="hidden">
        <Box
          position="absolute"
          top="-120px"
          right="-100px"
          w="520px"
          h="520px"
          borderRadius="50%"
          bg={colors.accentTint}
          filter="blur(90px)"
          pointerEvents="none"
        />
        <Box position="relative" p={{ base: 5, md: "40px 44px" }}>
          <ActiveAudioBar />
          {children}
        </Box>
      </Box>
    </Flex>
  );
}

export default Dashboard;
