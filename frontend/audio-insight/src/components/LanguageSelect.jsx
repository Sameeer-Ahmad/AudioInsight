import { Box, Flex, Select, Text } from "@chakra-ui/react";
import { IconWorld, IconChevronDown } from "@tabler/icons-react";
import { colors } from "../theme/tokens";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "pt", label: "Portuguese" },
  { code: "ru", label: "Russian" },
  { code: "zh", label: "Chinese" },
  { code: "ar", label: "Arabic" },
  { code: "nl", label: "Dutch" },
  { code: "tr", label: "Turkish" },
  { code: "pl", label: "Polish" },
];

const LanguageSelect = ({ value, onChange, label = "Translate to" }) => (
  <Flex direction="column" gap="6px">
    <Text fontSize="12px" fontWeight={600} color={colors.textMuted}>
      {label}
    </Text>
    <Flex
      align="center"
      gap="10px"
      px="16px"
      py="10px"
      borderRadius="10px"
      bg={colors.bgSurface}
      border={`1px solid ${colors.border}`}
      minW="190px"
      position="relative"
    >
      <IconWorld size={16} color={colors.textMuted} />
      <Select
        value={value}
        onChange={onChange}
        variant="unstyled"
        fontSize="13.5px"
        fontWeight={600}
        color={colors.textPrimary}
        icon={<Box />}
        sx={{ "> option": { color: "black" } }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </Select>
      <IconChevronDown size={15} color={colors.textMuted} style={{ position: "absolute", right: "14px", pointerEvents: "none" }} />
    </Flex>
  </Flex>
);

export default LanguageSelect;
