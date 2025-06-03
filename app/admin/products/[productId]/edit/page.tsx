import { ProductSchema } from "@/app/src/schemas";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProduct(id:string) {
    const url = `${process.env.API_URL}/products/${id}`;
    const req = await fetch(url);
    const res = await req.json();
    if (!req.ok) {
       notFound();
    }
    const product = ProductSchema.parse(res);
    return product;
}

type Params = Promise<{id: string}>;

export default async function EditProductPage({params}: {params: Params}) {
    const {id} = await params;
    const product = await getProduct(id);
  return (
    <>
        <Link
            href="/admin/products?page=1"
            className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-black bg-green-600 rounded-md hover:bg-green-700"
        >
            Volver
        </Link>
        <Heading>Editar Producto: {product.name}</Heading>
        <EditProductForm>
            <ProductForm product={product}/>
        </EditProductForm>
    </>
  )
}
