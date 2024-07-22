import { backendUrl } from "@/constants/apiConstants";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

class Axios {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: backendUrl,
      headers: {
        Authorization: "Bearer undefined",
      },
      timeout: 60000,
      withCredentials: true,
    });
  }

  refreshRequestHandler(token: string) {
    this.instance = axios.create({
      baseURL: this.instance?.defaults.baseURL,
      headers: {
        Authorization: `Bearer ${token || "undefined"}`,
      },
    });
    this.instance.defaults.baseURL;
  }

  refreshBaseUrl(apiUrl: string) {
    this.instance = axios.create({
      baseURL: apiUrl,
      headers: this.instance?.defaults.headers,
    });
  }
}
const axiosService = new Axios();

export default axiosService;

export const API = {
  async get<T>(url: string, config: AxiosRequestConfig = {}) {
    return axiosService.instance?.get<T>(url, config);
  },
  async post<T>(url: string, data?: unknown, config: AxiosRequestConfig = {}) {
    return axiosService.instance?.post<T>(url, data, config);
  },
  async put<T>(url: string, data: unknown, config: AxiosRequestConfig = {}) {
    return axiosService.instance?.put<T>(url, data, config);
  },
  async patch<T>(url: string, data?: unknown, config: AxiosRequestConfig = {}) {
    return axiosService.instance?.patch<T>(url, data, config);
  },
  async delete<T>(
    url: string,
    data?: unknown,
    config: AxiosRequestConfig = {}
  ) {
    return axiosService.instance?.delete<T>(url, {
      ...config,
      data,
    });
  },
};
