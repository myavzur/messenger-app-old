/** Set access token to LocalStorage */
export const setAccessTokenToLS = (accessToken: string) => {
	localStorage.setItem("access_token", accessToken);
};
