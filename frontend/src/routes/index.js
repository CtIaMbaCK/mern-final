import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";
import AllOrder from "../pages/AllOrder";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children : [
            {
                path:"",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword/>
            },
            {
                path: "sign-up",
                element: <SignUp/>
            },
            {
                path: "product/:id",
                element: <ProductDetail/>
            },
            {
                path:"search",
                element: <SearchProduct/>
            },
            {
                path:"cart",
                element: <Cart/>
            },
            {
                path:"success",
                element: <Success/>
            },{
                path:"cancel",
                element: <Cancel/>
            },
            {
                path:"order",
                element: <OrderPage/>
            },
            {
                path: "admin-panel",
                element:<AdminPanel/>,
                children :[
                    {
                        path: "all-users",
                        element: <AllUsers/>,
                    },
                    {
                        path: "all-product",
                        element: <AllProducts/>,
                    },
                    {   
                        path:"all-orders",
                        element : <AllOrder/>
                    },
                ]
            },
        ]
    }
])

export default router