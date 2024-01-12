import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        isSearch: false,
        count: 0,
        page: 1,
        perPage: 20
    },
    reducers: {
        replaceProduct: (state, action) => {
            return { ...action.payload };
        }
    },
});

export const productAction = productSlice.actions;

export default productSlice.reducer;