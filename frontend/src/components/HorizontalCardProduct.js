import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryProduct from '../helper/fetchCategoryProduct'
import displayVNCurrency from '../helper/displayCurrency'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../context';
import scrollTop from '../helper/scrollToTop';


const HorizontalCardProduct = ({ category, heading, des }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id) => {
        await addToCart(e,id)
        fetchUserAddToCart()
    }


    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryProduct(category)
        setLoading(false)

        setData(categoryProduct?.data)

    }
    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }



    return (
        <div className=''>
            <section className="px-6 lg:px-24 py-20 relative" id="pro1 ">



                <div className='z-0 relative '>
                    <button className="absolute top-80 shadow-md bg-white rounded-full p-2 text-2xl hidden md:block -left-5 transition-all ease-in-out hover:scale-110 hover:shadow-xl animate-fadeSlideInLeft"
                        onClick={scrollLeft}><FaAngleLeft /></button>
                    <button className="absolute top-80 shadow-md bg-white rounded-full p-2 text-2xl hidden md:block -right-5 transition-all ease-in-out hover:scale-110 hover:shadow-xl animate-fadeSlideInRight"
                        onClick={scrollRight}><FaAngleRight /></button>

                    <h2 className="text-4xl font-extrabold mb-4">{heading}</h2>
                    <p className="text-gray-600  mx-auto mb-12">{des}</p>
                    <div className="flex flex-row gap-8 overflow-x-auto scrollbar-none" ref={scrollElement}>
                        { loading ? (
                            <p>Loading...</p>
                        ) : (
                            data.map((product, index) => {
                                return (
                                    <Link to={"/product/"+product?._id} key={index} className=" shadow-xl rounded-3xl p-6 flex-shrink-0 flex flex-col items-center w-[302px] bg-white mb-8 justify-between"
                                            onClick={scrollTop}>
                                        <div className=' flex justify-center items-center flex-col'>
                                            <img src={product.productImage[0]} alt="" className=" h-60 object-contain rounded-3xl" />
                                            <div className="text-left mt-4 w-full ">
                                                <h3 className="text-xl font-bold">{product.productName}</h3>
                                                <p className="text-sm text-gray-600">{product.description}</p>
                                                <div className='flex flex-row items-center justify-between'>
                                                    <p className="font-bold text-lg mt-2 line-through">{displayVNCurrency(product.price)}</p>
                                                    <p className="font-bold text-lg mt-2 text-sky-500">{displayVNCurrency(product.selling)}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="bg-black text-white w-full mt-4 px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-white hover:text-black border-2 border-black hover:scale-105" onClick={(e)=>handleAddToCart(e, product?._id)}>Bỏ Vào Giỏ Hàng</button>
                                    </Link>
                                )
                            })
                        )
                            
                        }
                    </div>
                </div>
                <svg
                    className=" absolute -top-40 left-0 w-full h-full z-[-1] blur-lg"
                    viewBox="0 0 1440 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <filter id="blur">
                            <feGaussianBlur stdDeviation="1" />
                        </filter>
                    </defs>

                    <path
                        d="M0 300 Q 360 200 720 300 T 1440 300 L1440 600 L0 600 Z"
                        fill="Black"
                        opacity="0.5"
                        filter="url(#blur)"
                    >
                        <animate
                            attributeName="d"
                            dur="10s"
                            repeatCount="indefinite"
                            values="
            M0 300 Q 360 200 720 300 T 1440 300 L1440 600 L0 600 Z;
            M0 300 Q 360 250 720 200 T 1440 300 L1440 600 L0 600 Z;
            M0 300 Q 360 150 720 300 T 1440 300 L1440 600 L0 600 Z;
            M0 300 Q 360 200 720 300 T 1440 300 L1440 600 L0 600 Z
          "
                        />
                    </path>
                </svg>
            </section>




        </div>
    )
}

export default HorizontalCardProduct