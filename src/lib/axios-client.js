
import axios from "axios";

const baseURL="https://backend-ten-pi-20.vercel.app/api";

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { data, status } = error.response;

    if (data === "Unauthorized" && status === 401) {
      window.location.href = "/";
    }

    const customError= {
      ...error,
      errorCode: data?.errorCode || "UNKNOWN_ERROR",
    };

    return Promise.reject(customError);
  }
);

export default API;
