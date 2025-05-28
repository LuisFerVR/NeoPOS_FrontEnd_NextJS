import { create } from "zustand";
import { Coupon, CouponResponseSchema, Product, ShoppingCart } from './schemas';
import { devtools } from "zustand/middleware";
interface Store {
    total: number;
    discount: number;
    contents: ShoppingCart;
    coupon: Coupon;
    addToCart: (product: Product) => void;
    updateQuantity: (id: Product['id'], quantity: number) => void;
    removeFromCart: (id: Product['id']) => void;
    calculateTotal: () => void;
    applyCoupon: (couponName: string) => Promise<void>;
    applyDiscount: () => void;
    clearOrder : () => void;
}

const initialState = {
    total: 0,
    discount: 0,
    contents: [],
    coupon: {
        name: '',
        message: '',
        percentaje: 0
    },
}

export const useStore = create<Store>()(devtools((set, get) => ({
    ...initialState,
    addToCart: (product) => {
        const { id: productId, categoryId, ...data } = product;
        let contents : ShoppingCart = []
        const duplicated = get().contents.findIndex(itme => itme.productId === productId);
        if(duplicated > 0 ) {
            if (get().contents[duplicated].inventory <= get().contents[duplicated].quantity) return;
            contents = get().contents.map(item => item.productId === productId ? {
                ...item,
                quantity: item.quantity + 1
            }: item)
        } else {
            contents = [...get().contents, {
                ...data,
                quantity: 1,
                productId
            }]
        }

        set(() => ({
            contents
        }))

        get().calculateTotal();

    },

    updateQuantity: (id, quantity) => {
        const contents = get().contents.map(item => item.productId === id ? {
            ...item,
            quantity
        }: item);
        set(() => ({
            contents
        }))
        get().calculateTotal();
    },

    removeFromCart(id) {
        set((stete) => ({
            contents: stete.contents.filter(item => item.productId !== id)
        }))
        if(!get().contents.length) {
            get().clearOrder();
        }
        get().calculateTotal();
    },

    calculateTotal: () => {
        const total = get().contents.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        set(() => ({
            total
        }))

        if (get().coupon.percentaje > 0) {
            get().applyDiscount();
        }
    },

    applyCoupon : async (couponName) => {
        const req = await fetch('coupons/api',{
            method: 'POST',
            body: JSON.stringify({
                coupon_name: couponName
            })
        })
        const res = await req.json();
        const coupon = CouponResponseSchema.parse(res);
        set(() => ({
            coupon
        }))

        if (coupon.percentaje) {
            get().applyDiscount();
        }
    },

    applyDiscount: () => {
        const subTotal = get().contents.reduce((total, item) => total + (item.price * item.quantity), 0);
        const discount = (get().coupon.percentaje / 100) * subTotal;
        const total = subTotal - discount;
        set(() => ({
            discount,
            total
        }))
    },

    clearOrder: () => set(() => ({
        ...initialState
    }))
})))