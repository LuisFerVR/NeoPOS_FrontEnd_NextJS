'use client';

import { useStore } from "@/app/src/store";
import ShoppingCartItem from "./ShoppingCarItem";
import Amount from "./Amount";
import CouponForm from "./CouponForm";
import SubmitOrderForm from "./SubmitOrderForm";

export default function ShoppingCart() {
  const contents = useStore((state) => state.contents);
  const total = useStore((state) => state.total);
  const discount = useStore((state) => state.discount);

  return (
    <>
    {contents.length ? (
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
        <dl className="space-y-6 border-t border-gray-300 py-6 text-sm font-medium text-gray-500">
          {discount ? (
            <Amount 
            label='Descuento'
            amount={discount}
            discount={true}
          />
          ) : null}
          <Amount 
            label='Total a pagar'
            amount={total}
          />
        </dl>
        <CouponForm />
        <SubmitOrderForm />
      </>
    ) : (
      <h2 className="text-4xl font-bold text-gary-900">No hay productos en el carrito</h2>
    )
    }
    </>
  )
}
