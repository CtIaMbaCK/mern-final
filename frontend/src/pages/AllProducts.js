import React, { useEffect, useState } from 'react'
import UpLoadProduct from '../components/UpLoadProduct';
import SummaryApi from '../common';
import AdminProductCard from '../components/AdminProductCard';
const AllProducts = () => {

  const [openUpLoadProduct, setOpenUpLoadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async() => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataReponse = await response.json()

    console.log('product data', dataReponse);

    setAllProduct(dataReponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div>
      <div className='bg-slate-400 py-2 px-4 flex justify-between'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border py-2 px-4 rounded-full text-white bg-sky-300 hover:bg-white hover:text-sky-500 transition ease-in-out' onClick={() => setOpenUpLoadProduct(true)}>Upload Product</button>
      </div>

      {/* all product */}
      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-100px)] overflow-y-scroll'>
        {
          allProduct.map((product, index) => {
            return (
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
            
            )
          })
        }
      </div>

      {/* upload product */}
      {
        openUpLoadProduct && (
            <UpLoadProduct onClose={() => setOpenUpLoadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }
    </div>
  )
}

export default AllProducts