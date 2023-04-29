const key = "access_token";

/** Get access token from LocalStorage */
export const getAccessToken = () => {
	return localStorage.getItem(key);
};

/** Set access token to LocalStorage */
export const setAccessToken = (accessToken: string) => {
	localStorage.setItem(key, accessToken);
};

/** Delete access token to LocalStorage */
export const removeAccessToken = () => {
	localStorage.removeItem(key);
};
