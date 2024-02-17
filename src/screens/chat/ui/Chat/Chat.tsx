import { animated, useTransition } from "@react-spring/web";
import cn from "classnames";
import React, { DragEventHandler, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { ChatHeader } from "@/widgets/chat/chat-header/ui";
import { MessageForm } from "@/widgets/chat/message-form/ui";
import { MessageList } from "@/widgets/chat/message-list/ui";

import { AttachFileDropzone } from "@/features/chat/attach-file-dropzone/ui";
import { AttachMediaDropzone } from "@/features/chat/attach-media-dropzone/ui";

import { ChatType, IChat } from "@/entities/chat/interfaces";

import { AttachmentsContextProvider } from "@/shared/contexts/AttachmentsContextProvider";
import {
	useAuth,
	useSocketsContext,
	useStoreDispatch,
	useStoreSelector
} from "@/shared/lib/hooks";
import { chatActions } from "@/shared/models/chats";
import { PageLoader } from "@/shared/ui";

import styles from "./Chat.module.scss";

const Chat: React.FC = () => {
	const dispatch = useStoreDispatch();

	const params = useParams<{ polymorphicId: string }>();

	const { currentUser } = useAuth();
	const { chatSocket } = useSocketsContext();
	const currentChat = useStoreSelector(state => state.chats.currentChat.data);

	const [isDraggingOver, setDraggingOver] = useState(false);
	const dragLeaveTimeoutId = useRef<ReturnType<typeof setTimeout>>();

	const dropzonesTransition = useTransition(isDraggingOver, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 }
	});

	/** Request Chat Messages for passed `chat`.
	 * If `chat` is temporary - this means it hasn't any messages yet. */
	const requestChatHistory = (chat: IChat) => {
		if (chat.type === ChatType.TEMP) return;

		chatSocket?.emit(
			"get-chat-history",
			{
				chatId: chat.id,
				page: 1,
				limit: 100
			},
			data => {
				dispatch(
					chatActions.updateChatCarefully({
						chatId: data.chat_id,
						newData: {
							messages: data.messages
						}
					})
				);
			}
		);
	};

	/** Request Chat by it's `chatId`, after that request it's Messages by calling `requestChatHistory`. */
	const requestChat = (chatId: IChat["id"]) => {
		if (!chatSocket?.connected) return;

		chatSocket.emit("get-chat", { polymorphicId: chatId }, data => {
			dispatch(chatActions.setCurrentChat(data));
			requestChatHistory(data);
		});
	};

	const handleDragOver: DragEventHandler<HTMLDivElement> = e => {
		e.preventDefault();

		/* Dragging over one of two <Dropzone/> inside container causes `handleDragLeave` to be fired.
		 * At the same time: `handleDragOver` is still firing periodically.
		 * Which causing: Flickering.
		 * So to prevent this behavior - we need to set timeout for closing in `handleDragLeave`
		 * to make sure we actually has leaved container by canceling timeout in `handleDragOver` */
		clearTimeout(dragLeaveTimeoutId.current);
		if (!isDraggingOver) {
			setDraggingOver(true);
			return;
		}
	};

	const handleDragLeave: DragEventHandler<HTMLDivElement> = e => {
		e.preventDefault();

		clearTimeout(dragLeaveTimeoutId.current);
		dragLeaveTimeoutId.current = setTimeout(() => {
			setDraggingOver(false);
		}, 150);
	};

	const handleDrop: DragEventHandler<HTMLDivElement> = e => {
		e.preventDefault();
		clearTimeout(dragLeaveTimeoutId.current);
		setDraggingOver(false);
	};

	useEffect(() => {
		// Clear currentChat on page mount or new params.
		dispatch(chatActions.clearCurrentChat());

		if (!params.polymorphicId) throw new Error("No param for /chat/:polymorphicId");

		requestChat(params.polymorphicId);

		/* We don't need really need `requestChat` in dependencies.
		 * But if we're adding it to them - we need to wrap `requestChat` in `useCallback`.
		 * This makes nonsense to me. */
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params, chatSocket]);

	if (!currentChat || !currentUser) {
		return (
			<div className={cn(styles.page, styles.page_loading)}>
				<div className={styles.page__background}></div>
				<PageLoader />
			</div>
		);
	}

	return (
		<div
			className={styles.page}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<div className={styles.page__background}></div>

			<ChatHeader
				className={styles.page__header}
				chat={currentChat}
			/>

			<MessageList
				chat={currentChat}
				currentUserId={currentUser.id}
				className={styles.page__messages}
			/>

			<AttachmentsContextProvider>
				<MessageForm className={styles.page__form} />

				{dropzonesTransition((style, isDraggingOver) => {
					if (!isDraggingOver) return null;

					return (
						<animated.div
							style={style}
							className={styles.dropzones}
						>
							<AttachFileDropzone />
							<AttachMediaDropzone />
						</animated.div>
					);
				})}
			</AttachmentsContextProvider>
		</div>
	);
};

export default Chat;
