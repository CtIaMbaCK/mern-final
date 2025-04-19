import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import displayVNCurrency from '../helper/displayCurrency'

const AllOrder = () => {
  const [data, setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.allOrder.url, {
      method: SummaryApi.allOrder.method,
      credentials: 'include',
    })

    const responseData = await response.json()
    setData(responseData.data)
    console.log("order list", responseData)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  return (
    <div className='h-[calc(100vh-190px)] overflow-y-auto p-4'>
      {!data.length && (
        <p className='text-center text-gray-500 text-lg'>Không có đơn hàng nào</p>
      )}

      {data.map((item, index) => (
        <div key={item.userId + index} className='mb-6'>
          <p className='font-semibold text-lg text-gray-700 mb-2'>
            Ngày đặt hàng: {new Date(item.createdAt).toLocaleString('vi-VN')}
          </p>

          <div className='border rounded-lg p-4 shadow-md bg-white'>
            <div className='flex flex-col lg:flex-row justify-between gap-6'>
              {/* Product Details */}
              <div className='grid gap-3 flex-1'>
                {item?.ProductDetails.map((product, idx) => (
                  <div
                    key={product.productId + idx}
                    className='flex gap-4 items-start border rounded-md p-3 bg-slate-50'
                  >
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className='w-24 h-24 object-contain bg-white border rounded-md'
                    />
                    <div className='flex-1'>
                      <h3 className='font-medium text-base line-clamp-1'>{product.name}</h3>
                      <div className='flex gap-5 mt-2 text-sm text-gray-600'>
                        <span className='text-red-500 font-semibold'>
                          {displayVNCurrency(product.price)}
                        </span>
                        <span>Số lượng: {product.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment & Shipping Info */}
              <div className='flex flex-col gap-4 min-w-[300px]'>
                <div>
                  <h4 className='text-base font-semibold mb-1'>Thông tin thanh toán:</h4>
                  <p>Phương thức: {item.paymentDetails.payment_method_type[0]}</p>
                  <p>Trạng thái: {item.paymentDetails.payment_status}</p>
                </div>

                <div>
                  <h4 className='text-base font-semibold mb-1'>Thông tin giao hàng:</h4>
                  {item.shipping_options.map((shipping, idx) => (
                    <p key={shipping.shipping_rate}>
                      Phí vận chuyển: {displayVNCurrency(shipping.shipping_amount)}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className='mt-4 text-right text-base font-semibold'>
              Tổng tiền: {displayVNCurrency(item.totalAmount)}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllOrder
