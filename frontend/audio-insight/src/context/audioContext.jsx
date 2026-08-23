import { createContext, useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../backend-API/api";
import { AuthContext } from "./authContext";

const AudioContext = createContext();

const ACTIVE_AUDIO_KEY = "activeAudioId";

const AudioProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [hasLoadedHistory, setHasLoadedHistory] = useState(false);
  const [activeAudioId, setActiveAudioIdState] = useState(
    () => localStorage.getItem(ACTIVE_AUDIO_KEY) || null
  );

  const setActiveAudioId = (id) => {
    setActiveAudioIdState(id);
    if (id) {
      localStorage.setItem(ACTIVE_AUDIO_KEY, id);
    } else {
      localStorage.removeItem(ACTIVE_AUDIO_KEY);
    }
  };

  const refreshHistory = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return [];
    setLoadingHistory(true);
    try {
      const response = await axios.get(`${API}/audio/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(response.data);
      setHasLoadedHistory(true);
      return response.data;
    } finally {
      setLoadingHistory(false);
    }
  }, []);

  const deleteAudio = useCallback(
    async (id) => {
      const token = localStorage.getItem("token");
      await axios.delete(`${API}/audio/detail/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await refreshHistory();
    },
    [refreshHistory]
  );

  useEffect(() => {
    if (!isAuthenticated) {
      setHistory([]);
      setHasLoadedHistory(false);
      return;
    }
    refreshHistory();
  }, [isAuthenticated, refreshHistory]);

  useEffect(() => {
    if (!hasLoadedHistory) return;

    if (history.length === 0) {
      setActiveAudioId(null);
      return;
    }

    const stillExists = history.some(
      (audio) => String(audio.id) === String(activeAudioId)
    );
    if (!stillExists) {
      setActiveAudioId(String(history[0].id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, hasLoadedHistory]);

  const activeAudio =
    history.find((audio) => String(audio.id) === String(activeAudioId)) ||
    null;

  return (
    <AudioContext.Provider
      value={{
        history,
        loadingHistory,
        activeAudioId,
        activeAudio,
        setActiveAudioId,
        refreshHistory,
        deleteAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export { AudioContext, AudioProvider };
