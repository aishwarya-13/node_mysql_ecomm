const express = require('express');
const router = express.Router();

//Controller
adminController = require('../controllers/admin');

// Handles route => `/admin/add-product`
router.get('/add-product', adminController.addProduct);

// Handles route => `/admin/products`
router.post('/product', adminController.setProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.editProduct);

router.get('/delete-product/:productId', adminController.deleteProduct);

router.post('/update-product', adminController.updateProduct);


module.exports = {
    router: router
};