import { useContext } from "react";

import { ISocketsContext } from "@/shared/contexts/SocketsContextProvider";

import { SocketsContext } from "../../contexts/SocketsContextProvider/SocketsContext";

export const useSockets = () => useContext(SocketsContext) as ISocketsContext;
