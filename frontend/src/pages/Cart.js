import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import displayVNCurrency from '../helper/displayCurrency';
import { MdDeleteOutline } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';
const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },

        })

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    const handleLoading = async () => {
        setLoading(true)
        await fetchData()
        setLoading(false)

    }

    useEffect(() => {
        handleLoading()
    }, [])

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })
            })

            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                _id: id,
            })
        })

        const responseData = await response.json()
        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const handlePayment = async () => {

        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);


        const response = await fetch(SummaryApi.payment.url,{
            method: SummaryApi.payment.method,
            credentials: "include",
            headers: {
                "content-type": 'application/json'
            },
            body : JSON.stringify({
                cartItems : data
            })
        })

        const responseData = await response.json()

        if(responseData?.id) {
            stripePromise.redirectToCheckout( {sessionId : responseData.id} )
        }

        console.log("responseData",responseData)
    }

    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0)
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.selling), 0)

    const getFormattedDate = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${day}/${month}/${year}`;
    };




    return (
        <div className='container mx-auto p-10'>
            <div className="px-6 py-8 bg-white rounded-2xl shadow-md my-12">
                <h1 className="text-4xl font-bold text-gray-800 leading-snug tracking-tight">
                    Giỏ Hàng của bạn
                </h1>
            </div>

            <div className='  text-center text-lg'>
                {
                    data.length === 0 && !loading && (
                        <p className='bg-slate-500 py-5 text-white font-semibold'>Giỏ hàng đang trống. Hãy mua sắm đi nào!</p>
                    )
                }
            </div>


            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between'>
                {/* gio hang */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart.map((el, index) => {
                                return (
                                    <div key={el + "Add To Cart Loading " + index} className='w-full bg-slate-400 h-60 my-1 border border-slate-300 animate-pulse rounded mb-6'>
                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "Add To Cart Loading "} className='w-[600px] h-48 my-1 rounded-3xl mb-10 bg-slate-200 flex relative'>
                                        <div className='w-48 h-48 '>
                                            <img className="rounded-3xl w-48 h-48" src={product?.productId?.productImage[0]} alt='' />
                                        </div>

                                        <div className='ms-6 mt-4 '>
                                            {/* xoa san pham */}
                                            <div className=' absolute -right-2 text-2xl w-8 h-8 bg-red-500 text-white flex justify-center items-center rounded-full -top-2
                                                            hover:bg-white hover:text-red-400 border border-red-400 transition ease-in-out cursor-pointer ' onClick={() => { deleteCartProduct(product?._id) }}>
                                                <MdDeleteOutline />
                                            </div>

                                            <p className='font-bold text-gray-700'>{product?.productId?.brandName}</p>
                                            <p className='font-bold text-2xl mt-2 text-amber-950 text-opacity-50'>{product?.productId?.productName}</p>


                                            {/* tang giam so luong */}
                                            <div className='mt-4 flex items-center w-20 justify-between'>

                                                <button className="h-6 w-6 bg-sky-500 rounded-full flex items-center justify-center 
                                                                    border border-sky-500 text-white hover:bg-white hover:text-sky-500 
                                                                    transition-all duration-200 shadow-sm text-sm" onClick={() => decreaseQty(product?._id, product?.quantity)}>
                                                    <FaMinus />
                                                </button>

                                                <p>{product?.quantity}</p>

                                                <button className="h-6 w-6 bg-sky-500 rounded-full flex items-center justify-center 
                                                                    border border-sky-500 text-white hover:bg-white hover:text-sky-500 
                                                                    transition-all duration-200 shadow-sm text-sm" onClick={() => increaseQty(product?._id, product?.quantity)}>
                                                    <FaPlus />
                                                </button>



                                            </div>

                                            <div className='flex items-center justify-between'>
                                                <p className='mt-4 font-semibold'>Giá: </p>
                                                <p className='mt-4 font-semibold text-lg'>{displayVNCurrency(product?.productId?.selling)}</p>
                                            </div>

                                        </div>
                                    </div>
                                )

                            })
                        )
                    }
                </div>

                {/* tong  */}
                {
                    data[0] && (
                        <div className='mt-5 lg:mt-0 w-full max-w-sm relative '>
                            {
                                loading ? (
                                    <div className='h-36 bg-slate-400'>
                                        Loading Total
                                    </div>
                                ) : (

                                    <div className="px-6 py-8  bg-slate-200 rounded-2xl shadow-md bg-opacity-80 drop-shadow-lg">
                                        <div className=' relative' >

                                            <h2 className="text-xl font-bold text-gray-800 leading-snug tracking-tight items-center flex justify-center">
                                                Tổng giỏ hàng
                                            </h2>
                                            <div className='h-0.5 bg-slate-600 mt-4 rounded '></div>

                                            <div className='flex items-center justify-between '>
                                                <p className='mt-2 font-bold'>Ngày Tháng Năm: </p>
                                                <p className='mt-2'>{getFormattedDate()}</p>
                                            </div>

                                            <div className='flex flex-col mt-4' >
                                                {
                                                    data.map((product, index) => {
                                                        return (
                                                            <div className='flex justify-between mb-2 '>
                                                                <div>{product?.productId?.productName}</div>
                                                                <div>{product?.quantity}</div>
                                                            </div>

                                                        )
                                                    })
                                                }

                                            </div>

                                            <div className='h-0.5 bg-slate-600 mt-4 rounded '></div>

                                            <div className='flex items-center justify-between '>
                                                <p className='mt-2 font-bold'>Tổng: </p>
                                                <p className='mt-2'>{displayVNCurrency(totalPrice)}</p>
                                            </div>
                                        </div>
                                        <button className='bg-sky-500  mt-2 h-12 text-white absolute left-0 w-full rounded-b-2xl' onClick={handlePayment}>Thanh Toán</button>
                                    </div>

                                )
                            }
                        </div>
                    )
                }


            </div>







        </div>
    )
}

export default Cart