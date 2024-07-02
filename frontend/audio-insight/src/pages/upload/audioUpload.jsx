import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Progress,
  Flex,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../backend-API/api";
import AllCards from "./cards";



const AudioUpload = () => {
  const [mediaFileUrl, setMediaFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false); 
 
  const fileInputRef = useRef(null);

 

  const handleFileChange = (e) => {
    setMediaFileUrl(e.target.files[0]);
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mediaFileUrl) {
      toast.success("Transcription Retrieved", {
        duration: 3000,
        style: {
          minWidth: "250px",
        },
      });
      return;
    }

    const formData = new FormData();
    formData.append("mediaFileUrl", mediaFileUrl);

    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      await axios.post(`${API}/audio/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Your audio file has been uploaded successfully.", {
        duration: 3000,
        style: {
          minWidth: "250px",
        },
      });

      console.log("File uploaded successfully", mediaFileUrl);
      setUploadSuccess(true); // Set upload success state to true
      localStorage.setItem("uploadSuccess", "true"); // Store upload success state in local storage
      
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file.", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={10}>
      <h1 className="text-3xl font-bold mb-4 text-white">
        Welcome to Your Dashboard
      </h1>
      <h4 className="font-bold mb-4 text-white">Upload an Audio File</h4>
      <Box maxW="md" mt={10} p={6} mb={10} borderRadius="lg" bg="rgb(40, 50, 58)">
        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl id="file" isRequired>
              <FormLabel htmlFor="file" mb={0} color="white">
                Instructions:
              </FormLabel>
              <Text pt={4} pb={4} color="gray.400" fontSize="sm">
                Click the "Choose File" button below to select an{" "}
                <span style={{ color: "skyblue", fontWeight: "bold" }}>
                  mp3
                </span>{" "}
                audio file from your device.
              </Text>
              {loading && (
                <Progress
                  size="xs"
                  isIndeterminate
                  colorScheme="blue"
                  isAnimated
                  width="100%"
                  height="1"
                  mt={6}
                  mb={8}
                />
              )}
              <Input
                type="file"
                id="file"
                accept="audio/*"
                onChange={handleFileChange}
                variant="outline"
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
                _hover={{
                  borderColor: "gray.400",
                }}
                _focus={{
                  borderColor: "blue.500",
                  boxShadow: "outline",
                }}
                _active={{
                  borderColor: "blue.500",
                }}
                px={4}
                py={2}
                display="none"
                ref={fileInputRef}
              />
              <Flex
                direction={["column", "row"]}
                gap={4}
                justifyContent="space-between"
                width="100%"
              >
                <Button
                  onClick={() => fileInputRef.current.click()}
                  color={"white"}
                  bg={"#881337"}
                  _hover={{
                    bg: "#4c0519",
                  }}
                >
                  Choose File
                </Button>
                <Button
                  type="submit"
                  bg={"#881337"}
                  isLoading={loading}
                  loadingText="Uploading"
                  color={"white"}
                  _hover={{
                    bg: "#4c0519",
                  }}
                >
                  Upload
                </Button>
              </Flex>
            </FormControl>
          </VStack>
        </form>
      </Box>
      {uploadSuccess && <AllCards /> }
    </Box>
  );
};

export default AudioUpload;
