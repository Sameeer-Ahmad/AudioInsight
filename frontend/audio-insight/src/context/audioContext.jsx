// audioContext.js
import React, { createContext, useContext, useState } from 'react';

const AudioUploadContext = createContext();

export const useAudioUpload = () => {
  return useContext(AudioUploadContext);
};

export const AudioUploadProvider = ({ children }) => {
  const [audioUploaded, setAudioUploaded] = useState(false);

  const value = {
    audioUploaded,
    setAudioUploaded,
  };

  return (
    <AudioUploadContext.Provider value={value}>
      {children}
    </AudioUploadContext.Provider>
  );
};
