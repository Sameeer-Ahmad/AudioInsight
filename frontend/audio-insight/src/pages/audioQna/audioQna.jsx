import { useState, useEffect } from "react";
import useSocket from "../../hooks/useSocket";
import { Box, Text, Divider, VStack } from "@chakra-ui/react";
import PlaceholdersAndVanishInput from "../../utils/input/input";

const AudioQna = () => {
  const socket = useSocket();
  const [question, setQuestion] = useState("");
  const [qaHistory, setQaHistory] = useState([]);
  const handleChange = (e) => {
    setQuestion(e.target.value);
  };

  const askQuestion = () => {
    if (socket) {
      socket.emit("askQuestion", { question });

      socket.on("answer", (data) => {
        setQaHistory([{ question, answer: data.answer }, ...qaHistory]);
        setQuestion("");
      });
      socket.on("error", (message) => {
        console.error("Error:", message);
      });
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (data) => {
        console.log("Message received:", data);
      });
    }
  }, [socket]);

  return (
    <Box>
      <Box mb={12}>
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Audio Q&A
        </Text>
        <Text fontSize="md" color="gray.200" mt={2}>
          Welcome to our Audio Q&A service. This tool allows you to ask
          questions about your audio recordings and receive answers in
          real-time. Whether you're conducting interviews, analyzing lectures,
          or reviewing podcasts, our service helps you quickly find information
          and understand key points, enhancing your listening and learning
          experience.
        </Text>
      </Box>

      <Box p={4} color="white">
        <PlaceholdersAndVanishInput
          onChange={handleChange}
          onClick={askQuestion}
        />

        <Divider mt={4} />
        <VStack mt={4} align="stretch" spacing={4}>
          {qaHistory.map((qa, index) => (
            <Box
              key={index}
              p={4}
              borderRadius="md"
              color="white"
              bg={"rgb(40, 50, 58)"}
            >
              <Text fontSize={"lg"} fontWeight="bold">
                Qus: {qa.question}
              </Text>
              <Text pl={2} fontSize={"md"} mt={2} color={"gray.400"}>
                Ans: {qa.answer}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default AudioQna;
