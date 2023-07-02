import { urlEnum } from "../../constant/urlEnum";
import { delayHideNotification, notificationAction, notificationStatusState } from "../notification-slice";
import { shopAction } from "../shop-slice";

export const fetchShops = () => {
    return async (dispatch) => {
        try {
            dispatch(notificationAction.changeNotification(notificationStatusState.loading));
            const response = await fetch(urlEnum.getAllShop, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Could not fetch data');
            }
            const data = await response.json();
            if (data.status >= 400 && data.status < 600) {
                dispatch(notificationAction.changeNotification({
                    ...notificationStatusState.error,
                    message: data.message
                }));
                return;
            }
            dispatch(notificationAction.changeNotification(notificationStatusState.success));
            dispatch(delayHideNotification(2000));
            dispatch(shopAction.replaceShop(data));
        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
        }
    }
};


