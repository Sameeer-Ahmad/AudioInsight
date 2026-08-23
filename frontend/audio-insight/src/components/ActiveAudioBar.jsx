import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IconChevronDown, IconPlayerPlay, IconPlayerPause } from "@tabler/icons-react";
import { AudioContext } from "../context/audioContext";
import { colors, fonts } from "../theme/tokens";

const formatLabel = (audio) => decodeURIComponent(audio.mediaFileUrl.split("/").pop());

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const ActiveAudioBar = () => {
  const location = useLocation();
  const { history, activeAudio, setActiveAudioId, loadingHistory } =
    useContext(AudioContext);

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  // Reset playback state whenever the active audio changes.
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [activeAudio?.id]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
    } else {
      el.play();
    }
  };

  const handleSeek = (value) => {
    setSeeking(true);
    setCurrentTime(value);
  };

  const handleSeekEnd = (value) => {
    setSeeking(false);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  // Only the pages that actually operate on the active audio need this bar.
  const showPaths = ["/transcribe", "/summary", "/Qna"];
  if (!showPaths.includes(location.pathname)) {
    return null;
  }

  if (loadingHistory && history.length === 0) {
    return null;
  }

  if (history.length === 0) {
    return (
      <Flex bg={colors.bgSurface} border={`1px solid ${colors.border}`} borderRadius="14px" p="14px 18px" mb={6}>
        <Text fontSize="14px" color={colors.textMuted}>
          No audio uploaded yet. Upload one from the dashboard to get started.
        </Text>
      </Flex>
    );
  }

  return (
    <Box bg={colors.bgSurface} border={`1px solid ${colors.border}`} borderRadius="14px" p="14px 18px" mb={6}>
      {activeAudio && (
        <audio
          ref={audioRef}
          src={activeAudio.mediaFileUrl}
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            if (!seeking) setCurrentTime(e.currentTarget.currentTime);
          }}
        />
      )}

      <Flex align="center" justify="space-between" wrap="wrap" gap={4}>
        <Flex align="center" gap="12px">
          <IconButton
            aria-label={isPlaying ? "Pause" : "Play"}
            icon={isPlaying ? <IconPlayerPause size={17} /> : <IconPlayerPlay size={17} />}
            onClick={togglePlay}
            isDisabled={!activeAudio}
            w="36px"
            h="36px"
            minW="36px"
            borderRadius="10px"
            bg={colors.accent2Tint}
            color={colors.accent2}
            _hover={{ bg: colors.accent2Tint }}
          />
          <Flex direction="column">
            <Text
              fontSize="11.5px"
              fontWeight={600}
              color={colors.textFaint}
              textTransform="uppercase"
              letterSpacing="0.04em"
            >
              Active audio
            </Text>
            <Text fontFamily={fonts.body} fontSize="14.5px" fontWeight={600} color={colors.textPrimary}>
              {activeAudio ? formatLabel(activeAudio) : "Select audio"}
            </Text>
          </Flex>
        </Flex>

        <Menu>
          <MenuButton
            display="flex"
            alignItems="center"
            gap="6px"
            px="14px"
            py="8px"
            borderRadius="10px"
            bg={colors.bgSurface2}
            border={`1px solid ${colors.border}`}
            _hover={{ bg: colors.bgSurface3 }}
          >
            <Flex align="center" gap="6px">
              <Text fontSize="13px" fontWeight={600} color={colors.textSecondary}>
                Switch
              </Text>
              <IconChevronDown size={15} color={colors.textTertiary} />
            </Flex>
          </MenuButton>
          <MenuList bg={colors.bgSurface} borderColor={colors.border} p={2}>
            {history.map((audio) => (
              <MenuItem
                key={audio.id}
                bg={colors.bgSurface}
                color={colors.textSecondary}
                borderRadius="8px"
                _hover={{ bg: colors.bgSurface2 }}
                onClick={() => setActiveAudioId(String(audio.id))}
              >
                {formatLabel(audio)}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      {activeAudio && (
        <Flex align="center" gap="12px" mt="12px">
          <Text fontSize="11.5px" color={colors.textFaint} minW="32px">
            {formatTime(currentTime)}
          </Text>
          <Slider
            value={currentTime}
            min={0}
            max={duration || 0}
            onChange={handleSeek}
            onChangeEnd={handleSeekEnd}
            focusThumbOnChange={false}
          >
            <SliderTrack bg={colors.bgSurface3} h="4px" borderRadius="full">
              <SliderFilledTrack bg={colors.accent2} />
            </SliderTrack>
            <SliderThumb boxSize="12px" bg={colors.accent2} />
          </Slider>
          <Text fontSize="11.5px" color={colors.textFaint} minW="32px">
            {formatTime(duration)}
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default ActiveAudioBar;
