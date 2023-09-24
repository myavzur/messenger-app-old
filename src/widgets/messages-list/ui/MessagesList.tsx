import { animated, useTransition } from "@react-spring/web";
import cn from "classnames";
import React, { useEffect } from "react";

import { ChatMessage } from "@/entities/chat";

import { useScrollButton } from "@/shared/lib/hooks";

import { IMessagesListProps } from "./MessagesList.interface";

import styles from "./MessagesList.module.scss";

export const MessagesList: React.FC<IMessagesListProps> = ({
	messages,
	userId,
	className
}) => {
	const transitionTrail = messages?.length ? 400 / messages.length : 0;

	const messagesTransition = useTransition(messages ? messages : [], {
		trail: transitionTrail,
		from: { opacity: 0, y: -5 },
		enter: { opacity: 1, y: 0 },
		leave: { opacity: 0, y: -5 }
	});

	const { windowRef, isFocusing, scrollWindow } = useScrollButton({
		appearsAfterScrolledPixels: 1000
	});

	// Scroll messages to bottom on initialize and on new message.
	useEffect(() => {
		if (!isFocusing) {
			scrollWindow("smooth");
		}
	}, [messages]);

	return (
		<div
			ref={windowRef}
			className={cn(styles.messages, className)}
		>
			{messagesTransition((style, message) => {
				const isOwn = userId === message.user.id;

				return (
					<animated.div
						className={cn(styles.messages__message, {
							[styles.messages__message_own]: isOwn
						})}
						style={style}
					>
						<ChatMessage
							key={message.id}
							isOwn={isOwn}
							message={message}
						/>
					</animated.div>
				);
			})}
		</div>
	);
};
