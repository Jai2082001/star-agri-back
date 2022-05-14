const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoConnect = require('./database/database').mongoConnect;
const accessoriesAdd = require('./router/accessories').accessoriesAdd;
const { accessoryDis } = require('./router/accessoriesDis');
const addProduct = require('./router/addProduct').addProduct;
const getProduct = require('./router/getProduct').getProducts;
const userSignUp = require('./router/userSignUp').signUpUser;
const { auth } = require('./router/authentication/admin');
const { brandName } = require('./router/brand');
const { homeApi } = require('./router/homeapi');
const { categoryAdd } = require('./router/category');
const { categoryRemove } = require('./router/categoryRemove');
const { brandAdd } = require('./router/brandAdd');
const { removeBrand } = require('./router/removeBrandName');
const { coupon } = require('./router/coupon/coupon');
const { product } = require('./router/product/product');
const { subAdmin } = require('./router/subAdmin/subAdmin');
const { locationRouter } = require('./router/location/LocationAdd');
const { registerUser } = require('./router/user/user');
const { address } = require('./router/address/address');
const { cart } = require('./router/cartAssoication/cart')
const { order } = require('./router/order/orderIssue');
const {random} = require('./router/random/random');
const {bulkUpdate} = require('./router/bulkUpdate/bulkUpdate');
const {productType} = require('./router/productType/productType');
const {image} = require('./router/imgDisplay/imgDisplay');
const {remove} = require('./router/remove/remove');
const {productStruct} = require('./router/ProductStruct/ProductStruct')
const timeout = require('connect-timeout')

let port = 5001


app.use(cors());
app.use(bodyParser.json({limit: '100mb'}))
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use(cookieParser())
app.use(auth);
app.use(accessoriesAdd);
app.use(accessoryDis);
app.use(addProduct);
app.use(getProduct);
app.use(userSignUp);
app.use(homeApi);
app.use(brandName);
app.use(brandAdd);
app.use(removeBrand);
app.use(categoryAdd);
app.use(categoryRemove);
app.use(coupon);
app.use(product);
app.use(subAdmin);
app.use(locationRouter);
app.use(registerUser);
app.use(address);
app.use(cart);
app.use(order);
app.use(random);
app.use(bulkUpdate)
app.use(productType)
app.use(image)
app.use(productStruct)
app.use(remove);
app.get('/', (req, res, next)=>{
    console.log('here we are');
    console.log(req.cookies)
    res.send({status: 'helloLatest4'})
})
mongoConnect(() => {
    app.listen(port, ()=>{
        console.log('Connected at ' + port)
    });
})