import { useContext, useEffect, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { IconAlignCenter, IconPlayerPlay } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../../backend-API/api";
import { AudioContext } from "../../context/audioContext";
import LanguageSelect from "../../components/LanguageSelect";
import PrimaryButton from "../../components/PrimaryButton";
import ResultPanel from "../../components/ResultPanel";
import EmptyState from "../../components/EmptyState";
import { colors, fonts } from "../../theme/tokens";

const Summary = () => {
  const { activeAudioId } = useContext(AudioContext);
  const [language, setLanguage] = useState("en");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSummary("");
  }, [activeAudioId]);

  const handleSummarize = async () => {
    if (!activeAudioId) return;
    setLoading(true);
    setSummary("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API}/audio/summary?language=${language}&audioId=${activeAudioId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSummary(response.data.summary);
      toast.success("Summary retrieved", { duration: 3000 });
    } catch (error) {
      console.error("Error fetching summary:", error);
      toast.error("Failed to retrieve summary.", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={8}>
        <Text fontFamily={fonts.heading} fontSize="26px" fontWeight={600} letterSpacing="-0.01em" color={colors.textPrimary}>
          Summarization
        </Text>
        <Text fontSize="14px" color={colors.textMuted} mt={1}>
          Generate a concise summary of your audio, translated into any language.
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
          loadingText="Summarizing"
          onClick={handleSummarize}
          isDisabled={!activeAudioId}
        >
          Summarize
        </PrimaryButton>
      </Flex>

      <ResultPanel
        icon={IconAlignCenter}
        title="Summary"
        meta={language.toUpperCase()}
        content={summary}
        loading={loading}
        fileName="summary.txt"
      />
    </Box>
  );
};

export default Summary;
