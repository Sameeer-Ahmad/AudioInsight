import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import useSocket from "../../hooks/useSocket";
import { Box, Flex, Text, VStack, Input, IconButton } from "@chakra-ui/react";
import { IconMessageCircle, IconSend } from "@tabler/icons-react";
import { API } from "../../backend-API/api";
import { AudioContext } from "../../context/audioContext";
import EmptyState from "../../components/EmptyState";
import { colors, fonts } from "../../theme/tokens";

const AudioQna = () => {
  const socket = useSocket();
  const { activeAudioId } = useContext(AudioContext);
  const [question, setQuestion] = useState("");
  const [qaHistory, setQaHistory] = useState([]);
  const [asking, setAsking] = useState(false);

  const askQuestion = () => {
    if (socket && activeAudioId && question && !asking) {
      setAsking(true);
      socket.emit("askQuestion", { question, audioId: activeAudioId });
    }
  };

  // Re-registers whenever activeAudioId changes so handleAnswer always sees
  // the current value (avoids a stale closure) and can discard answers that
  // arrive after the user has already switched to a different audio.
  useEffect(() => {
    if (!socket) return;

    const handleAnswer = (data) => {
      setAsking(false);
      if (String(data.audioId) !== String(activeAudioId)) {
        return;
      }
      setQaHistory((prev) => [
        { question: data.question, answer: data.answer },
        ...prev,
      ]);
      setQuestion("");
    };
    const handleError = (message) => {
      console.error("Error:", message);
      toast.error(typeof message === "string" ? message : "Failed to get an answer.");
      setAsking(false);
    };

    socket.on("answer", handleAnswer);
    socket.on("error", handleError);

    return () => {
      socket.off("answer", handleAnswer);
      socket.off("error", handleError);
    };
  }, [socket, activeAudioId]);

  // Load persisted Q&A history whenever the active audio changes.
  useEffect(() => {
    setQaHistory([]);
    if (!activeAudioId) return;

    const token = localStorage.getItem("token");
    axios
      .get(`${API}/audio/detail/${activeAudioId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const questions = response.data.questions || [];
        setQaHistory(
          [...questions]
            .reverse()
            .map((qa) => ({ question: qa.question, answer: qa.answer }))
        );
      })
      .catch((error) => {
        console.error("Error fetching Q&A history:", error);
      });
  }, [activeAudioId]);

  return (
    <Box>
      <Box mb={8}>
        <Text fontFamily={fonts.heading} fontSize="26px" fontWeight={600} letterSpacing="-0.01em" color={colors.textPrimary}>
          Q&amp;A
        </Text>
        <Text fontSize="14px" color={colors.textMuted} mt={1}>
          Ask questions about your audio and get answers grounded in its transcript.
        </Text>
      </Box>

      {!activeAudioId ? (
        <EmptyState>No audio selected. Upload an audio file from the dashboard first.</EmptyState>
      ) : (
        <Box data-testid="qna-panel">
          <Flex
            align="center"
            gap="10px"
            bg={colors.bgSurface}
            border={`1px solid ${colors.border}`}
            borderRadius="14px"
            p="8px 8px 8px 18px"
            mb={6}
          >
            <Input
              placeholder="Ask anything about the audio..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && askQuestion()}
              variant="unstyled"
              fontSize="14px"
              color={colors.textPrimary}
              _placeholder={{ color: colors.textDim }}
            />
            <IconButton
              aria-label="Ask"
              icon={<IconSend size={16} />}
              isLoading={asking}
              isDisabled={!question || asking}
              onClick={askQuestion}
              bg={colors.accent}
              color={colors.accentOn}
              borderRadius="10px"
              _hover={{ bg: colors.accentStrong }}
            />
          </Flex>

          <VStack align="stretch" spacing="10px">
            {qaHistory.map((qa, index) => (
              <Box
                key={index}
                p="16px 18px"
                borderRadius="14px"
                bg={colors.bgSurface}
                border={`1px solid ${colors.borderSoft}`}
              >
                <Flex align="center" gap="8px" mb="8px">
                  <IconMessageCircle size={15} color={colors.accent} />
                  <Text fontSize="14px" fontWeight={600} color={colors.textPrimary}>
                    {qa.question}
                  </Text>
                </Flex>
                <Text fontSize="13.5px" lineHeight="1.7" color={colors.textTertiary} pl="23px">
                  {qa.answer}
                </Text>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default AudioQna;
