const express = require('express');
const bodyParser = require('body-parser');// To parse incoming requests
const path = require('path');//To construct path to file
const sequelize = require('./util/database');
//Import Routes
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use((request,response,next)=>{
    User.findByPk(1)
        .then((user)=>{
            request.user = user;
            next();
        })
        .catch((error)=>{
            console.log('error',error);
        })
});
//css - STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.router);
app.use(shopRoutes);

//Controllers
const pageNotFound = require('./controllers/error');
app.use(pageNotFound.pageNotFound);//Set Page not found

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// .sync({ force: true })
sequelize
//.sync({ force: true })
.sync()
.then(result => {
  return User.findByPk(1);
  // console.log(result);
})
.then(user => {
  if (!user) {
    return User.create({ name: 'Aishwarya', email: 'aish@ceo.com' });
  }
  return user;
})
.then(user => {
  // console.log(user);
  return user.createCart();
})
.then(cart => {
  app.listen(3000);
  console.log('Server listening');
})
.catch(err => {
  console.log(err);
});

