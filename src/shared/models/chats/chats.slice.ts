import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { IChat } from "@/shared/interfaces/chat.interface";

import {
	IAddMessageAction,
	IChatsState,
	IUpdateChatAction,
	IUpdateLocalChatPresenceAction
} from "./chats.interface";

const initialState: IChatsState = {
	activeChat: null,
	chats: []
};

const appSettings = createSlice({
	name: "chats",
	initialState,
	reducers: {
		clearChats: state => {
			state.chats = [];
			state.activeChat = null;
		},
		setActiveChat: (state, action: PayloadAction<IChat>) => {
			state.activeChat = action.payload;
		},
		setChats: (state, action: PayloadAction<IChat[]>) => {
			state.chats = action.payload;
		},
		addChat: (state, action: PayloadAction<IChat>) => {
			state.chats.unshift(action.payload);

			if (state.activeChat?.id === action.payload.id) {
				state.activeChat = action.payload;
			}
		},
		updateLocalChatPresence: (state, action: IUpdateLocalChatPresenceAction) => {
			state.chats = state.chats.map(chat => {
				if (chat.is_group || chat.id !== action.payload.chatId) return chat;

				chat.users[0].status = action.payload.status;
				return chat;
			});

			if (
				state.activeChat?.is_group ||
				state.activeChat?.id === action.payload.chatId
			) {
				state.activeChat.users[0].status = action.payload.status;
			}
		},
		updateChat: (state, action: IUpdateChatAction) => {
			// Update chat from chat list.
			const idx = state.chats.findIndex(chat => chat.id === action.payload.chatId);
			const updatedChat = { ...state.chats[idx], ...action.payload.updatedData };

			if (idx !== -1) {
				// Replace chat forwards.
				state.chats.splice(idx, 1);
				state.chats.unshift(updatedChat);
			}

			// Update active chat if selected.
			if (state.activeChat?.id === action.payload.chatId) {
				state.activeChat = updatedChat;
			}
		},
		updateChatCarefully: (state, action: IUpdateChatAction) => {
			const idx = state.chats.findIndex(chat => chat.id === action.payload.chatId);
			const updatedChat = { ...state.chats[idx], ...action.payload.updatedData };

			if (idx !== -1) {
				state.chats[idx] = updatedChat;
			}

			if (state.activeChat?.id === action.payload.chatId) {
				state.activeChat = updatedChat;
			}
		},
		addMessage: (state, action: IAddMessageAction) => {
			// Update chat from chat list.
			const idx = state.chats.findIndex(chat => chat.id === action.payload.chatId);
			const chat = state.chats[idx];

			if (idx !== -1) {
				chat.last_message = action.payload.message;

				// Replace chat forwards.
				state.chats.splice(idx, 1);
				state.chats.unshift(chat);
			}

			if (state.activeChat?.id === action.payload.chatId) {
				state.activeChat.messages.unshift(action.payload.message);
			}
		}
	}
});

export const {
	clearChats,
	setActiveChat,
	setChats,
	addChat,
	updateLocalChatPresence,
	updateChat,
	updateChatCarefully,
	addMessage
} = appSettings.actions;

export const { reducer } = appSettings;
