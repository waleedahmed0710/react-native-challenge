import axios from "axios";
import { API_BASE_URL } from "@/utils/env";
import { attachGlobalErrorHandler } from "./interceptors";

const stackApi = axios.create({ baseURL: API_BASE_URL, timeout: 10_000 });
attachGlobalErrorHandler(stackApi);

export default stackApi;
