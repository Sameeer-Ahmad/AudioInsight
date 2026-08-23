import { Box, Flex, Text, IconButton, Skeleton } from "@chakra-ui/react";
import { IconCopy, IconDownload } from "@tabler/icons-react";
import { toast } from "react-hot-toast";
import { colors } from "../theme/tokens";

const ResultPanel = ({ icon: Icon, title, meta, content, loading, fileName }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(content || "");
    toast.success("Copied to clipboard", { duration: 2000 });
  };

  const handleDownload = () => {
    const blob = new Blob([content || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "result.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Box borderRadius="20px" bg={colors.bgSurface} border={`1px solid ${colors.border}`} p="26px 28px">
        <Skeleton height="18px" width="140px" mb={5} startColor={colors.bgSurface2} endColor={colors.bgSurface3} />
        <Skeleton height="16px" my={3} startColor={colors.bgSurface2} endColor={colors.bgSurface3} />
        <Skeleton height="16px" my={3} startColor={colors.bgSurface2} endColor={colors.bgSurface3} />
        <Skeleton height="16px" my={3} width="70%" startColor={colors.bgSurface2} endColor={colors.bgSurface3} />
      </Box>
    );
  }

  if (!content) {
    return null;
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;

  return (
    <Box data-testid="result-panel" borderRadius="20px" bg={colors.bgSurface} border={`1px solid ${colors.border}`} overflow="hidden">
      <Flex align="center" justify="space-between" p="18px 24px" borderBottom={`1px solid ${colors.borderSoft}`}>
        <Flex align="center" gap="12px">
          <Flex
            w="34px"
            h="34px"
            borderRadius="10px"
            bg={colors.accentTint}
            align="center"
            justify="center"
            flexShrink={0}
          >
            <Icon size={16} color={colors.accent} />
          </Flex>
          <Flex direction="column">
            <Text fontSize="14px" fontWeight={600} color={colors.textPrimary}>
              {title}
            </Text>
            <Text fontSize="12px" color={colors.textFaint}>
              {meta} · {wordCount} words
            </Text>
          </Flex>
        </Flex>
        <Flex align="center" gap="8px">
          <IconButton
            aria-label="Copy"
            icon={<IconCopy size={15} />}
            size="sm"
            w="34px"
            h="34px"
            borderRadius="9px"
            bg={colors.bgSurface2}
            border={`1px solid ${colors.border}`}
            color={colors.textTertiary}
            _hover={{ bg: colors.bgSurface3 }}
            onClick={handleCopy}
          />
          <IconButton
            aria-label="Download"
            icon={<IconDownload size={15} />}
            size="sm"
            w="34px"
            h="34px"
            borderRadius="9px"
            bg={colors.bgSurface2}
            border={`1px solid ${colors.border}`}
            color={colors.textTertiary}
            _hover={{ bg: colors.bgSurface3 }}
            onClick={handleDownload}
          />
        </Flex>
      </Flex>
      <Box p="26px 28px 30px 28px">
        <Text fontSize="14.5px" lineHeight="1.75" color={colors.textSecondary} whiteSpace="pre-line">
          {content}
        </Text>
      </Box>
    </Box>
  );
};

export default ResultPanel;
