import { createSlice }  from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false,
        formOrderIsVisible: false,
        animateCard: false,
        addStoreIsVisible: false,
        addProductIsVisible: false
    },
    reducers: {
        toggle(state, action) {
            const key = action.payload ? action.payload : uiConstantIsVisible.cartIsVisible;
            state[key] = !state[key];
        },
        disabled(state, action) {
            const key = action.payload ? action.payload : uiConstantIsVisible.cartIsVisible;
            state[key] = false;
        },
        enable(state, action) {
            const key = action.payload ? action.payload : uiConstantIsVisible.cartIsVisible;
            state[key] = true;
        },
    }
});


export const uiAction = uiSlice.actions;

export const uiConstantIsVisible = {
    animateCard: 'animateCard',
    cartIsVisible: 'cartIsVisible',
    formOrderIsVisible: 'formOrderIsVisible',
    addProductIsVisible: 'addProductIsVisible',
    addStoreIsVisible: 'addStoreIsVisible'
}

export default uiSlice.reducer;