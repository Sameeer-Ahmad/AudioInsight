import { Box, Text } from "@chakra-ui/react";
import { colors } from "../theme/tokens";

const EmptyState = ({ children }) => (
  <Box bg={colors.bgSurface} border={`1px solid ${colors.border}`} borderRadius="14px" p={4} mb={8}>
    <Text fontSize="14px" color={colors.textMuted}>
      {children}
    </Text>
  </Box>
);

export default EmptyState;
