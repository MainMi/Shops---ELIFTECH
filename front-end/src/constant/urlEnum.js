const api = 'http://localhost:5000'

const urlEnum = {
    api,
    addShop: `${api}/shop/create`,
    deleteShop: `${api}/shop/delete`,
    addProduct: `${api}/shop/product/create`,
    editProduct: `${api}/shop/product/edit`,
    deleteProduct: `${api}/shop/product/delete`,
    getAllShop: `${api}/shop/`,
    getAllProduct: `${api}/shop/product/`,
    sendOrder: `${api}/order/create`,
    register: `${api}/auth/register`,
    login: `${api}/auth/login`,
    refresh: `${api}/auth/refresh`,
    userInfo: `${api}/user/info`,
    userUpdate: `${api}/user/update`,
};

export default urlEnum;
