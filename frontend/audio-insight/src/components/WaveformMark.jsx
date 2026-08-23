import { Box } from "@chakra-ui/react";

const BAR_HEIGHTS = [10, 16, 7, 13];

const WaveformMark = ({ size = 32, color, tint, radius = "9px", gap = "2.5px" }) => (
  <Box
    w={`${size}px`}
    h={`${size}px`}
    borderRadius={radius}
    bg={tint}
    display="flex"
    alignItems="center"
    justifyContent="center"
    gap={gap}
    flexShrink={0}
  >
    {BAR_HEIGHTS.map((h, i) => (
      <Box key={i} w="3px" h={`${h}px`} borderRadius="2px" bg={color} />
    ))}
  </Box>
);

export default WaveformMark;
