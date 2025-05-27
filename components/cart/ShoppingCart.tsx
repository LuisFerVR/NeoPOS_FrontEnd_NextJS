'use client';

import { useStore } from "@/app/src/store";
import ShoppingCartItem from "./ShoppingCarItem";

export default function ShoppingCart() {
  const contents = useStore((state) => state.contents);

  return (
    <>
      <h2 className="text-4xl font-bold text-gary-900">Resumen de Venta</h2>
      <ul className="mt-6 divide-y divide-gar-200 border-t border-gary-200 text-sm font-medium text-gray-500">
        {contents.map((item) => (
          <ShoppingCartItem 
            key={item.productId}
            item={item}
          />
        ))}
      </ul>
    </>
  )
}
