import { useContext } from "react";

import { ISocketsContext } from "@/shared/contexts/SocketsContext";

import { SocketsContext } from "../../contexts/SocketsContext/SocketsContext";

export const useSockets = () => useContext(SocketsContext) as ISocketsContext;
