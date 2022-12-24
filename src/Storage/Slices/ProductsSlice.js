import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PRODUCTSSTATENAME } from "../../Constant/StoreConstant";
import isLike from "../../Utilites/IsLike";
import { isError } from "../../Utilites/StoreFunctions";

const initialState = {
    data: null,
    loading: true,
    error: null,

    search: null,
    favorites: [],
    total: null
}

export const fetchProducts = createAsyncThunk(
    `${PRODUCTSSTATENAME}/fetchProducts`,

    async function (_, { rejectWithValue, fulfillWithValue, getState, extra: api }) {

        try {

            const { user } = getState();
            const data = await api.getProducts();
            return fulfillWithValue({ ...data, currentUser: user.data });

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchChangeLike = createAsyncThunk(
    `${PRODUCTSSTATENAME}/fetchChangeLike`,

    async function (product, { rejectWithValue, fulfillWithValue, getState, extra: api }) {

        try {

            const { user } = getState();
            const liked = isLike(product.likes, user.data._id);
            const data = await api.checkLike(product._id, liked);
            return fulfillWithValue({data, liked});

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchSearch = createAsyncThunk(
    `${PRODUCTSSTATENAME}/fetchSearch`,

    async function(search, {rejectWithValue, fulfillWithValue, extra: api}){

        try {

            const data = await api.search(search);
            return fulfillWithValue(data);
            
        } catch (error) {
            rejectWithValue(error);
        }

    }
);

const productsSlice = createSlice({
    name: PRODUCTSSTATENAME,
    initialState,
    reducers: {

        setSearchState: (state, action) =>{
            state.search = action.payload;
        }

    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                const { total, products, currentUser } = action.payload;

                state.total = total;
                state.data = products;
                state.favorites = state.data.filter(product => isLike(product.likes, currentUser._id));
                state.loading = false;
            })
            .addCase(fetchChangeLike.fulfilled, (state, action) => {
                const { liked, data } = action.payload;
                state.data = state.data.map(card => card._id === data._id ? data : card);
                
                if (!liked) {
                    state.favorites.push(data);
                }
                else {
                   state.favorites = state.favorites.filter(card => card._id !== data._id);
                }
            })
            .addCase(fetchSearch.fulfilled, (state, action)=>{

                state.data = action.payload;
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
});

export const {setSearchState} = productsSlice.actions;
export default productsSlice.reducer;