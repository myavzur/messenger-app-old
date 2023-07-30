import { combineReducers } from "@reduxjs/toolkit";

import { baseApi } from "@/shared/api";
import { reducer as appSettingsReducer } from "@/shared/models/app-settings";
import { reducer as chatsReducer } from "@/shared/models/chats";

export const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	appSettings: appSettingsReducer,
	chats: chatsReducer
});
