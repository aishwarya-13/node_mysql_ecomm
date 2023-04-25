const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

//Dynamic route
router.get('/products/:productId', shopController.getProduct);

router.get('/add-to-cart/:productId', shopController.addToCart);

router.get('/cart', shopController.getCart);

router.get('/delete-cart-item/:productId', shopController.deleteCartItem)

//router.post('/add-to-cart', shopController.addToCart)

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);

module.exports = router;