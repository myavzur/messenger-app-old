import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ChatType, IChat, IMessage } from "@/entities/chat/interfaces";

import {
	IAddMessageAction,
	IChatsState,
	IDeleteMessagesAction,
	IUpdateChatAction,
	IUpdateLocalChatPresenceAction
} from "./chats.interface";

const defaultCurrentChat: IChatsState["currentChat"] = {
	data: null,
	embeddedMessage: null
};

const initialState: IChatsState = {
	currentChat: {
		data: null,
		embeddedMessage: null
	},
	chatList: []
};

const chatSlice = createSlice({
	name: "chats",
	initialState,
	reducers: {
		clearCurrentChat: state => {
			state.currentChat = defaultCurrentChat;
		},
		setCurrentChat: (state, action: PayloadAction<IChat>) => {
			state.currentChat.data = action.payload;
		},
		clearCurrentChatEmbeddedMessage: state => {
			state.currentChat.embeddedMessage = null;
		},
		setCurrentChatEmbeddedMessage: (state, action: PayloadAction<IMessage>) => {
			state.currentChat.embeddedMessage = action.payload;
		},
		clearChats: state => {
			state.chatList = [];
			state.currentChat = defaultCurrentChat;
		},
		setChats: (state, action: PayloadAction<IChat[]>) => {
			state.chatList = action.payload;
		},
		addChat: (state, action: PayloadAction<IChat>) => {
			state.chatList.unshift(action.payload);

			const currentChat = state.currentChat.data;
			const shouldUpdateCurrentChat = currentChat?.id === action.payload.id;

			if (shouldUpdateCurrentChat) {
				state.currentChat.data = action.payload;
			}
		},
		updateLocalChatPresence: (state, action: IUpdateLocalChatPresenceAction) => {
			const { chatId, status } = action.payload;

			state.chatList = state.chatList.map(chat => {
				const isLocalChat = chat.type === ChatType.LOCAL;
				const shouldUpdateChat = chat.id === chatId;
				if (!isLocalChat || !shouldUpdateChat) return chat;

				chat.user_status = status;
				return chat;
			});

			const currentChat = state.currentChat.data;
			const isLocalCurrentChat = currentChat?.type === ChatType.LOCAL;
			const shouldUpdateCurrentChat = currentChat?.id === chatId;

			if (state.currentChat.data && isLocalCurrentChat && shouldUpdateCurrentChat) {
				state.currentChat.data.user_status = status;
			}
		},
		updateChat: (state, action: IUpdateChatAction) => {
			const { chatId, newData } = action.payload;

			const chatIdx = state.chatList.findIndex(chat => chat.id === chatId);
			const updatedChat = { ...state.chatList[chatIdx], ...newData };

			if (chatIdx !== -1) {
				// Replace chat forwards.
				state.chatList.splice(chatIdx, 1);
				state.chatList.unshift(updatedChat);
			}

			const currentChat = state.currentChat.data;
			const shouldUpdateCurrentChat = currentChat?.id === chatId;

			if (shouldUpdateCurrentChat) {
				state.currentChat.data = updatedChat;
			}
		},
		updateChatCarefully: (state, action: IUpdateChatAction) => {
			const { chatId, newData } = action.payload;

			const chatIdx = state.chatList.findIndex(chat => chat.id === chatId);
			const updatedChat = { ...state.chatList[chatIdx], ...newData };

			if (chatIdx !== -1) {
				state.chatList[chatIdx] = updatedChat;
			}

			const currentChat = state.currentChat.data;
			const shouldUpdateCurrentChat = currentChat?.id === chatId;

			if (shouldUpdateCurrentChat) {
				state.currentChat.data = updatedChat;
			}
		},
		addMessage: (state, action: IAddMessageAction) => {
			const { chatId, message } = action.payload;

			const chatIdx = state.chatList.findIndex(chat => chat.id === chatId);
			const chat = state.chatList[chatIdx];

			if (chatIdx !== -1) {
				chat.last_message = message;

				// Replace chat forwards.
				state.chatList.splice(chatIdx, 1);
				state.chatList.unshift(chat);
			}
			const currentChat = state.currentChat.data;
			const shouldUpdateCurrentChat = currentChat?.id === chatId;

			if (state.currentChat.data && shouldUpdateCurrentChat) {
				state.currentChat.data.messages.unshift(message);
			}
		},
		deleteMessages: (state, action: IDeleteMessagesAction) => {
			const stateLength = state.currentChat.data?.messages.length;
			console.time(`Deleting messages length: ${stateLength}`);
			const { chatId, messageIds } = action.payload;

			const currentChat = state.currentChat.data;
			const shouldUpdateCurrentChat = currentChat?.id === chatId;

			if (state.currentChat.data && shouldUpdateCurrentChat) {
				// Delete reply from message if it's in messageIds.
				const newMessages = currentChat.messages.map(message => {
					if (!message.reply_for) return message;

					if (messageIds.includes(message.reply_for.id)) {
						message.reply_for = null;
					}

					return message;
				});

				// Delete messages if they're in messageIds.
				state.currentChat.data.messages = newMessages.filter(
					message => !messageIds.includes(message.id)
				);
			}
			console.timeEnd(`Deleting messages length: ${stateLength}`);
		}
	}
});

export const { reducer: chatReducer, actions: chatActions } = chatSlice;
