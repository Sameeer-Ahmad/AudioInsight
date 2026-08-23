import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {  ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "'Manrope', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
    heading: "'Space Grotesk', 'Manrope', ui-sans-serif, system-ui, sans-serif",
  },
  styles: {
    global: {
      body: {
        background: "oklch(16% 0.006 264)",
      },
    },
  },
  components: {
    Button: {
      // Chakra's default ghost variant uses a light gray hover/active
      // background (tuned for light mode), which makes near-white icon/text
      // colors on this dark theme briefly invisible when clicked or hovered.
      // whiteAlpha tokens always lighten relative to a dark background instead.
      variants: {
        ghost: {
          _hover: { bg: "whiteAlpha.100" },
          _active: { bg: "whiteAlpha.200" },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  
);
