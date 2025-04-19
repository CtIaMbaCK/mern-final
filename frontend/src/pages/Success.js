import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Success = () => {
    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate("/")
    }


    return (
        <div className=''>
            <div className=" flex items-center justify-center min-h-screen">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-lg">
                    <div className="text-green-500 mb-4">
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
                                d="M4.5 12.75l6 6 9-13.5"
                            />
                        </svg>
                    </div>
                    <div className=' flex flex-col'> 
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                            Thanh toán thành công!
                        </h2>
                        <p className="text-gray-600">Cảm ơn bạn đã thanh toán.</p>
                        <p className="text-gray-600 mb-6">Đơn hàng của bạn đang được xử lý và được giao tận nơi.</p>
                    </div>
                    <div className=' flex justify-between items-center'>
                        <button
                            className="inline-block px-6 py-2 text-white font-semibold bg-green-500 hover:bg-white hover:text-green-500 border border-green-500 rounded-full transition duration-300" onClick={()=>handleOnClick()}>
                            Quay về trang chủ
                        </button>
                        <Link to={"/order"}
                            className="inline-block px-6 py-2 text-white font-semibold bg-slate-500 hover:bg-white hover:text-slate-500 border border-slate-500 rounded-full transition duration-300" onClick={()=>handleOnClick()}>
                            Xem đơn hàng
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Success