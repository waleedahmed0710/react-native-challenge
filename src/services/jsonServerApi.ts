import axios from "axios";
import { attachGlobalErrorHandler } from "./interceptors";
import { JSON_SERVER_BASE_URL } from "@/utils/env";

const jsonServerApi = axios.create({
  baseURL: JSON_SERVER_BASE_URL,
  timeout: 10_000,
});
attachGlobalErrorHandler(jsonServerApi);

export default jsonServerApi;
