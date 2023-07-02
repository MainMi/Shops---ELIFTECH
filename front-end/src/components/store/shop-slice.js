import { createSlice } from '@reduxjs/toolkit';


const shopSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
    },
    reducers: {
        replaceShop: (state, action) => {
            state.items = action.payload
        }
    }
});
export const shopAction = shopSlice.actions;

export default shopSlice.reducer;