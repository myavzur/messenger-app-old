import { useContext } from "react";

import { SocketsContext } from "../../contexts/SocketsContext/SocketsContext";

export const useSocketsContext = () => useContext(SocketsContext);
