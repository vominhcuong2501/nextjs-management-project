// export default axios
import axios from "axios";
import {
	BASE_URL_API,
	TOKEN_CYBERSOFT,
	USER_LOGIN_KEY,
} from "./../constans/common";

export const request = axios.create({
	baseURL: BASE_URL_API,
	headers: {
		TokenCybersoft: TOKEN_CYBERSOFT,
	},
});

request.interceptors.request.use((config) => {
	// let userInfo = localStorage.getItem(USER_LOGIN_KEY);

	// if (userInfo) {
	// 	userInfo = JSON.parse(userInfo);
	// 	config.headers.Authorization = `Bearer ${userInfo?.accessToken}`;
	// }

	return config;
});

request.interceptors.response.use((response) => {
	return response;
});
