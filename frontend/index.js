const backendDomain =  process.env.REACT_APP_BACKEND_URL//"http://localhost:8080"

const SummaryApi = {
    signUp: {
        url: `${backendDomain}/api/signup`,
        method: "POST",
    },
    signIn: {
        url: `${backendDomain}/api/signin`,
        method: "POST",
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "GET",
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "GET",
    },
    allUser: {
        url :`${backendDomain}/api/all-users`,
        method: "GET",
    },
    updateUser : {
        url: `${backendDomain}/api/update-user`,
        method: "POST"
    },
    uploadProduct : {
        url: `${backendDomain}/api/upload-product`,
        method: "POST"
    },
    allProduct : {
        url: `${backendDomain}/api/get-product`,
        method: "GET"
    },
    updateProduct : {
        url: `${backendDomain}/api/update-product`,
        method: "POST"
    },
    categoryProduct : {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "GET"
    },
    categoryWiseProduct:{
        url: `${backendDomain}/api/category-product`,
        method: "POST"
    },
    productDetail:{
        url: `${backendDomain}/api/product-detail`,
        method: "POST"
    },
    addToCartProduct:{
        url : `${backendDomain}/api/addToCart`,
        method: "POST"
    },
    addToCartProductCount : {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "GET"
    },
    addToCartProductView : {
        url: `${backendDomain}/api/viewCartProduct`,
        method: "GET"
    },
    updateCartProduct : {
        url: `${backendDomain}/api/updateCartProduct`,
        method: "POST"
    },
    deleteCartProduct : {
        url: `${backendDomain}/api/deleteCartProduct`,
        method: "POST"
    },
    searchProduct : {
        url: `${backendDomain}/api/search`,
        method: "GET"

    },
    payment : {
        url : `${backendDomain}/api/checkout`,
        method: "POST"
    },
    getOrder : {
        url : `${backendDomain}/api/order-list`,
        method: "GET"
    },
    allOrder : {
        url : `${backendDomain}/api/all-orders`,
        method: "GET"
    }
    

}

export default SummaryApi;