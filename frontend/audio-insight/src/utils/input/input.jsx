// PlaceholdersAndVanishInput.js
// Corrected import path

import { VanishInput } from "./vanishedInput";

const PlaceholdersAndVanishInput = ({ onChange, onClick }) => {
  const placeholders = [
    "Ask your question here",
    "Ask anything about the audio",
    "Enter your question",
    "Type your query",
    "What would you like to know?"
  ];

  const handleChange = (e) => {
    onChange && onChange(e);
  };

  const handleSubmit = () => {
    onClick && onClick();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <VanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onClick={handleSubmit} 
      />
    </div>
  );
};

export default PlaceholdersAndVanishInput;
