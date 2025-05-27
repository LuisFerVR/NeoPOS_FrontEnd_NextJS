import { CategoriesResponseSchema } from "@/app/src/schemas";
import Logo from "./logo";
import Link from "next/link";

async function getCategories() {
    const url = `${process.env.API_URL}/categories`;
    const req = await fetch(url);
    const res = await req.json();
    const categories = CategoriesResponseSchema.parse(res);
    return categories;
}

export default async function MainNav() {
  const listCategories = await getCategories();
  return (
    <header className="px-10 py-5 bg-gray-700 flex flex-col md:flex-row justify-between ">
        <div className="flex justify-center">
            <Logo />
        </div>

        <nav className="flex flex-col md:flex-row gap-2 items-center mt-5 md:mt-0">
            {listCategories.map(category => (
                <Link 
                key={category.id}
                href={`/${category.id}`}
                className="text-white hover:text-green-400 transition-colors font-bold p-2"
                >{category.name}</Link>
            ))}
        </nav>
    </header>
  )
}