import axios from 'axios';

const BASE_URL = 'https://service-finder-api.appsprojectbook.com/';

export const baseApi = axios.create({
    baseURL: BASE_URL,
});

baseApi.defaults.headers.common["Content-Type"] = "application/json";
baseApi.defaults.headers.common["Accept"] = "application/json";
