import io from "socket.io-client";
import config from "./config";

export const socketInstance = io(config.socketHost);
