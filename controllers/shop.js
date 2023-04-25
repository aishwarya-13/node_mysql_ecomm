//Variables
const Product = require('../models/product');
const Cart = require('../models/cart');

getIndex = (request, response, next) => {
    Product.findAll()
        .then((products) => {
            response.render('shop/index', {
                products: products,
                pageTitle: 'My Shop',
                path: '/'
                // , 
                // hasProducts: products.length > 0, 
                // activeShop: true 
            });
        }).catch((error) => {
            console.log('error', error);
        });
};

getProducts = (request, response, next) => {
    Product.findAll()
        .then((products) => {
            response.render('shop/productList', {
                products: products,
                pageTitle: 'All Products',
                path: '/products'
                // , 
                // hasProducts: products.length > 0, 
                // activeShop: true 
            });
        }).catch((error) => {
            console.log('error', error);
        });
};

getCart = (request, response, next) => {
    request.user.getCart()
                .then(cart => {
                    console.log('cart',cart);
                })
                .catch(error=>{
                    console.log('error', error);
                })
    // request.user.getCart()
    //     .then((cart) => {
    //         return request.user.getProducts()
    //             .then((products) => {
    //                 console.log('products in cart',products);
    //                 for(let item in products){
    //                     console.log('cart item',item)
    //                 }
    //                 response.render('shop/cart', {
    //                     path: '/',
    //                     pageTitle: 'My Cart',
    //                     products: products
    //                 })
    //             })
    //             .catch((error) => {
    //                 console.log('error', error);
    //             });
    //     })
    //     .catch((error) => {
    //         console.log('error', error)
    //     })
};

deleteCartItem = (request, response, next) => {
    const productId = request.params.productId;
    Product.findById(productId, product => {
        Cart.deleteCartItem(productId, product.price);
    });
    response.redirect('/cart');
}

addToCart = (request, response, next) => {
    let fetchedCart;
    const productId = request.params.productId;
    request.user.getCart()
    .then((cart)=>{
        fetchedCart = cart;
        return cart.getProducts({ where: {id: productId}})
    })
    .then(products => {
        let product, newQuantity;
        if(products.length > 0){
            product = products[0];
        }
        //If product is in the cart
        if(product){
            //get existing quantity from db and increase the quantity
        }
        //If product is not in the cart
        return Product.findByPk()
        .then((product)=>{
            return fetchedCart.addProduct(product,{
                through: {quantity: newQuantity}
            });
        })
        .then(()=>{
            response.redirect('/cart');
        })
        .catch((error)=>{
            console.log('error',error);
        });
    })
    .catch((error)=>{
        console.log('error',error);
    });  
};

getOrders = (request, response, next) => {
    response.render('shop/orders', {
        path: '/orders',
        pageTitle: 'My Orders'
    })
};

getCheckout = (request, response, next) => {
    response.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Payment'
    })
};

getProduct = (request, response, next) => {
    const productId = request.params.productId;
    // Product.findAll({where: {id: productId}})
    //         .then((products)=>{
    //             response.render('shop/productDetail',{
    //                 product:products[0], 
    //                 pageTitle:products[0].title,
    //                 path: '/products' 
    //             });
    //         })
    //         .catch((error)=>{
    //             console.log('error',error);
    //         });
    Product.findByPk(productId).then((product) => {
        response.render('shop/productDetail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        });
    }).catch((error) => {
        console.log('error', error);
    });
};

module.exports = {
    getProducts: getProducts,
    getIndex: getIndex,
    getCart: getCart,
    getCheckout: getCheckout,
    getOrders: getOrders,
    getProduct: getProduct,
    addToCart: addToCart,
    deleteCartItem: deleteCartItem
}