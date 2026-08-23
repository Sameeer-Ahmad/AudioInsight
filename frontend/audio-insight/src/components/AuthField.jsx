import { useState } from "react";
import { Box, Text, Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { colors } from "../theme/tokens";

const AuthField = ({ label, type, ...inputProps }) => {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  const input = (
    <Input
      type={isPassword && visible ? "text" : type}
      bg={colors.bgSurface2}
      border={`1px solid ${colors.border}`}
      borderRadius="10px"
      color={colors.textPrimary}
      fontSize="14px"
      h="42px"
      pr={isPassword ? "42px" : undefined}
      _placeholder={{ color: colors.textDim }}
      _hover={{ borderColor: colors.borderStrong }}
      _focus={{ borderColor: colors.accent, boxShadow: `0 0 0 1px ${colors.accent}` }}
      {...inputProps}
    />
  );

  return (
    <Box mb="16px">
      <Text fontSize="13px" fontWeight={600} color={colors.textSecondary} mb="6px">
        {label}
      </Text>
      {isPassword ? (
        <InputGroup>
          {input}
          <InputRightElement h="42px">
            <IconButton
              aria-label={visible ? "Hide password" : "Show password"}
              icon={visible ? <IconEyeOff size={16} /> : <IconEye size={16} />}
              onClick={() => setVisible((v) => !v)}
              variant="ghost"
              size="sm"
              color={colors.textMuted}
              _hover={{ bg: colors.bgSurface3, color: colors.textPrimary }}
              tabIndex={-1}
            />
          </InputRightElement>
        </InputGroup>
      ) : (
        input
      )}
    </Box>
  );
};

export default AuthField;
