import { combineReducers } from "@reduxjs/toolkit";

import { baseApi } from "@/shared/api";
import { chatReducer } from "@/shared/models/chats";
import { settingsReducer } from "@/shared/models/settings";

export const rootReducer = combineReducers({
	[baseApi.reducerPath]: baseApi.reducer,
	settings: settingsReducer,
	chats: chatReducer
});
