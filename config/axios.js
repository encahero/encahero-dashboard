import axios from "axios";

import { storage } from "@/utils";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_PORT = process.env.NEXT_PUBLIC_API_PORT;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
const instance = axios.create({
  baseURL: `${API_HOST}:${API_PORT}/${API_VERSION}`,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

instance.interceptors.request.use(
  async function (config) {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    const token = await storage.getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  async function (error) {
    console.log("--- Axios response error --- ");

    let messageError = "Internal Server Error";
    let statusCode = 500;
    let status = "INTERNAL_SERVER_ERROR";
    const originalRequest = error.config;
    if (error.response && error.response.data) {
      messageError = error.response.data.message;
      statusCode = error.response.data.statusCode;
      status = error.response.data.status;
    }

    console.log(messageError);

    if (status === "UNAUTHORIZED") {
      // handle token expired
      if (messageError === "Access token expired") {
        if (!originalRequest.retry) {
          originalRequest._retry = true;
          console.log("------- refresh ------- ");
          try {
            const accessToken = await refreshToken();
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return instance(error.config);
          } catch (error) {
            console.log("Refresh token", error);
          }
        }
      } else {
        try {
          await Promise.all([
            storage.clearAllTokens(),
            storage.clearUser(),
            instance.get("/auth/logout").catch(() => {}), // bỏ qua lỗi logout
          ]);
        } catch (error) {
          console.error("Logout error", error);
        } finally {
          window.location.href = "/login";
        }
      }
    }

    // Lỗi network hoặc unexpected → reject promise
    return Promise.reject({
      message: messageError,
      statusCode,
      status,
    });
  }
);

const refreshToken = async () => {
  try {
    const token = await storage.getRefreshToken();
    const res = await instance.post(`/auth/refresh-token`, { token });
    const { accessToken } = res.data;
    if (!accessToken) {
      throw new Error("Failed to get access token from refresh");
    }
    storage.setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    throw error;
  }
};

export default instance;
