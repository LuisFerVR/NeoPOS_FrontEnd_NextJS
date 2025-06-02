import Heading from "@/components/ui/Heading";
import { ProductResponseSchema } from '../../src/schemas';
import ProductsTable from "@/components/products/ProductsTable";
import { isValidPage } from "@/app/src/utils";
import { redirect } from "next/navigation";
import Pagination from "@/components/ui/Pagination";

type SearchParams = Promise<{ page: string }>;

async function getProducts (take: number, skip: number) {
  const url = `${process.env.API_URL}/products?take=${take}&skip=${skip}`;
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

export default async function ProductsPage({searchParams}:{searchParams: SearchParams}) {
  const {page} = await searchParams;
  const pageInNumber = +page;
  if (!isValidPage(pageInNumber)) redirect('/admin/products?page=1');
  const productsPerPage = 10;
  const skip = (pageInNumber - 1) * productsPerPage;

  const {products, total} = await getProducts(productsPerPage, skip);
  const totalPages = Math.ceil(total / productsPerPage);
  if (pageInNumber > totalPages) redirect('/admin/products?page=1');

  return (
    <>
      <Heading>Administrar productos</Heading>
      <ProductsTable products={products}/>
      <Pagination page={pageInNumber} totalPages={totalPages} />
    </>
  )
}
