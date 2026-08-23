import { useContext, useRef, useState } from "react";
import { Box, Flex, Text, VStack, IconButton } from "@chakra-ui/react";
import { IconCloudUpload, IconFileMusic, IconTrash } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { API } from "../../backend-API/api";
import { AudioContext } from "../../context/audioContext";
import PrimaryButton from "../../components/PrimaryButton";
import { colors, fonts } from "../../theme/tokens";

const formatRelativeTime = (isoDate) => {
  const date = new Date(isoDate);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const AudioUpload = () => {
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const { history, activeAudioId, setActiveAudioId, refreshHistory, deleteAudio } =
    useContext(AudioContext);

  const fileInputRef = useRef(null);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (!window.confirm("Delete this audio and all its transcripts, summaries, and Q&A history?")) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteAudio(id);
      toast.success("Audio deleted.", { duration: 2500 });
    } catch (error) {
      console.error("Error deleting audio:", error);
      toast.error("Failed to delete audio.", { duration: 3000 });
    } finally {
      setDeletingId(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      uploadFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("mediaFileUrl", file);

    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.post(`${API}/audio/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Your audio file has been uploaded successfully.", { duration: 3000 });

      setActiveAudioId(String(response.data.id));
      await refreshHistory();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file.", { duration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={8}>
        <Text fontFamily={fonts.heading} fontSize="26px" fontWeight={600} letterSpacing="-0.01em" color={colors.textPrimary}>
          Dashboard
        </Text>
        <Text fontSize="14px" color={colors.textMuted} mt={1}>
          Upload audio and pick what you want to work on.
        </Text>
      </Box>

      <Box
        position="relative"
        borderRadius="20px"
        p="44px"
        mb={8}
        textAlign="center"
        bg={colors.bgSurface}
        border={`1.5px dashed ${dragging ? colors.accent : colors.borderStrong}`}
        cursor="pointer"
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <Flex direction="column" align="center" gap="14px">
          <Flex w="56px" h="56px" borderRadius="16px" bg={colors.accentTint} align="center" justify="center">
            <IconCloudUpload size={26} color={colors.accent} />
          </Flex>
          <Box>
            <Text fontSize="16px" fontWeight={600} color={colors.textPrimary} mb="4px">
              Drop your audio file here
            </Text>
            <Text fontSize="13.5px" color={colors.textMuted}>
              MP3, WAV, M4A and more — up to 200MB
            </Text>
          </Box>
          <Box mt="6px">
            <PrimaryButton
              isLoading={loading}
              loadingText="Uploading"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current.click();
              }}
            >
              Choose File
            </PrimaryButton>
          </Box>
        </Flex>
      </Box>

      {history.length > 0 && (
        <Box>
          <Flex align="center" gap="10px" mb="14px">
            <Text fontFamily={fonts.heading} fontSize="16px" fontWeight={600} color={colors.textPrimary}>
              Your Uploads
            </Text>
            <Text fontSize="12px" fontWeight={600} px="8px" py="2px" borderRadius="20px" bg={colors.bgSurface3} color={colors.textTertiary}>
              {history.length}
            </Text>
          </Flex>
          <VStack align="stretch" spacing="8px">
            {history.map((audio) => {
              const isActive = String(audio.id) === String(activeAudioId);
              return (
                <Flex
                  key={audio.id}
                  justify="space-between"
                  align="center"
                  p="14px 16px"
                  borderRadius="12px"
                  cursor="pointer"
                  bg={isActive ? colors.accentTint : colors.bgSurface}
                  border={`1px solid ${isActive ? colors.accentBorder : colors.borderSoft}`}
                  onClick={() => setActiveAudioId(String(audio.id))}
                >
                  <Flex align="center" gap="12px" minW={0}>
                    <Flex w="36px" h="36px" borderRadius="10px" bg={colors.bgSurface2} align="center" justify="center" flexShrink={0}>
                      <IconFileMusic size={17} color={isActive ? colors.textTertiary : colors.textMuted} />
                    </Flex>
                    <Flex direction="column" minW={0}>
                      <Text fontSize="13.5px" fontWeight={600} color={colors.textPrimary} noOfLines={1}>
                        {decodeURIComponent(audio.mediaFileUrl.split("/").pop())}
                      </Text>
                      <Text fontSize="12px" color={colors.textFaint}>
                        {formatRelativeTime(audio.createdAt)}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex align="center" gap="8px" flexShrink={0}>
                    {isActive && (
                      <Text
                        fontSize="11px"
                        fontWeight={700}
                        px="10px"
                        py="4px"
                        borderRadius="20px"
                        bg={colors.accentTintStrong}
                        color={colors.accentText}
                        textTransform="uppercase"
                        letterSpacing="0.03em"
                      >
                        Active
                      </Text>
                    )}
                    <IconButton
                      aria-label="Delete audio"
                      icon={<IconTrash size={15} />}
                      size="sm"
                      variant="ghost"
                      isLoading={deletingId === audio.id}
                      onClick={(e) => handleDelete(e, audio.id)}
                      color={colors.textDim}
                      _hover={{ color: colors.textPrimary, bg: colors.bgSurface3 }}
                      _active={{ color: colors.textPrimary, bg: colors.bgSurface3 }}
                    />
                  </Flex>
                </Flex>
              );
            })}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default AudioUpload;
