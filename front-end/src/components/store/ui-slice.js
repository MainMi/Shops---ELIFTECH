import { createSlice }  from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false,
        formOrderIsVisible: false,
        animateCard: false
    },
    reducers: {
        toggle(state, action) {
            const key = action.payload ? action.payload : uiConstantIsVisible.cartIsVisible;
            state[key] = !state[key];
        }
    }
});


export const uiAction = uiSlice.actions;

export const uiConstantIsVisible = {
    cartIsVisible: 'cartIsVisible',
    formOrderIsVisible: 'formOrderIsVisible',
    animateCard: 'animateCard'
}

export default uiSlice.reducer;