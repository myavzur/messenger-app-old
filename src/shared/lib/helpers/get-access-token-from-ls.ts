/** Get access token from LocalStorage */
export const getAccessTokenFromLS = () => {
	return localStorage.getItem("access_token");
};
