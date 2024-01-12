const { productService, shopService } = require('../service');

module.exports = {
    getAllProduct: async (req, res, next) => {
        try {
            const productData = await productService.getProductWithCount(req.query);

            res.status(200).json(productData);
            next();
        } catch (e) {
            next(e);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const { _id: shopId } = req.shop;

            const { _id: productId } = await productService.createProduct({
                ...req.body,
                shop: shopId
            });

            await shopService.addProductToShop({ _id: shopId }, productId);
            res.status(200).json('Product created success');
            next();
        } catch (e) {
            next(e);
        }
    },
    editProduct: async (req, res, next) => {
        try {
            const { productId } = req.body;

            await productService.updateProduct(
                { _id: productId },
                { ...req.body, productId: undefined }
            );

            res.status(200).json('Product changed success');
            next();
        } catch (e) {
            next(e);
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { productId } = req.body;
            await productService.deleteProduct({ _id: productId });

            res.status(200).json('Product deleted success');
            next();
        } catch (e) {
            next(e);
        }
    }
};
