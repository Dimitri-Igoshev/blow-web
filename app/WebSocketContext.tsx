import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("https://blow.igoshev.de/api");

export const WebSocketContext = createContext(socket);

export const WebSocketProvider = WebSocketContext.Provider;
