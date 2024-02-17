import { animated } from "@react-spring/web";
import cn from "classnames";
import React, { useEffect, useState } from "react";

import { ChatType, IMessage } from "@/entities/chat/interfaces";
import { ChatMessage } from "@/entities/chat/ui";
import { MessageContextMenu } from "@/entities/context-menu/ui";

import { useScrollButton } from "@/shared/lib/hooks";

import { useMessagesTransition, useScrollToMessage } from "../lib/hooks";

import { IMessageListProps } from "./MessageList.interface";

import styles from "./MessageList.module.scss";

const contextMenuDefaultState: {
	message: IMessage | null;
	mousePosition: {
		x: number;
		y: number;
	};
} = {
	message: null,
	mousePosition: { x: 0, y: 0 }
};

export const MessageList: React.FC<IMessageListProps> = ({
	chat,
	currentUserId,
	className
}) => {
	const [contextMenu, setContextMenu] = useState(contextMenuDefaultState);

	const messagesTransition = useMessagesTransition({
		messages: chat.messages
	});

	const { windowRef, isFocusing, scrollWindow } = useScrollButton({
		appearsAfterScrolledPixels: 1000
	});

	const { getMessageRef, scrollToMessage } = useScrollToMessage({
		messages: chat.messages
	});

	// Scroll messages to bottom on initialize and on new message.
	useEffect(() => {
		if (!isFocusing) {
			scrollWindow("smooth");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chat.messages]);

	return (
		<div
			ref={windowRef}
			className={cn(styles.messages, className)}
		>
			{messagesTransition((style, message) => {
				const isOwn = currentUserId === message.user.id;
				const withAuthorName = !isOwn && chat.type === ChatType.GROUP;

				return (
					<animated.div
						key={message.id}
						ref={getMessageRef(message)}
						className={cn(styles.messages__message, {
							[styles.messages__message_own]: isOwn
						})}
						style={style}
					>
						<ChatMessage
							isOwn={isOwn}
							message={message}
							withAuthorAvatar={!isOwn}
							withAuthorName={withAuthorName}
							onScrollToMessage={scrollToMessage}
							onContextMenu={setContextMenu}
						/>
					</animated.div>
				);
			})}

			{contextMenu.message && (
				<MessageContextMenu
					mousePosition={contextMenu.mousePosition}
					chat={chat}
					message={contextMenu.message}
					containerElementRef={windowRef}
					onClose={() => setContextMenu(contextMenuDefaultState)}
				/>
			)}
		</div>
	);
};
