import { baseApi } from "../api/baseApi";

export const authService = {
    login: async (email: string, password: string) => {
        console.log("Logging in with email:", email);
        console.log("Logging in with password:", password);
        try {
            const response = await baseApi.post('/auth/login', { email, password });
            return {
                success: true,
                data: response.data.data,
                token: response.data.token
            };

        } catch (error) {
            throw error;
        }
    },
    register: async (first_name: string, last_name: string, email: string, password: string) => {
        try {
            const response = await baseApi.post('/auth/register', {
                first_name,
                last_name,
                email,
                password
            });
            return {
                success: true,
                data: response.data.data,
                token: response.data.token
            };
        } catch (error) {
            throw error;
        }
    },
};