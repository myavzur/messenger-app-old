import { config, useTransition } from "@react-spring/web";

import { IMessage } from "@/entities/chat/interfaces";

interface IUseMessagesTransitionParams {
	messages?: IMessage[];
}

export const useMessagesTransition = ({
	messages
}: IUseMessagesTransitionParams) => {
	const transitionTrail = messages?.length ? 0.15 * messages.length : 0;

	return useTransition(messages ? messages : [], {
		config: config.default,
		trail: transitionTrail,
		from: { opacity: 0, x: -10, maxHeight: "100%" },
		enter: { opacity: 1, x: 0, maxHeight: "100%" },
		leave: { opacity: 0, x: -10, maxHeight: "0%" }
	});
};
