import axios from "axios";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface FlaskErrorResponse {
    error: string;
}

export type ApiResponse<T> = {
    success: boolean,
    message: string,
    payload: T
}

export function ApiError(error: unknown): string {
    if (axios.isAxiosError<FlaskErrorResponse>(error)) {
        return error.response?.data?.error ?? 'Unknown server error';
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'Unknown error occurred';
}
