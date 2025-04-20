'use server'

import { ApiError } from "@/utils/utils";
import axios from "axios";

export async function sendInstruction(formData: FormData): Promise<string | undefined> {
    try {
        const instruction = formData.get('instruction')?.toString()
        const { data } = await axios.post('http://localhost:5000/ai/process', { instruction });

        if (data.success) {
            return data.route
        } else {
            throw new Error("Route not found!")
        }
    } catch (error: unknown) {
        ApiError(error)
    }
}