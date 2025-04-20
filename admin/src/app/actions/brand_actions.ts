'use server'

import { API_BASE_URL, ApiError, ApiResponse } from "@/utils/utils"
import { Brand } from "../pages/catalogs/brand/page"
import axios from "axios"

export async function addBrand(formData: FormData): Promise<ApiResponse<Brand>> {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/brand/new`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (!data.success) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;
    } catch (e: unknown) {
        throw new Error(ApiError(e));
    }
}