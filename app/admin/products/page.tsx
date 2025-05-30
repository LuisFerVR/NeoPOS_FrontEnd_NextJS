import Heading from "@/components/ui/Heading";
import { ProductResponseSchema } from '../../src/schemas';
import ProductsTable from "@/components/products/ProductsTable";

async function getProducts () {
  const url = `${process.env.API_URL}/products`
  const req = await fetch(url);
  const res = await req.json();
  const data = ProductResponseSchema.parse(res);

  if (!req.ok) {
    throw new Error('Error al cargar los productos');
  }
  return {
    products: data.products,
    total: data.total,
  };
}

export default async function ProductsPage() {
  const {products, total} = await getProducts();
  return (
    <>
      <Heading>Administrar productos</Heading>
      <ProductsTable products={products}/>
    </>
  )
}
