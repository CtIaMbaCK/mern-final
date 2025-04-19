import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayVNCurrency from '../helper/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {

    const [editProduct, setEditProduct] = useState(false)

    return (
        <div className='bg-white p-3 rounded h-100'>
            <div className='w-40'>
                <div>
                    <img src={data?.productImage[0]} alt='' width={120} height={120} className='w-fit mx-auto' />
                </div>

                <div>
                    <div>
                        <h1 className='text-ellipsis line-clamp-2'>Tên: {data?.productName}</h1>
                    </div>

                    <div className='flex items-center'>
                        <p className='me-2 font-semibold'>Giá: </p>
                        <p className='text-sky-400 font-semibold'>{displayVNCurrency(data?.selling)}</p>
                    </div>

                    <div className='mt-6 w-fit ms-auto p-2 bg-green-200 hover:bg-green-400 transition ease-in-out hover:text-white cursor-pointer rounded-full' onClick={() => setEditProduct(true)}>
                        <MdEdit />
                    </div>

                </div>
            </div>

            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
                )
            }
        </div>
    )
}

export default AdminProductCard