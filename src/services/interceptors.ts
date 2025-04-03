import Toast from "react-native-toast-message";
import type { AxiosInstance } from "axios";

export const attachGlobalErrorHandler = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      const message =
        err?.response?.data?.message || err?.message || "Something went wrong";

      Toast.show({
        type: "error",
        text1: "Request Error",
        text2: message,
      });

      return Promise.reject(err);
    }
  );
};
