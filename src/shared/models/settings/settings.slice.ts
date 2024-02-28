import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ITheme } from "@/shared/interfaces/theme.interface";

import { ISetSidebarsContentAction, ISettingsState } from "./settings.interface";

const initialState: ISettingsState = {
	theme: (localStorage.getItem("theme") as ITheme) || "insomnia",
	leftSidebarView: "chats",
	rightSidebarView: null
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setSidebarsContent: (state, action: ISetSidebarsContentAction) => {
			const { leftSidebarView, rightSidebarView } = action.payload;

			if (leftSidebarView) {
				state.leftSidebarView = leftSidebarView;
			}

			if (rightSidebarView) {
				state.rightSidebarView = rightSidebarView;
			}
		},
		setTheme: (state, action: PayloadAction<ITheme>) => {
			state.theme = action.payload;
		}
	}
});

export const { reducer: settingsReducer, actions: settingsActions } = settingsSlice;
