import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {

  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const fetchCategoryProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.categoryProduct.url)
    const dataResponse = await response.json()
    setLoading(false)
    const flatData = dataResponse.data.flat()
    setCategoryProduct(flatData)

    console.log(flatData)

  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [])

  const handleClick = () => {
    navigate("search")
  }

  return (
    // <div className='container mx-auto p-4'>
    //   <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
    //     {
    //       categoryProduct.map((product) => {
    //         const imageUrl = Array.isArray(product?.productImage)
    //           ? product.productImage[0]
    //           : product.productImage

    //         return (
    //           <div key={product._id} className='border rounded-lg p-2'>
    //             <img
    //               src={imageUrl}
    //               alt={product.category}
    //               className='w-full h-48 object-cover rounded-lg'
    //             />
    //             <h3 className='text-sm font-medium mt-2'>{product.productName}</h3>
    //             <p className='text-xs text-gray-500'>{product.category}</p>
    //           </div>
    //         )
    //       })
    //     }
    //   </div>
    // </div>
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-20 relative  mt-8">

        <div className='absolute top-20 left-10  w-80 h-80 bg-sky-700 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob'>
        </div>
        <div className='absolute top-40 left-64  w-80 h-80 bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob'>
        </div>

        <div className="max-w-xl space-y-4 text-center lg:text-left mb-4 z-1 ">
          <h1 className="text-5xl font-extrabold leading-tight">
            Bracelets <br /> Necklaces
          </h1>
          <div className='mb-4'>
            <p className="text-gray-600 mb-2">
              9 NĂM HÀNH TRÌNH CHẾ TÁC THỦ CÔNG BẠC
            </p>
            <p className="text-gray-600">
              Mỗi món trang sức của Helios đều được chế tác thủ công bởi người thợ kim hoàn lành nghề, mang trọn tâm huyết và niềm đam mê trong từng nét chạm khắc tỉ mỉ.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-sky-400 text-white px-6 py-3 rounded-lg min-w-48 drop-shadow-md">Xem thêm</button>
            <button className="bg-white text-black px-6 py-3 rounded-lg drop-shadow-md" onClick={()=>handleClick()}>Mua Ngay</button>
          </div>
        </div>

        <div className="mt-10 lg:mt-0">
          <img
            src="http://res.cloudinary.com/devz2dmuw/image/upload/v1744634561/benuyqqhhha0sf0ofrth.webp"
            alt="Accessories"
            className="w-full max-w-sm mx-auto drop-shadow-xl rounded-3xl"
          />
        </div>
      </section>

      {/* Order Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-20 bg-gray-50 relative">

        <div className='absolute top-40 left-[800px]  w-96 h-96 bg-slate-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob'>
        </div>
        <div className='absolute  bottom-5 left-[450px]  w-72 h-72 bg-amber-900 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob'>
        </div>

        <div className="mt-10 lg:mt-0">
          <img
            src="https://res.cloudinary.com/devz2dmuw/image/upload/v1744638722/os11z57fdugobqjrqc2r.jpg"
            alt="Accessories"
            className="w-full max-w-lg mx-auto drop-shadow-xl rounded-3xl"
          />
        </div>



        <div className="max-w-xl space-y-4 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold">Order Your <br /> Favourite Outfit</h2>
          <p className="text-gray-600">
            Mỗi thiết kế tại <span className='font-bold'>Stussy X Helios</span> là sự kết hợp hài hòa giữa xu hướng hiện đại và tinh thần thủ công tỉ mỉ,
            nhằm mang đến cho bạn không chỉ là trang phục, mà còn là dấu ấn riêng biệt thể hiện phong cách và cá tính trong từng khoảnh khắc.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-black text-white px-6 py-3 rounded-lg drop-shadow-md" onClick={()=>handleClick()}>Mua Ngay</button>
            <button className="bg-amber-900 bg-opacity-75 text-white px-6 py-3 rounded-lg min-w-48 drop-shadow-md">Xem thêm</button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default CategoryList