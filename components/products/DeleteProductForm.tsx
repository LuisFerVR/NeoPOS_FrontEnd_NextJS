import { Product } from "@/app/src/schemas";
import { revalidatePath } from "next/cache";

export default function DeleteProductForm({id}:{id:Product['id']}) {
    const handleDeleteProduct = async () => {
        "use server";
        const url = `${process.env.API_URL}/products/${id}/delete`;
        const req = await fetch(url, {
            method: 'DELETE',
        });
        await req.json();
        revalidatePath('/admin/products');
    }

  return (
    <form
        action={handleDeleteProduct}
    >
        <input
            type="submit"
            value='Eliminar'
            className="text-red-600 hover:text-red-800 cursor-pointer bg-transparent"
        />
    </form>
  )
}
