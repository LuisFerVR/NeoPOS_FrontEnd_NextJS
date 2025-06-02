import Link from "next/link";

export default function Pagination({page, totalPages}: {page: number, totalPages: number}) {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1);
  return (
    <nav className="flex items-center justify-center py-10">
        {page > 1 && (
            <Link
                href={`/admin/products?page=${page - 1}`}
                className="px-4 py-2 mx-1 text-sm rounded-md "
            >&laquo;</Link>
        )}
        
        {pages.map(currentPage => (
            <Link
                key={currentPage}
                href={`/admin/products?page=${currentPage}`}
                className={`px-4 py-2 mx-1 text-sm rounded-md ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
                {currentPage}
            </Link>
        ))}

        {page < totalPages && (
            <Link
                href={`/admin/products?page=${page + 1}`}
                className="px-4 py-2 mx-1 text-sm rounded-md "
            >&raquo;</Link>
        )}
    </nav>
  )
}
