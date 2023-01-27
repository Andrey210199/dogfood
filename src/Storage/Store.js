import { configureStore } from "@reduxjs/toolkit";
import { PRODUCTSSTATENAME, SINGEPRODUCTNAME, USERSTATENAME } from "../Constant/StoreConstant";
import api from "../Utilites/Api";
import CartSlice from "./Slices/CartSlice";
import ProductsSlice from "./Slices/ProductsSlice";
import SingleProductSlice from "./Slices/SingleProductSlice";
import UserSlice from "./Slices/UserSlice";

export const store = configureStore({

    reducer: {

        [USERSTATENAME]: UserSlice,
        [PRODUCTSSTATENAME]: ProductsSlice,
        [SINGEPRODUCTNAME]: SingleProductSlice,
        "cart": CartSlice

    },
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            thunk: {
                extraArgument: api
            }
        });
    }
});