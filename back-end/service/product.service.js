const shopService = require('./shop.service');
const product = require('../database/model/product');

module.exports = {
    getProductWithCount: async (queryData) => {
        const {
            limit = 20,
            page = 1,
            minPrice,
            maxPrice,
            ...otherFilters
        } = queryData;
        let filterObject = {};
        const shop = otherFilters.shop ? otherFilters.shop : '';
        if (otherFilters.search && otherFilters.search.trim() !== '') {
            let shopIds = null;
            if (shop.trim() === '') {
                const shopNameRegex = { $regex: otherFilters.search, $options: 'i' };

                const shops = await shopService.getCurrentShop(({ name: shopNameRegex }));
                shopIds = shops;
            }

            filterObject = {
                $or: [
                    { name: { $regex: otherFilters.search, $options: 'i' } },
                    { shop: { $in: shopIds } }
                ],
            };
        }
        if (minPrice || maxPrice) {
            filterObject = {
                ...filterObject,
                ...(minPrice && { price: { $gte: minPrice } }),
                ...(maxPrice && { price: { $lte: maxPrice } })
            };
        }

        if (shop.trim() !== '') {
            const shopName = await shopService.getCurrentShop(({ name: otherFilters.shop }));
            filterObject = { ...filterObject, shop: shopName._id };
        }

        const skip = limit * (page - 1);

        const products = await product.find(filterObject).limit(limit).skip(skip);
        const count = await product.count(filterObject);

        return {
            page,
            perPage: limit,
            data: products,
            count
        };
    },
    createProduct: (productData) => product.create(productData),
    updateProduct: (queryData, newData) => product.updateOne(queryData, { $set: newData }),
    deleteProduct: (queryData) => product.deleteOne(queryData),
    deleteProducts: (queryData) => product.deleteMany(queryData)
};
