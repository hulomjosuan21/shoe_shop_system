import axios from "axios";

export interface FlaskErrorResponse {
    error: string;
}

export function AppErrorResponse(error: unknown): never {
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