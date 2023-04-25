//Variables
const Product = require('../models/product');

addProduct = (request, response, next) => {
    response.render('admin/addProduct', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeProduct: true,
        addProductCss: true,
        isEdit: false
    });
};

setProduct = (request, response, next) => {
    //const requestData = request.body;
    let { title, price, imageUrl, description } = request.body
    request.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    // Product.create({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description,
    //     userId: request.user.id
    // })
    .then((result) => {
        response.redirect('/admin/products');
    }).catch((error) => {
        console.log('error', error);
    })

};

getProducts = (request, response, next) => {
    request.user.getProducts()
    //Product.findAll()
    .then((products) => {
        response.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
            // , 
            // hasProducts: products.length > 0, 
            // activeShop: true 
        });
    })
        .catch((error) => {
            console.log('error', error);
        });
};

editProduct = (request, response, next) => {
    const productId = request.params.productId;
    request.user.getProducts({where: {id: productId}})
            .then((products)=>{
                    response.render('admin/addProduct', {
                    product: products[0],
                    isEdit: true,
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product'
                });
            })
    //Product.findByPk(productId)
        // .then((product) => {
        //     response.render('admin/addProduct', {
        //         product: product,
        //         isEdit: true,
        //         pageTitle: 'Edit Product',
        //         path: '/admin/edit-product'
        //     });
        // })
        .catch((error) => {
            console.log('error', error);
        });
};

updateProduct = (request, response, next) => {
    const { productId, title, imageUrl, price, description } = request.body;
    const updatedproduct = {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    }
    const selector = {
        where: {
            id: productId
        }
    }
    Product.update(updatedproduct, selector)
    .then((result) => {
        response.redirect('/admin/products');
    })
    .catch((error) => {
        console.log('error', error);
    })
};

deleteProduct = (request, response, next) => {
    const productId = request.params.productId;
    Product.destroy({ where: { id: productId } })
        .then((products) => {
            response.redirect('/admin/products');
        })
        .catch((error) => {
            console.log('error'.error);
        })
}

module.exports = {
    addProduct: addProduct,
    setProduct: setProduct,
    getProducts: getProducts,
    editProduct: editProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}