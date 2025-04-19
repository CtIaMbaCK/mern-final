import React from 'react'
import { Link } from 'react-router-dom'

const Cancel = () => {
    return (
        <div className=''>
            <div className=" flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg">
                    <div className="text-red-500 mb-4">
                        <svg
                            className="w-16 h-16 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                    <div className=' flex flex-col'>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Thanh toán thất bại!
                        </h2>
                        <p className="text-gray-600 mb-6">Không thanh toán được đơn hàng của bạn. Hãy xem lại đơn!</p>
                    </div>
                    <div className=' flex justify-center items-center w-full'>
                        <Link to={"/cart"}
                            className="inline-block px-6 py-2 text-white font-semibold w-full bg-slate-400 hover:bg-white hover:text-slate-400 border border-slate-400 rounded-full transition duration-300" >
                            Quay về giỏ hàng
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cancel