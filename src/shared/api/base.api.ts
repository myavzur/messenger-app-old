import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IChat } from "../interfaces/chat.interface";
import {
	IAuthResponse,
	ISignInBody,
	ISignUpBody,
	IUser
} from "../interfaces/user.interface";
import { getAccessToken, setAccessToken } from "../lib/helpers";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const baseApi = createApi({
	tagTypes: ["User", "Chats"],
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
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
		// Auth
		getCurrentUser: builder.query<IUser, void>({
			query: () => "/auth/me",
			providesTags: ["User"]
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
			invalidatesTags: ["User"]
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
			invalidatesTags: ["User"]
		}),

		// * Chats
		getChats: builder.query<IChat[], void | null>({
			query: () => "/chats",
			providesTags: ["Chats"]
		})
	})
});
