import { useContext, useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IconAlignLeft, IconPlayerPlay } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../../backend-API/api";
import { AudioContext } from "../../context/audioContext";
import LanguageSelect from "../../components/LanguageSelect";
import PrimaryButton from "../../components/PrimaryButton";
import ResultPanel from "../../components/ResultPanel";
import EmptyState from "../../components/EmptyState";
import { colors, fonts } from "../../theme/tokens";

const Transcribe = () => {
  const { activeAudioId } = useContext(AudioContext);
  const [language, setLanguage] = useState("en");
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTranscription("");
  }, [activeAudioId]);

  const handleTranscribe = async () => {
    if (!activeAudioId) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      setTranscription("");
      const response = await axios.get(
        `${API}/audio/transcribe?language=${language}&audioId=${activeAudioId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTranscription(response.data.transcription);
      toast.success("Transcription retrieved", { duration: 3000 });
    } catch (error) {
      console.error("Error fetching transcription:", error);
      toast.error("Failed to retrieve transcription.", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={8}>
        <Text fontFamily={fonts.heading} fontSize="26px" fontWeight={600} letterSpacing="-0.01em" color={colors.textPrimary}>
          Transcription
        </Text>
        <Text fontSize="14px" color={colors.textMuted} mt={1}>
          Turn your audio into accurate, readable text — translated into any language.
        </Text>
      </Box>

      {!activeAudioId && (
        <EmptyState>No audio selected. Upload an audio file from the dashboard first.</EmptyState>
      )}

      <Flex align="flex-end" gap="14px" mb={8}>
        <LanguageSelect value={language} onChange={(e) => setLanguage(e.target.value)} />
        <PrimaryButton
          leftIcon={<IconPlayerPlay size={16} />}
          isLoading={loading}
          loadingText="Transcribing"
          onClick={handleTranscribe}
          isDisabled={!activeAudioId}
        >
          Transcribe
        </PrimaryButton>
      </Flex>

      <ResultPanel
        icon={IconAlignLeft}
        title="Transcript"
        meta={language.toUpperCase()}
        content={transcription}
        loading={loading}
        fileName="transcript.txt"
      />
    </Box>
  );
};

export default Transcribe;
