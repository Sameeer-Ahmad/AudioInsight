// ModalComponent.jsx
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const FeatureModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="rgb(40, 50, 58)" color={"white"}>
        <ModalHeader>Account Options</ModalHeader>
        <p className="pl-6 pb-4">Choose an option to proceed:</p>
        <ModalBody>
          <VStack height="full">
            <Flex alignItems="flex-end" justifyContent="flex-end" gap={20}>
              <Box m={2}>
                <Link to="/login">
                  <Button
                    color={"white"}
                    bg={"#881337"}
                    _hover={{ bg: "#4c0519" }}
                  >
                    Sign In
                  </Button>
                </Link>
              </Box>
              <Box m={2}>
                <Link to="/signup">
                  <Button
                    color={"white"}
                    bg={"#881337"}
                    _hover={{ bg: "#4c0519" }}
                  >
                    Sign Up
                  </Button>
                </Link>
              </Box>
            </Flex>
          </VStack>
        </ModalBody>
        {/* <ModalFooter>
            <VStack alignItems="center" justifyContent="center" height="full">
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </VStack>
          </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
};

export default FeatureModal;
