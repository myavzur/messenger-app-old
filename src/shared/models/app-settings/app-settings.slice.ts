import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ITheme } from "@/shared/interfaces/theme.interface";

import { IAppSettingsState } from "./app-settings.interface";

const initialState: IAppSettingsState = {
	theme: "dark"
};

const appSettings = createSlice({
	name: "app-settings",
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<ITheme>) => {
			state.theme = action.payload;
		}
	}
});

export const { setTheme } = appSettings.actions;

export const { reducer } = appSettings;
