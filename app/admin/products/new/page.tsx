import AddProductForm from "@/components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <>
        <Link
            href="/admin/products?page=1"
            className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-black bg-green-600 rounded-md hover:bg-green-700"
        >
            Volver
        </Link>
        <Heading>
            Nuevo producto
        </Heading>
        <AddProductForm>
            <ProductForm />
        </AddProductForm>
    </>
  )
}
