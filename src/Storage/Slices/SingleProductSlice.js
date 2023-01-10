import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SINGEPRODUCTNAME } from "../../Constant/StoreConstant";
import { isError } from "../../Utilites/StoreFunctions";
import { unAutch } from "./UserSlice";


const initialState = {
    data: null,
    loading: true,
    error: null
}

export const fetchSingleProduct = createAsyncThunk(
    `${SINGEPRODUCTNAME}/fetchSingleProduct`,

    async function (productId, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.getProducts(productId);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }

);

export const fetchRewiew = createAsyncThunk(
    `${SINGEPRODUCTNAME}/fetchRewiew`,

    async function ({ productId, body }, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.setReview(body, productId);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }

    }
);

const singleProductSlice = createSlice({
    name: SINGEPRODUCTNAME,
    initialState,
    reducers: {
        setProductState: (state, action) => {
            state.data = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchSingleProduct.pending, state => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchRewiew.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
});

export const { setProductState } = singleProductSlice.actions;
export default singleProductSlice.reducer;