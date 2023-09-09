import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
	IAuthResponse,
	ISignInBody,
	ISignUpBody,
	IUser
} from "../interfaces/user.interface";
import { getAccessToken, setAccessToken } from "../lib/helpers";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

enum ApiTags {
	USER = "user",
	CHAT = "chat"
}

export const baseApi = createApi({
	tagTypes: [ApiTags.USER, ApiTags.CHAT],
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
		})
	})
});
