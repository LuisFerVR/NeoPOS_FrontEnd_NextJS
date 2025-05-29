'use server';

import { ErrorResponseSchema, OrderSchema, SuccessResponseSchema } from "@/app/src/schemas";
import { revalidateTag } from "next/cache";

export async function submitOrder (data: unknown) {
    const order = OrderSchema.parse(data);
    const req = await fetch(`${process.env.API_URL}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
    });
    const res = await req.json();
    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(res);
        return {
            errors: errors.message.map(error => error),
            success: ''
        }
    }
    const success = SuccessResponseSchema.parse(res);
    revalidateTag('products-by-category');

    return {
        errors: [],
        success: success.message
    }
}