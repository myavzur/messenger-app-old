import { useTransition } from "@react-spring/web";

import { IChat } from "@/entities/chat/interfaces";

interface IUseChatsTransitionParams {
	chats?: IChat[];
}

export const useChatsTransition = ({ chats }: IUseChatsTransitionParams) => {
	const transitionTrail = chats?.length ? 400 / chats.length : 0;

	return useTransition(chats ? chats : [], {
		trail: transitionTrail,
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0, immediate: false }
	});
};
