import { Product } from "@/app/src/schemas";
import { formatCurrency } from '../../app/src/utils';
import AddProductButton from "./AddProductButton";
import Image from "next/image";

export default function ProductCard({product}: {product: Product}) {
    return (
        <div
            className='rounded bg-white shadow relative p-5'
        >
            <div>
                <Image 
                alt={`Imagen del producto ${product.name}`}
                src={`${process.env.API_URL}/img/${product.image}`}
                width={200}
                height={400}
                priority
                />
                <div className="p-3 space-y-2">
                    <h3 className="text-xl font-bold text-gray-600">{product.name}</h3>
                    <p className="text-gray-500">Disponibles:{product.inventory}</p>
                    <p className="text-2xl font-extrabold  text-gray-900">{formatCurrency(product.price)}</p>
                </div>
            </div>
            <AddProductButton product={product}/>
        </div>
    )
}