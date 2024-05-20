import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./feature/slice/authSlice";
import productReducer from "./feature/slice/productSlice";
import filterReducer from "./feature/slice/filterSlice";
import cartReducer from "./feature/slice/cartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
