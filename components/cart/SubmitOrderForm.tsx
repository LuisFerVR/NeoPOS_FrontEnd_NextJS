import { submitOrder } from "@/actions/submit-order-action"
import { useStore } from "@/app/src/store"
import { useActionState, useEffect } from "react"
import { toast } from "react-toastify";

export default function SubmitOrderForm() {
    const total = useStore((state) => state.total);
    const coupon = useStore((state) => state.coupon.name);
    const contents = useStore((state) => state.contents);
    const clearOrder = useStore((state) => state.clearOrder);
    const order = {
        total,
        coupon,
        contents
    }
    const submitOrderWithData = submitOrder.bind(null, order);

    const [state, dispatch] = useActionState(submitOrderWithData, {
        errors: [],
        success: '',
    })

    useEffect(() => {
        if (state.errors) {
            state.errors.forEach((error) => {
                toast.error(error)
            });
        }
        if (state.success) {
            toast.success(state.success);
            clearOrder();
        }
    }, [state, clearOrder])
  return (
    <form
    action={dispatch}>
        <input
            type="submit"
            className="w-full mt-3 bg-indigo-600 font-bold hover:bg-indigo-700 text-white uppercase p-3"
            value='Confirmar Compra'
        ></input>
    </form>
  )
}
