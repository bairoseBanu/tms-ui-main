import { FC, ReactNode, createContext, useState } from "react";
import io from "socket.io-client";
import { Socket } from "types/socket";

const SocketContext = createContext<Socket | null>(null);
interface Props {
  children: ReactNode;
}

const SocketProvider: FC<Props> = ({ children }) => {
  const [socket] = useState(
    io(import.meta.env.VITE_TMS_EMPLOYEE_BACKEND_SOCKET)
  );

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
