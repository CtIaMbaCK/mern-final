import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import displayVNCurrency from '../helper/displayCurrency'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import addToCart from '../helper/addToCart'
import Context from '../context'

const ProductDetail = () => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: ""
  })

  const params = useParams()
  const [loading, setLoading] = useState(false)
  const productImageListLoading = new Array(4).fill(null)

  const [activeImage, setActiveImage] = useState("")

  // console.log("ID",params)
  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()


  const fetchProductDetail = async () => {
    // setLoading(true)
    const response = await fetch(SummaryApi.productDetail.url, {
      method: SummaryApi.productDetail.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    // setLoading(false)
    const dataResponse = await response?.json()
    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])
  }



  useEffect(() => {
    fetchProductDetail()
  }, [params])

  const handleProductClick = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleAddToCart = async(e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e, id) =>{
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='mt-16'>
      <div className='container mx-auto p-10'>
        <div className='min-h-[200px] flex '>
          {/* hinh anh */}
          <div className='h-96 flex gap-4'>
            <div className='h-full flex' >
              {
                loading ? (
                  <div className='flex flex-col gap-3 lg:flex-col overflow-scroll scrollbar-none h-full justify-between'>
                    {
                      productImageListLoading?.map((el,index) => {
                        return (
                          <div className='h-20 w-20 bg-gray-700 rounded animate-pulse' key={"LoadingImage"+index}>
                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  <div className='flex flex-col gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                    {
                      data?.productImage?.map((imgURL, index) => {
                        return (
                          <div className='h-20 w-20 rounded p-1' key={imgURL}>
                            <img src={imgURL} alt='' className='w-full h-full object-scale-down mix-blend-multiply rounded-lg cursor-pointer' onClick={() => handleProductClick(imgURL)} />
                          </div>
                        )
                      })
                    }
                  </div>
                )
              }
            </div>
            <div className="h-[400px] w-[400px]  lg:h-96 lg:w-96">
              <img src={activeImage} alt='' className='h-full w-full object-scale-down mix-blend-multiply rounded-lg' />
            </div>
          </div>
          {/*  */}
          {
            loading ? (
              <p>Loading</p>
            ) : (
              <div className='ml-10'>
                <p className='font-semibold text-gray-600'>{data?.brandName}</p>
                <h2 className='text-[40px] font-extrabold leading-tight'>{data?.productName}</h2>
                <div className='flex  gap-5 mt-4'>
                  <p className=' text-gray-600 text-[20px] font-medium line-through'>{displayVNCurrency(data?.price)}</p>
                  <p className=' text-sky-600 text-[20px] font-medium '>{displayVNCurrency(data?.selling)}</p>
                </div>
                <p className='mt-2 mb-4'>{data?.description}</p>
                <button className="bg-black text-white w-full mt-4 px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-white hover:text-black border-2 border-black hover:scale-105" onClick={(e)=>handleAddToCart(e,data._id)} >Bỏ Vào Giỏ Hàng</button>
                <button className="bg-sky-500 text-white w-full mt-4 px-6 py-2 rounded-full font-semibold shadow-md transition-all duration-300 hover:bg-white hover:text-black border-2 border-sky-500 hover:scale-105" onClick={(e)=>handleBuyProduct(e,data._id)}>Mua Ngay</button>
              </div>
            )
          }
        </div>
      </div>

      {
        data.category && (
          <HorizontalCardProduct category={data?.category} heading={"Các Sản Phẩm Khác"} />
        )
      }

    </div>
  );
}

export default ProductDetail