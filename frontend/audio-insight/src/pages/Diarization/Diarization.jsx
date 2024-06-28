import { useState } from "react";
import { Box, Flex, Text, Select, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import { API } from "../../backend-API/api";
import ButtonGradient from "../../utils/button-gradient/buttonGradient";
import { MdArrowDropDown } from "react-icons/md";
import { toast } from "react-hot-toast";

const Diarization = () => {
  const [language, setLanguage] = useState("en"); // Default language
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  // const toast = useToast();

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSummarize = async () => {
    setLoading(true);
    setSummary(""); // Clear the previous summary
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API}/audio/summary?language=${language}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSummary(response.data.summary);
      toast.success("Summary Retrieved", {
        duration: 3000,
        style: {
          minWidth: "250px", // Customize the toast appearance
        },
      });
    } catch (error) {
      console.error("Error fetching summary:", error);
      toast.error("Failed to retrieve Summary.", {
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
          Diarization Audio
        </Text>
        <Text fontSize="md" color="gray.200" mt={2}>
          Welcome to our audio diarization service. This tool helps you
          distinguish and label different speakers in your audio recordings,
          making it easier to follow conversations and identify who is speaking
          at any given time. Ideal for interviews, meetings, and podcasts, our
          service ensures you get a clear and organized transcript with distinct
          speaker labels for improved readability and analysis.
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
              borderColor: "#e11d48",
              boxShadow: "outline",
            }}
            _active={{
              borderColor: "#e11d48",
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

          <ButtonGradient isLoading={loading} onClick={handleSummarize}>
          Diarization
          </ButtonGradient>
        </Flex>
        {summary && (
          <Box bg="rgb(40, 50, 58)" p={4} borderRadius="lg" mt={4}>
            <Text color="white" fontWeight="bold" mb={4} fontSize="2xl">
              Diarization :
            </Text>

            <Text fontSize="lg" fontWeight="semi-bold" pl={2} color="white">
              {summary}
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

export default Diarization;
