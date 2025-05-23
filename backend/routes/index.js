const express = require('express');

const router = express.Router();
const userSignUpController = require('../controllers/user/userSignUp');
const userSignInController = require('../controllers/user/userSignIn');
const userDetailsController = require('../controllers/user/userDetails');
const authToken = require('../middleware/authToken');
const UserLogout = require('../controllers/user/userLogout');
const allUsers = require('../controllers/user/allUsers');
const updateUser = require('../controllers/user/updateUser');
const UploadProductController = require('../controllers/product/upLoadProduct');
const getProductController = require('../controllers/product/getProduct');
const updateProductController = require('../controllers/product/updateProduct');
const getCategoryProduct = require('../controllers/product/getCategoryProduct');
const getCategoryWiseProduct = require('../controllers/product/getCategoryWiseProduct');
const getProdcutDetail = require('../controllers/product/getProductDetail');
const addToCartController = require('../controllers/user/addToCartController');
const countAddToCartProduct = require('../controllers/user/countAddToCartProduct');
const addToCartViewProdcut = require('../controllers/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controllers/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controllers/user/deleteAddToCartProduct');
const searchProduct = require('../controllers/product/searchProduct');
const paymentController = require('../controllers/order/paymentController');
const webhooks = require('../controllers/order/webhook');
const orderController = require('../controllers/order/orderController');
const allOrderController = require('../controllers/order/allOrderController');




router.post('/signup', userSignUpController);
router.post('/signin', userSignInController);
router.get('/user-details',authToken, userDetailsController)
router.get('/userLogout',UserLogout)


//admin panel 
router.get('/all-users',authToken,allUsers)
router.post('/update-user',authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-detail",getProdcutDetail)
router.get("/search",searchProduct)

// cart
router.post("/addToCart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/viewCartProduct",authToken,addToCartViewProdcut)
router.post("/updateCartProduct",authToken,updateAddToCartProduct)
router.post("/deleteCartProduct",authToken,deleteAddToCartProduct)


// thanh toan
router.post("/checkout",authToken,paymentController)

//hook
router.post("/webhook",webhooks) //api/w..

router.get("/order-list",authToken,orderController)

router.get("/all-orders",authToken,allOrderController)

module.exports = router;