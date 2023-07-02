const { productService, shopService } = require('../service');

module.exports = {
    getAllProduct: async (req, res, next) => {
        try {
            const productData = await productService.getProductWithCount(req.query);

            res.json(productData);
            next();
        } catch (e) {
            next(e);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const { shop: name } = req.body;

            const { _id } = await productService.createProduct({
                ...req.body,
                shop: req.shop._id
            });

            shopService.addProductToShop({ name }, _id);
            res.status(200).json('Product created success');
            next();
        } catch (e) {
            next(e);
        }
    }
};
