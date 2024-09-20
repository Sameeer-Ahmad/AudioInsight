import React from "react";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

function Popup({ onClose }) {
  return (
    <Popover placement="right-start">
      <PopoverTrigger>
        <Box
          tabIndex="0"
          role="button"
          aria-label="Some box"
          p={5}
          w="120px"
          bg="gray.300"
          children="Click"
        />
      </PopoverTrigger>
      <PopoverContent bg="tomato" color="white">
        <PopoverHeader fontWeight="semibold"> </PopoverHeader>
        <PopoverArrow bg="pink.500" />
        <PopoverCloseButton bg="purple.500" onClick={onClose} />
        <PopoverBody>
          Please upload an audio file to proceed.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default Popup;
