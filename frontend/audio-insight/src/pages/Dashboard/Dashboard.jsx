import Sidebar from '../Sidebar/Sidebar';
import { Box, Flex } from '@chakra-ui/react';

function Dashboard({ children }) {
  return (
      <Flex>
        <Sidebar/>
        <Box flex="1" p="4" bg={"rgb(17,21,24)"}>
          {children}
        </Box>
      </Flex>
  );
}

export default Dashboard;
