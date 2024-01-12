import urlEnum from "../../constant/urlEnum";
import { delayHideNotification, notificationAction, notificationStatusState } from "../notification-slice";
import { productAction } from "../product-slice";
export const fetchProduct = (queryData) => {
    return async (dispatch) => {
        try {
            dispatch(notificationAction.changeNotification(notificationStatusState.loading));

            const queryParams = new URLSearchParams(queryData).toString();
            const fullUrl = `${urlEnum.getAllProduct}?${queryParams}`;

            const response = await fetch(fullUrl, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
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
            dispatch(notificationAction.changeNotification(
                {
                    ...notificationStatusState.success,
                    message: 'Product loading success'
                }
            ));
            dispatch(delayHideNotification(2000));
            dispatch(productAction.replaceProduct({...data, items: data.data, data: undefined, isSearch: true}));
        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
        }
    }
};



