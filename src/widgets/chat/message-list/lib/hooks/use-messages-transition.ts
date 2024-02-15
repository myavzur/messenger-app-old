import { useTransition } from "@react-spring/web";

import { IMessage } from "@/entities/chat/interfaces";

interface IUseMessagesTransitionParams {
	messages?: IMessage[];
}

export const useMessagesTransition = ({
	messages
}: IUseMessagesTransitionParams) => {
	const transitionTrail = messages?.length ? 0.15 * messages.length : 0;

	return useTransition(messages ? messages : [], {
		trail: transitionTrail,
		from: { opacity: 0, x: -10, y: 10, maxHeight: 400 },
		enter: { opacity: 1, x: 0, y: 0, maxHeight: 400 },
		leave: { opacity: 0, x: -10, y: 10, maxHeight: 0 }
	});
};
