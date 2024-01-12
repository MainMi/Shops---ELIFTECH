import { authAction } from "../auth-slice";
import { delayHideNotification, notificationAction, notificationStatusState } from "../notification-slice";
import urlEnum from "../../constant/urlEnum"
import Cookies from 'universal-cookie'

const cookies = new Cookies();
export const fetchAuth = (responseFn, responseArgm, notification = true) =>
    async (dispatch) => {

        const authToken = cookies.get('Access');
        if (!authToken || !authToken.length) {
            return;
        }
        dispatch(authAction.updateAuth({ userToken: authToken }));

        try {
            if (notification) {
                dispatch(notificationAction.changeNotification(notificationStatusState.loading));
            }
            let { url, method = 'GET', body = null } = responseArgm;
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': authToken
            };
            if (body) {
                body = JSON.stringify(body)
            }
            const response = await fetch(url, { method, headers, body });
            let responseData = await response.json();
            const isUnauthorized = responseData.errorStatus === 4011 || responseData.errorStatus === 4012;
            
            if (isUnauthorized) {
                const refreshedData = await refreshAuthToken(headers);
                if (!refreshedData) {
                    dispatch(notificationAction.changeNotification({
                        ...notificationStatusState.error,
                        message: "You need to login"
                    }));
                    dispatch(delayHideNotification(2000));
                    dispatch(authAction.logOutAuth());
                    return;
                }
                const { access_token } = refreshedData.tokenPair;
                dispatch(authAction.updateAuth({ userToken: access_token }))
                const newResponse = await fetch(url, {
                    method,
                    headers: { 
                        ...headers, 'Authorization': access_token
                    },
                    body 
                });
                responseData = await newResponse.json();

            }
            if (responseData.status >= 400 && responseData.status < 600) {
                dispatch(notificationAction.changeNotification({
                    ...notificationStatusState.error,
                    message: responseData.message
                }));
                dispatch(delayHideNotification(4000));
                return responseData;
            }
            if (notification) {
                dispatch(
                    notificationAction.changeNotification(
                        {
                            ...notificationStatusState.success,
                            message: responseData
                        }
                    )
                );
                dispatch(delayHideNotification(2000));
            }
            responseFn(responseData, dispatch);

        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
        }
    };

async function refreshAuthToken(headers) {
    const refreshToken = cookies.get('Refresh');
    if (!refreshToken) {
        return null;
    }

    const refreshResponse = await fetch(urlEnum.refresh, {
        method: 'GET',
        headers: { ...headers, 'Authorization': refreshToken }
    });

    if (!refreshResponse) {
        return null;
    }
    const refreshData = await refreshResponse.json();

    if (refreshData.errorStatus) {
        return null;
    }
    const { access_token, refresh_token } = refreshData.tokenPair;
    cookies.set('Access', access_token);
    cookies.set('Refresh', refresh_token);
    return refreshData;
}
export const fetchRegister = (body) => {
    return async (dispatch) => {
        try {
            body = JSON.stringify(body);
            const response = await fetch(urlEnum.register, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            });
            if (!response) {
                throw new Error('Could not fetch data');
            }
            
            const data = await response.json();
            if (data.status >= 400 && data.status < 600) {
                dispatch(notificationAction.changeNotification({
                    ...notificationStatusState.error,
                    message: data.message
                }));
                dispatch(delayHideNotification(4000));
                return;
            }
            dispatch(
                notificationAction.changeNotification(notificationStatusState.success
                    ));
            dispatch(delayHideNotification(2000));
            
        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
        }
    }
}
export const fetchLogin = (body) => {
    return async (dispatch) => {
        try {
            body = JSON.stringify(body);
            const response = await fetch(urlEnum.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body
            });
            if (!response) {
                throw new Error('Could not fetch data');
            }
            
            const data = await response.json();
            if (data.status >= 400 && data.status < 600) {
                dispatch(notificationAction.changeNotification({
                    ...notificationStatusState.error,
                    message: data.message
                }));
                dispatch(delayHideNotification(4000));
                return;
            }
            dispatch(notificationAction.changeNotification(notificationStatusState.success));
            dispatch(delayHideNotification(2000));

            const { user, access_token, refresh_token } = data;
            
            dispatch(authAction.updateAuth({
                userInfo: { ...user, password: undefined },
                userToken: access_token
            }));

            cookies.set('Access', access_token);
            cookies.set('Refresh', refresh_token);

        } catch (e) {
            dispatch(notificationAction.changeNotification({
                ...notificationStatusState.error,
                message: e.message
            }));
        }
    }
}

export const fetchUserInfo = () => {
    const responseFn = (data, dispatch) => {
        dispatch(authAction.updateAuth({
            userInfo: { ...data, password: undefined }
        }))
    }
    return fetchAuth(responseFn, { url: urlEnum.userInfo }, false);
}

export const updateUser = (body) => async (dispatch) => {
    await dispatch(fetchAuth(() => {}, { url: urlEnum.userUpdate, method: 'POST', body }))
    dispatch(fetchUserInfo())
}

export const addShopToUser = (body) => async (dispatch) => {
    await dispatch(fetchAuth(() => {}, { url: urlEnum.addShop, method: 'POST', body }))
    dispatch(fetchUserInfo())
}
export const deleteStoreToUser = (body) => async (dispatch) => {
    await dispatch(fetchAuth(() => {}, { url: urlEnum.deleteShop, method: 'POST' , body }))
    dispatch(fetchUserInfo())
}
export const addProductToUser = (body) => async (dispatch) => {
    await dispatch(fetchAuth(() => {}, { url: urlEnum.addProduct, method: 'POST', body }))
    dispatch(fetchUserInfo())
}

export const editProduct = (body) => async (dispatch) => {
    await dispatch(fetchAuth(() => {}, { url: urlEnum.editProduct, method: 'POST' ,body }))
    dispatch(fetchUserInfo())
}

export const deleteProduct = (body) => async (dispatch) => {
    await dispatch(fetchAuth(() => {}, { url: urlEnum.deleteProduct, method: 'POST' ,body }))
    dispatch(fetchUserInfo())
}
