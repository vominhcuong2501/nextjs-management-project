import { clearCookie, getAccessTokenFromCookie } from "@/lib/utils/auth";
import { HttpStatusCode } from "@/lib/utils/httpStatusCode.enum";
import type { AxiosError, AxiosInstance } from "axios";
import axios from "axios";
import { BASE_URL_API } from "./../constans/common";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.instance = axios.create({
      baseURL: BASE_URL_API,
      timeout: 10 * 1000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.accessToken = getAccessTokenFromCookie();
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken) {
          config.headers.Authorization = this.accessToken;
          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error: AxiosError) {
        if (error.response?.status == HttpStatusCode.Unauthorized) {
          clearCookie();
        }
        return Promise.reject(error);
      }
    );
  }
}

const authAxios = new Http().instance;

export default authAxios;
