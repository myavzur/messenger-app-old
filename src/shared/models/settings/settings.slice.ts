import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ITheme } from "@/shared/interfaces";

import { ISettingsState } from "./settings.interface";

const initialState: ISettingsState = {
	theme: (localStorage.getItem("theme") as ITheme) || "insomnia"
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<ITheme>) => {
			state.theme = action.payload;
		}
	}
});

export const { reducer: settingsReducer, actions: settingsActions } = settingsSlice;
