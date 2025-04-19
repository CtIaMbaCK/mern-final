import React, { useContext, useRef } from 'react'
import scrollTop from '../helper/scrollToTop'
import Context from '../context'
import addToCart from '../helper/addToCart'
import displayVNCurrency from '../helper/displayCurrency'
import { Link } from 'react-router-dom'

const CartProductSearch = ({ loading, data = [] }) => {

    const dataA = data

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }
    const scrollElement = useRef()

    console.log(data)
    return (
        <div>
            <div className='flex mb-4 ms-3 items-center'>
                <p className='font-semibold text-xl me-2'>Kết quả tìm kiếm : </p>
                <p className='text-xl text-sky-500 font-bold'>{data.length}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8" ref={scrollElement}>
                {loading ? (
                    <p>Loading...</p>
                ) : (

                    data.map((product, index) => {
                        return (
                            <Link to={"/product/" + product?._id} key={index} className="shadow-xl rounded-3xl p-6 flex-shrink-0 flex flex-col items-center w-[302px] bg-white mb-8 justify-between"
                                onClick={scrollTop}>
                                <div className=' flex justify-center items-center flex-col'>
                                    <img src={product.productImage[0]} alt="" className=" h-60 object-contain rounded-3xl" />
                                    <div className="text-left mt-4 ">
                                        <h3 className="text-xl font-bold">{product.productName}</h3>
                                        <p className="text-sm text-gray-600">{product.description}</p>
                                        <div className='flex flex-row items-center justify-between'>
                                            <p className="font-bold text-lg mt-2 line-through">{displayVNCurrency(product.price)}</p>
                                            <p className="font-bold text-lg mt-2 text-sky-500">{displayVNCurrency(product.selling)}</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="bg-black text-white w-full mt-4 px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-white hover:text-black border-2 border-black hover:scale-105" onClick={(e) => handleAddToCart(e, product?._id)}>Bỏ Vào Giỏ Hàng</button>
                            </Link>
                        )
                    })
                )
                }

            </div>
        </div>


    )
}

export default CartProductSearch