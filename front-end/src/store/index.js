import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth-slice";
import uiReducer from "./ui-slice";
import cardReducer from './cart-slice';
import notificationReducer from './notification-slice';
import shopReducer from './shop-slice';
import productReducer from './product-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        card: cardReducer,
        notification: notificationReducer,
        shop: shopReducer,
        product: productReducer,
    }
});

export default store;