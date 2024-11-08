import Sidebar from '../Sidebar/Sidebar';
import { Box, Flex } from '@chakra-ui/react';
import { AudioUploadProvider } from '../../context/audioContext';

function Dashboard({ children }) {
  return (
    <AudioUploadProvider>
      <Flex>
        <Sidebar/>
        <Box flex="1" p="4" bg={"rgb(17,21,24)"}>
          {children}
        </Box>
      </Flex>
    </AudioUploadProvider>
  );
}

export default Dashboard;
