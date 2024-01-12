import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuatity: 0,
        totalPrice: 0
    },
    reducers: {
        addItemsToCart: (state, action) => {
            const newItem = action.payload;
            newItem.price = +newItem.price; 
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuatity++
            state.totalPrice += newItem.price;
            if (!existingItem) {
                state.items.push({...newItem, qualitity: 1});
                return;
            }
            existingItem.qualitity++
        },
        removeItemsToCart: (state, actions) => {
            if (!state.totalQuatity) {
                return;
            }
            const id = actions.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem.qualitity === 1) {
                state.items = state.items.filter(item => item.id !== id);
                state.totalQuatity--
                state.totalPrice -= existingItem.price
                return
            }
            state.totalQuatity--
            state.totalPrice -= existingItem.price
            existingItem.qualitity--;
        }
    }
})


// const getAllProduct = () => {
//     return async (dispath) => {
//         const response = await fetch
//     }
// }

// const saveOrderData = (cart) => {
//     return () => {
//         localStorage.setItem('order', JSON.stringify(cart))
//     }
// }
// const getOrderData = () => {
//     return (dispath) => {
//         const data = JSON.parse(localStorage.getItem('order'))
//         const { items = [], totalQuatity = 0, totalPrice = 0 } = data;
//         dispath({
//             items,
//             totalQuatity,
//             totalPrice
//         })
//     }
// }

export const cardAction = cardSlice.actions;

export default cardSlice.reducer;