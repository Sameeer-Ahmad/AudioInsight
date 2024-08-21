import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {  ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, sans-serif",
  },
  styles: {
    global: {
      ".active-link": {
        backgroundColor: 'rgb(40, 50, 58)',
        color: 'white',
      },
    },
    components: {
      NavItem: {
        // Define base styles for NavItem component if needed
        baseStyle: {
          // Base styles for NavItem
        },
        // More specific variants if needed
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  
);
