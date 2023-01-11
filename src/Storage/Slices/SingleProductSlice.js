import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SINGEPRODUCTNAME } from "../../Constant/StoreConstant";
import { isError } from "../../Utilites/StoreFunctions";
import { unAutch } from "./UserSlice";


const initialState = {
    data: null,
    loading: true,
    error: null,

    commentsLoading: true,
    comments: null
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

    async function ({ productId, body }, { rejectWithValue, fulfillWithValue, getState, extra: api }) {

        try {
            const { user } = getState();
            const data = await api.setReview(body, productId);
            return fulfillWithValue({data, user});

        } catch (error) {
            return rejectWithValue(error);
        }

    }
);

export const fetchGetComments = createAsyncThunk(
    `${SINGEPRODUCTNAME}/fetchGetComments`,

    async function (productId, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {
            const data = await api.getComments(productId);
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }

    }
)

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
            .addCase(fetchGetComments.pending, state => {
                state.commentsLoading = true;
                state.comments = null;
            })
            .addCase(fetchGetComments.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.commentsLoading = false;
            })
            .addCase(fetchSingleProduct.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchRewiew.fulfilled, (state, action) => {
                const { data, user } = action.payload;
                const comment = data.reviews[data.reviews.length - 1];
                state.comments.push({ ...comment, author: user.data });
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
});

export const { setProductState } = singleProductSlice.actions;
export default singleProductSlice.reducer;