"use server";

import { ProductFormSchema } from "@/app/src/schemas";
import { ErrorResponseSchema } from '../app/src/schemas';

type ActionStateType = {
    errors: string[];
    success: string;
}

export async function addProduct(prevState: ActionStateType, formData: FormData) {
    const product = ProductFormSchema.safeParse({
        name: formData.get('name'),
        price: formData.get('price'),
        image: formData.get('image'),
        inventory: formData.get('inventory'),
        categoryId: formData.get('categoryId')
    });

    if (!product.success) {
        return {
            errors: product.error.errors.map(err => err.message),
            success: ''
        }
    }
    
    const url = `${process.env.API_URL}/products`;

    const req = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product.data)
    });

    const res = await req.json();

    if (!req.ok) {
        const errors = ErrorResponseSchema.parse(res);
        return {
            errors: errors.message.map(issue => issue),
            success: ''
        }
    }

    return {
        errors: [],
        success: 'Producto Agregado Correctamente'
    }
}