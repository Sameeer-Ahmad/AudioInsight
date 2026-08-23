import { Button } from "@chakra-ui/react";
import { colors } from "../theme/tokens";

const PrimaryButton = ({ children, leftIcon, ...rest }) => (
  <Button
    leftIcon={leftIcon}
    bg={colors.accent}
    color={colors.accentOn}
    fontWeight={700}
    fontSize="13.5px"
    borderRadius="10px"
    px="22px"
    _hover={{ bg: colors.accentStrong }}
    _active={{ bg: colors.accentStrong }}
    spinnerPlacement="start"
    {...rest}
  >
    {children}
  </Button>
);

export default PrimaryButton;
