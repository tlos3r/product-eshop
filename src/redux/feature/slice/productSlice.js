import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    minPrice: null,
    maxPrice: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        STORE_PRODUCT(state, action) {
            state.products = action.payload.products;
        },
        GET_PRICE_RANGE(state, action) {
            //console.log(action.payload);
            const { products } = action.payload;
            const array = [];
            products.map((product) => array.push(product.price));
            //console.log(array);
            const max = Math.max(...array);
            const min = Math.min(...array);
            state.minPrice = min;
            state.maxPrice = max;
        },
    },
});

export const { STORE_PRODUCT, GET_PRICE_RANGE } = productSlice.actions;
export const selectProducts = (state) => state.product.products;
export const selectMinPrice = (state) => state.product.minPrice;
export const selectMaxPrice = (state) => state.product.maxPrice;

export default productSlice.reducer;
