import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IChat, ICreateGroupChatBody } from "@/entities/chat/interfaces";
import {
	IAuthResponse,
	ISignInBody,
	ISignUpBody,
	IUser
} from "@/entities/user/interfaces";

import { getAccessToken, setAccessToken } from "@/shared/lib/helpers";

const API_SERVER_URL = import.meta.env.VITE_API_SERVER_URL;

enum ApiTags {
	USER = "user",
	CHAT = "chat"
}

export const baseApi = createApi({
	tagTypes: [ApiTags.USER, ApiTags.CHAT],
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: API_SERVER_URL,
		prepareHeaders: headers => {
			const accessToken = getAccessToken();

			if (accessToken) {
				headers.set("Authorization", `Bearer ${accessToken}`);
			}

			headers.set("Content-Type", "application/json");
			return headers;
		}
	}),
	endpoints: builder => ({
		// * Auth
		getCurrentUser: builder.query<IUser, void>({
			query: () => "/auth/me",
			providesTags: [ApiTags.USER]
		}),

		signIn: builder.mutation<IAuthResponse, ISignInBody>({
			query: credential => ({
				method: "POST",
				url: "/auth/login",
				body: credential
			}),
			transformResponse: (response: IAuthResponse): IAuthResponse => {
				if (response.access_token) {
					setAccessToken(response.access_token);
				}
				return response;
			},
			invalidatesTags: [ApiTags.USER]
		}),

		signUp: builder.mutation<IAuthResponse, ISignUpBody>({
			query: credential => ({
				method: "POST",
				url: "/auth/register",
				body: credential
			}),
			transformResponse: (response: IAuthResponse): IAuthResponse => {
				if (response.access_token) {
					setAccessToken(response.access_token);
				}
				return response;
			},
			invalidatesTags: [ApiTags.USER]
		}),

		// * Users
		searchUsersByAccountName: builder.query<IUser[], IUser["account_name"]>({
			query: account_name => `/users/search?account_name=${account_name}`
		}),

		getUsersBasedOnLocalChats: builder.query<
			Pick<IUser, "id" | "account_name" | "avatar_url">[],
			void | null
		>({
			query: () => "/users/local-chats"
		}),

		// * Chats
		createGroupChat: builder.mutation<IChat, ICreateGroupChatBody>({
			query: chat => ({
				method: "POST",
				url: "/chats/group",
				body: chat
			})
		})
	})
});
