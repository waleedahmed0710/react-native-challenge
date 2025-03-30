import { baseApi } from "../api/baseApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const categoriesService = {
    getAllCategories: async () => {
        try {   // Get the token from AsyncStorage
            const token = await AsyncStorage.getItem("token");

            if (!token) {
                throw new Error("Authentication token not found");
            }
            const response = await baseApi.get('categories', {
                headers: {
                    'Authorization': token
                }
            });

            return {
                success: true,
                data: response.data.data || response.data
            };
        } catch (error) {
            console.error("Error fetching categories:", error);
            throw error;
        }
    },

    getCategoryById: async (categoryId: number) => {
        try {
            const token = await AsyncStorage.getItem("token");

            if (!token) {
                throw new Error("Authentication token not found");
            }

            const response = await baseApi.get(`categories/${categoryId}`, {
                headers: {
                    'Authorization': token
                }
            });

            return {
                success: true,
                data: response.data.data || response.data
            };
        } catch (error) {
            console.error(`Error fetching category ${categoryId}:`, error);
            throw error;
        }
    },
};