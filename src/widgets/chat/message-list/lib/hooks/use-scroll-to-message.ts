import { createRef, useCallback, useMemo } from "react";

import { IMessage } from "@/entities/chat/interfaces";

interface IUseScrollToMessageParams {
	messages: IMessage[];
}

export const useScrollToMessage = ({ messages }: IUseScrollToMessageParams) => {
	const messageElementRefs = useMemo(() => {
		if (!messages) return {};

		return messages.reduce((acc, message) => {
			acc[message.id] = createRef();
			return acc;
		}, {} as { [key: string]: React.RefObject<HTMLDivElement> });
	}, [messages]);

	const getMessageRef = useCallback(
		(message: IMessage) => {
			return messageElementRefs[message.id];
		},
		[messageElementRefs]
	);

	const scrollToMessage = (message: IMessage) => {
		const messageEl = messageElementRefs[message.id]?.current;
		if (!messageEl) return;

		messageEl.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	};

	return { getMessageRef, scrollToMessage };
};
