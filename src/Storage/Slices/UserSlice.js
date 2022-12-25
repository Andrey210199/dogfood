import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { USERSTATENAME } from "../../Constant/StoreConstant";
import { deleteCookie, getCookie, setCookie } from "../../Utilites/Cookie";
import { isError } from "../../Utilites/StoreFunctions";

const initialState = {
    data: null,
    loading: true,
    error: null,

    isAutchCheck: false
}

export const fetchGetUser = createAsyncThunk(
    `${USERSTATENAME}/fetchGetUser`,

    async function (_, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.userInfo();
            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchUserAutch = createAsyncThunk(
    `${USERSTATENAME}/fetchUserAutch`,

    async function (body, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = await api.authorize(body);
            if (data.token) {
                const cookie_date = new Date();
                cookie_date.setMonth(cookie_date.getMonth() + 1);
                document.cookie = setCookie("token", data.token, { "max-age": cookie_date.toUTCString() });
                console.log(getCookie("token"))
            }
            else {
                return rejectWithValue(data);
            }

            return fulfillWithValue(data);

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchTokenCheck = createAsyncThunk(
    `${USERSTATENAME}/fetchTokenCheck`,

    async function (token, { rejectWithValue, fulfillWithValue, dispatch, extra: api }) {

        try {

            const data = api.checkToken(token);
            return fulfillWithValue(data);

        }
        catch (error) {
            return rejectWithValue(error);
        }
        finally {
            return dispatch(authCheck());
        }
    }
);

export const fetchRegistration = createAsyncThunk(
    `${USERSTATENAME}/fetchRegistration`,

    async function (body, { rejectWithValue, fulfillWithValue, extra: api }) {

        try {

            const data = api.register({ ...body, group: "group-7" });
            return fulfillWithValue(data)

        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export function unAutch() {
    deleteCookie("token");
    fetchGetUser();
}



const userSlice = createSlice({
    name: USERSTATENAME,
    initialState,
    reducers: {
        authCheck: state => {
            state.isAutchCheck = true;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchGetUser.pending, state => {
            state.loading = true;
            state.error = null;
            state.isAutchCheck = false;
        })
            .addCase(fetchTokenCheck.pending, state => {
                state.isAutchCheck = false;
            })
            .addCase(fetchGetUser.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isAutchCheck = true;
                state.loading = false;

            })
            .addCase(fetchRegistration.fulfilled, state => {
                state.loading = false;
            })
            .addCase(fetchUserAutch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isAutchCheck = true;
                state.loading = false;
            })
            .addCase(fetchTokenCheck.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isAutchCheck = true;
                state.loading = false;
            })
            .addMatcher(isError, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })

    }
});

export const { authCheck } = userSlice.actions;
export default userSlice.reducer;