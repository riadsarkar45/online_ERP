import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const socketIo = io('http://localhost:3000');

    socketIo.on('connect', () => {
      // console.log('Socket connected:', socketIo.id);

      // Start sending speed test requests repeatedly
      intervalRef.current = setInterval(() => {
        socketIo.emit('start-speed-test');
      }, 10000); // every 10 seconds
    });

    socketIo.on('speed-test-result', (data) => {
      // console.log('Speed test result received:', data);
    });

    socketIo.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    setSocket(socketIo);

    return () => {
      clearInterval(intervalRef.current);  // stop interval on cleanup
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
