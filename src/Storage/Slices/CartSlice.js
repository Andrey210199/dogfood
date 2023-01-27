import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    data: {}
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addCart: (state, action) => {
            state.data = { ...state.data, [action.payload._id]: { ...action.payload, quality: 1 } };
        },

        setCountCart: (state, action) => {
            state.data[action.payload.id].quality = action.payload.quality;
        },

        deleteCart: (state, action) => {
            delete state.data[action.payload];
        }

    }
});

export const { addCart, deleteCart, setCountCart } = cartSlice.actions;
export default cartSlice.reducer;