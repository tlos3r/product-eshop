import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        ADD_TO_CART(state, action) {
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (productIndex >= 0) {
                // item already exists in the cart
                // increase the cartQuantity
                state.cartItems[productIndex].cartQuantity += 1;
                toast.info(`${action.payload.name} tăng lên 1`, { position: "top-left" });
            } else {
                // Item doesn't exists in the card
                // Add item to the cart
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} được thêm vào giỏ`, { position: "top-left" });
            }
            // save cart to local storage
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        DECREASE_CART(state, action) {
            const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (state.cartItems[productIndex].cartQuantity > 1) {
                state.cartItems[productIndex].cartQuantity -= 1;
                toast.info(`${action.payload.name} giảm xuống 1`, { position: "top-left" });
            } else if (state.cartItems[productIndex].cartQuantity === 1) {
                const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id);
                state.cartItems = newCartItem;
                toast.success(`${action.payload.name} xoá khỏi giỏ hàng`, { position: "top-left" });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        REMOVE_FROM_CART: (state, action) => {
            const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id);
            state.cartItems = newCartItem;
            toast.success(`${action.payload.name} xoá khỏi giỏ hàng`, { position: "top-left" });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        CLEAR_CART(state, action) {
            state.cartItems = [];
            toast.success(`Xoá toàn bộ giỏ thành công`, { position: "top-left" });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        CALCULATE_SUBTOTAL(state) {
            const array = [];
            state.cartItems.map((item) => {
                const { price, cartQuantity } = item;
                const cartItemAmount = price * cartQuantity;
                return array.push(cartItemAmount);
            });
            const totalAmount = array.reduce((a, b) => {
                return a + b;
            }, 0);
            state.cartTotalAmount = totalAmount;
        },
        CALCULATE_TOTAL_QUANTITY(state, action) {
            const array = [];
            state.cartItems.map((item) => {
                const { cartQuantity } = item;
                return array.push(cartQuantity);
            });
            const totalQuantity = array.reduce((a, b) => {
                return a + b;
            }, 0);
            state.cartTotalQuantity = totalQuantity;
        },
    },
});

export const {
    ADD_TO_CART,
    DECREASE_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    CALCULATE_SUBTOTAL,
    CALCULATE_TOTAL_QUANTITY,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;

export default cartSlice.reducer;
