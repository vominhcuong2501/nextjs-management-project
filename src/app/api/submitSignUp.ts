import HttpStatusCode from "@/lib/utils/httpStatusCode.enum";
import { BASE_URL_API } from "../constans/common";
import { request } from "./axios";
import { FormSignUp } from "../types/sign-up";

export const submitSignUp = async (data: FormSignUp) => {
	try {
		const response = await request.post(`${BASE_URL_API}/Users/signup`, data);
		if (response.status === HttpStatusCode.Ok) return response?.data;
	} catch (error) {
		return error;
	}
};
