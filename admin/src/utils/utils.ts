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

export function ApiError(error: unknown): never {
    if (axios.isAxiosError<FlaskErrorResponse>(error)) {
        const message = error.response?.data?.error ?? 'Unknown server error';
        const status = error.response?.status ?? 500;

        throw new Error(`⨯ Error [AxiosError]: ${message} (Status: ${status})`);
    }

    if (error instanceof Error) {
        throw new Error(`⨯ Unexpected Error: ${error.message}`);
    }

    throw new Error('⨯ Unknown error occurred');
}