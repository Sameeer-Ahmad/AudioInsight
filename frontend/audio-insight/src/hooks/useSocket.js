import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-hot-toast';
import { API } from '../backend-API/api';

const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const newSocket = io(`${API}`, {
      transports: ['websocket', 'polling'],
      auth: { token },
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.connected);
    });

    newSocket.on('connect_error', (err) => {
      console.error('Socket connection failed:', err.message);
      toast.error('Could not connect for Q&A. Try logging in again.');
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  return socket;
};

export default useSocket;
