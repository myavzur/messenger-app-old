import { useTransition } from "@react-spring/web";

import { IMessage } from "@/entities/chat/interfaces";

interface IUseMessagesTransitionParams {
	messages?: IMessage[];
}

export const useMessagesTransition = ({
	messages
}: IUseMessagesTransitionParams) => {
	const transitionTrail = messages?.length ? 400 / messages.length : 0;

	return useTransition(messages ? messages : [], {
		trail: transitionTrail,
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0, immediate: true }
	});
};
