import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filteredProduct: [],
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        FILTER_BY_SEARCH(state, action) {
            // console.log(action.payload);
            const { products, search } = action.payload;
            const tempProducts = products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search.toLowerCase()) ||
                    product.category.toLowerCase().includes(search.toLowerCase())
            );
            state.filteredProduct = tempProducts;
        },
        SORT_PRODUCT(state, action) {
            // console.log(action.payload);
            const { products, sort } = action.payload;
            let tempProducts = [];
            if (sort === "latest") {
                tempProducts = products;
            }
            if (sort === "lowest-price") {
                tempProducts = products.slice().sort((a, b) => {
                    return a.price - b.price;
                });
            }
            if (sort === "highest-price") {
                tempProducts = products.slice().sort((a, b) => {
                    return b.price - a.price;
                });
            }
            if (sort === "a-z") {
                tempProducts = products.slice().sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }
            if (sort === "z-a") {
                tempProducts = products.slice().sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            }
            state.filteredProduct = tempProducts;
        },
        FILTER_BY_CATEGORY: (state, action) => {
            const { products, category } = action.payload;
            let tempProducts = [];
            if (category === "All") {
                tempProducts = products;
            } else {
                tempProducts = products.filter((product) => product.category === category);
            }
            state.filteredProduct = tempProducts;
        },
        FILTER_BY_BRAND: (state, action) => {
            // console.log(action.payload);
            const { products, brand } = action.payload;
            let tempProducts = [];
            if (brand === "All") tempProducts = products;
            else tempProducts = products.filter((product) => product.brand === brand);
            state.filteredProduct = tempProducts;
        },
        FILTER_BY_PRICE: (state, action) => {
            const { products, price } = action.payload;
            let tempProducts = [];
            tempProducts = products.filter((product) => product.price <= price);
            state.filteredProduct = tempProducts;
        },
    },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCT, FILTER_BY_CATEGORY, FILTER_BY_BRAND, FILTER_BY_PRICE } =
    filterSlice.actions;

export const selectFilterProducts = (state) => state.filter.filteredProduct;
export default filterSlice.reducer;
