import { useContext } from "react";

import { ISocketsContext } from "@/shared/contexts/SocketsContextProvider";

import { SocketsContext } from "../../contexts/SocketsContextProvider/SocketsContext";

export const useSocketsContext = () => {
	const context = useContext(SocketsContext) as ISocketsContext;

	if (!context) {
		throw new Error("useSocketsContext must be used withing SocketsContextProvider");
	}

	return context;
};
