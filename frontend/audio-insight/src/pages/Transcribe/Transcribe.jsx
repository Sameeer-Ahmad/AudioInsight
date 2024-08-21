import React, { useState } from "react";
import { Box, Flex, Text, Select, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import { API } from "../../backend-API/api";
import ButtonGradient from "../../utils/button-gradient/buttonGradient";
import { MdArrowDropDown } from "react-icons/md";
import { toast } from "react-hot-toast";
const Transcribe = () => {
  const [language, setLanguage] = useState("en"); 
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleTranscribe = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      setTranscription("");
      const response = await axios.get(
        `${API}/audio/transcribe?language=${language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTranscription(response.data.transcription);
      toast.success("Transcription Retrieved", {
        duration: 3000,
        style: {
          minWidth: "250px",
        },
      });
    } catch (error) {
      console.error("Error fetching transcription:", error);
      toast.error("Failed to retrieve transcription.", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={12}>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Transcribe Audio
        </Text>
        <Text fontSize="md" color="gray.200" mt={2}>
          Welcome to our audio transcription service. You can transcribe audio
          files into text in multiple languages. Select the desired language
          from the dropdown below and click on the "Transcribe" button to get
          started.
        </Text>
      </Box>
      <Box>
        <Flex color="white" gap={8} mb={20}>
          <Select
            id="language"
            value={language}
            maxW={"200px"}
            icon={<MdArrowDropDown />}
            onChange={handleLanguageChange}
            variant="outline"
            color="black"
            fontWeight={"bold"}
            fontSize={"lg"}
            bg="#e11d48"
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
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="pt">Portuguese</option>
            <option value="ru">Russian</option>
            <option value="zh">Chinese</option>
            <option value="ar">Arabic</option>
            <option value="nl">Dutch</option>
            <option value="tr">Turkish</option>
            <option value="pl">Polish</option>
          </Select>

          <ButtonGradient isLoading={loading} onClick={handleTranscribe}>
            Transcribe
          </ButtonGradient>
        </Flex>
        {transcription && (
          <Box bg="rgb(40, 50, 58)" p={4} borderRadius="lg" mt={4}>
            <Text color="white" fontWeight="bold"  mb={4} fontSize="2xl">
              Transcription :
            </Text>

            <Text pl={2} fontSize="lg" fontWeight="semi-bold" color="white">
              {transcription}
            </Text>
          </Box>
        )}
        {loading && (
          <Box bg="rgb(40, 50, 58)" p={4} borderRadius="lg" mt={4}>
            <Skeleton height="20px" my={4} />
            <Skeleton height="20px" my={4} />
            <Skeleton height="20px" my={4} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Transcribe;
