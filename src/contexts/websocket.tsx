import React, { createContext, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { useAuth } from './auth';
import { IOrder, useOrders } from './orders';

interface WebSocketContextData {}

const WebSocketContext = createContext<WebSocketContextData>(
  {} as WebSocketContextData
);

export const WebSocketProvider: React.FC = ({ children }) => {
  const { user } = useAuth();

  const socket = React.useMemo<SocketIOClient.Socket>(
    () =>
      io('http://localhost:3333', {
        query: { userId: user?.id },
      }),
    [user?.id]
  );
  const { addOrder } = useOrders();

  useEffect(() => {
    socket.on('msgToClient', (msg: any) => {
      console.log(msg);
    });

    socket.on('sendOrderToStore', (data: IOrder) => {
      addOrder(data);
    });
  }, [addOrder, socket]);

  return (
    <WebSocketContext.Provider value={{}}>{children}</WebSocketContext.Provider>
  );
};

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  return context;
}
