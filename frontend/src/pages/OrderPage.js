import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import displayVNCurrency from '../helper/displayCurrency'
import { Link } from 'react-router-dom'

const OrderPage = () => {
    const [data, setData] = useState([])

    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.getOrder.url, {
            method: SummaryApi.getOrder.method,
            credentials: 'include',
        })

        const responseData = await response.json()
        setData(responseData.data)
        console.log("responseData", responseData)
    }

    useEffect(() => {
        fetchOrderDetails()
    }, [])

    return (
        <div className='mt-20 px-4 max-w-5xl mx-auto'>
            {!data[0] && <p className='text-center text-gray-500'>Không tìm thấy đơn hàng nào</p>}

            <div className='space-y-6'>
                {data.map((item, index) => (
                    <div key={index} className='border rounded-xl shadow-md p-6 bg-white'>
                        <p className='text-sm text-gray-500 mb-4'>Ngày đặt hàng: <span className='font-semibold text-black'>{new Date(item.createdAt).toLocaleString('vi-VN')}</span></p>

                        <div className='grid md:grid-cols-2 gap-6 mb-4'>
                            {item?.ProductDetails.map((product, i) => (
                                <div key={product.productId + i} className='flex items-center gap-4 border rounded-lg p-3'>
                                    <img src={product.image[0]} alt='' className='w-24 h-24 object-contain bg-gray-50 rounded-md' />
                                    <div className='flex-1'>
                                        <div className='font-medium text-lg'>{product?.name}</div>
                                        <div className='flex justify-between text-sm text-gray-600'>
                                            <div>{displayVNCurrency(product?.price)}</div>
                                            <div>Số lượng: {product?.quantity}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='mb-2'>
                            <h3 className='font-semibold mb-1'>Chi tiết thanh toán:</h3>
                            <p>Phương thức: <span className='text-gray-700 font-semibold'>{item.paymentDetails.payment_method_type[0].toUpperCase()}</span></p>
                            <p>Trạng thái: <span className={`font-semibold ${item.paymentDetails.payment_status === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                                {item.paymentDetails.payment_status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                            </span></p>
                        </div>

                        {item.shipping_options.length > 0 && (
                            <div className='mb-2'>
                                <h3 className='font-semibold mb-1'>Phí vận chuyển:</h3>
                                {item.shipping_options.map((shipping, i) => (
                                    <div key={shipping.shipping_rate}>
                                        {displayVNCurrency(shipping.shipping_amount)}
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className='text-right font-bold text-lg mt-4'>
                            Tổng cộng: {displayVNCurrency(item.totalAmount)}
                        </div>
                        <p className='mt-10 w-full '>Cảm ơn bạn đã sử dụng dịch vụ!</p>
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-8">
            <Link to="/" className="px-6 py-3 bg-amber-500 border border-amber-500 text-white rounded-xl shadow-md hover:bg-white hover:text-amber-500 transition duration-300">
                Tiếp tục mua sắm
            </Link>
        </div>

        </div>
    )
}

export default OrderPage
