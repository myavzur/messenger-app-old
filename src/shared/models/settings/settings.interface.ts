import { PayloadAction } from "@reduxjs/toolkit";

import { ITheme } from "@/shared/interfaces/theme.interface";

export type ILeftSidebarView =
	| "chats"
	| "profile"
	| "profile/edit"
	| "preferences"
	| null;

export type IRightSidebarView = "chat-info" | "chat-info/edit" | null;

export interface ISettingsState {
	theme: ITheme;
	leftSidebarView: ILeftSidebarView;
	rightSidebarView: IRightSidebarView;
}

export type ISetSidebarsContentAction = PayloadAction<{
	leftSidebarView?: ILeftSidebarView;
	rightSidebarView?: IRightSidebarView;
}>;
