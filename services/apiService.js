// services/api.js

import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

const BASE_URL = process.env.EXPO_PUBLIC_URL || "https://api.mockfly.dev/mocks/838461a3-ce16-45c6-ad65-3c409d160449";
const axiosService = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// 🔐 REQUEST INTERCEPTOR
axiosService.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request interceptor:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      EXPO_PUBLIC_URL: process.env.EXPO_PUBLIC_URL,
    });
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error); 
    return Promise.reject(error);
  }
);

// 🚨 RESPONSE INTERCEPTOR
axiosService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // token invalid / expired
      await SecureStore.deleteItemAsync(TOKEN_KEY);

      // optional: bisa trigger logout event global
      console.log("Unauthorized - token expired");

      // kamu bisa tambahkan navigation reset di sini nanti
    }

    return Promise.reject(error);
  }
);

export default axiosService;