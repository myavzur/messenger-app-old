import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ISocketState } from "./socket.interface";

const initialState: ISocketState = {
	chatSocket: null,
	userSocket: null
};

const socketSlice = createSlice({
	name: "socket",
	initialState,
	reducers: {
		// TODO: Types
		setChatSocket: (state, action: PayloadAction<any>) => {
			state.chatSocket = action.payload;
		},
		// TODO: Types
		setUserSocket: (state, action: PayloadAction<any>) => {
			state.userSocket = action.payload;
		}
	}
});

export const { setChatSocket, setUserSocket } = socketSlice.actions;

export const { reducer } = socketSlice;
