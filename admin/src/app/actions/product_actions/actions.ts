'use server'
import { Brand, BrandResponse } from "@/app/pages/products/brands/page";
import { AppErrorResponse } from "@/utils/utils";
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export const getBrands = async (param: {
    name: string,
    sort_by: string,
    order: 'desc' | 'asc'
}): Promise<BrandResponse<[Brand]>> => {
    try {
        const { data } = await axios.get<BrandResponse<[Brand]>>(`${apiUrl}/shoe/all/brand`, {
            params: param
        });
        return data;
    } catch (error: unknown) {
        AppErrorResponse(error)
    }
};

export const addBrand = async (formData: FormData): Promise<BrandResponse<Brand>> => {
    try {
        const response = await axios.post<BrandResponse<Brand>>(
            `${apiUrl}/shoe/new/brand`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (error: unknown) {
        AppErrorResponse(error)
    }
};