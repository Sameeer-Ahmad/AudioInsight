import React, { createContext, useContext, useState, useEffect } from "react";

const AudioUploadContext = createContext();

export const useAudioUpload = () => useContext(AudioUploadContext);

export const AudioUploadProvider = ({ children }) => {
  const [audioUploaded, setAudioUploaded] = useState(false);

  useEffect(() => {
    // Check local storage for upload success state on component mount
    const uploadState = localStorage.getItem("uploadSuccess");
    if (uploadState === "true") {
      setAudioUploaded(true);
    }
  }, []);

  const value = { audioUploaded, setAudioUploaded };

  return (
    <AudioUploadContext.Provider value={value}>
      {children}
    </AudioUploadContext.Provider>
  );
};
  