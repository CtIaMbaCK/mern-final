import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import productCategory from '../helper/productCategory';
import { MdFileUpload } from "react-icons/md";
import upLoadImage from '../helper/uploadIImage';
import { TiDelete } from "react-icons/ti";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
}) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        selling: productData?.selling
    })

    const [uploadProductImageInpput, setUploadProductImageInpput] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        setUploadProductImageInpput(file.name)
        console.log('file', file);

        const upImageCloudinary = await upLoadImage(file);

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, upImageCloudinary.url]
            }
        })

        console.log('upImageCloudinary', upImageCloudinary.url);
    }


    const handleDeleteProductImage = async (index) => {
        console.log('Image index', index);

        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProductImage]
            }
        })

    }


    // {/** upload san pham */}

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('data', data);
        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json();

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchdata()
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }

    }

    return (
        <div className='fixed bottom-0 top-0 left-0 right-0 bg-slate-300/35 flex justify-center items-center'>
            <div className=' bg-white mx-auto p-4 w-full max-w-3xl h-full max-h-[80%] shadow-md relative pb-16 overflow-hidden'>
                <div className='flex justify-between pb-3'>
                    <h2 className='font-bold text-lg'>Edit Product</h2>
                    <div>
                        <IoCloseSharp className='block ml-auto text-lg mb-2 hover:text-red-300 ' onClick={onClose} />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full ' onSubmit={handleSubmit}>
                    <label htmlFor='productName'>Product Name: </label>
                    <input
                        type='text'
                        id="productName"
                        placeholder='Nhập tên sản phẩm ... '
                        name='productName'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-200' required></input>


                    <label htmlFor='brandName'>Brand Name </label>
                    <input
                        type='text'
                        id="brandName"
                        placeholder='Nhập tên thương hiệu ... '
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-200' required></input>


                    <label htmlFor='category'>Category </label>
                    <select required value={data.category} id='category' name='category' onChange={handleOnChange} className='p-2 bg-slate-200'>
                        <option value={""}>Chọn danh mục sản phẩm</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>


                    <label htmlFor='productImage'>Product Image </label>

                    <label htmlForfor="upLoadImageInput">
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer' >
                            <div className='text-slate-500 flex justify-center items-center  flex-col'>
                                <span className='text-3xl'>
                                    <MdFileUpload />
                                </span>
                                <p>Upload hình sản phẩm</p>
                                <input type='file' id='upLoadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>

                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data?.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group'>
                                                    <img
                                                        src={el}
                                                        alt='el_image'
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border ' />


                                                    <div className='absolute -right-2 -top-2 text-xl cursor-pointer text-sky-700 hidden group-hover:block' onClick={() => handleDeleteProductImage(index)} >
                                                        <TiDelete />
                                                    </div>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='font-semibold text-sky-400 text-xs'>Hãy Đưa hình ảnh sản phẩm</p>
                            )
                        }
                    </div>

                    <label htmlFor='price'>Giá nhập: </label>
                    <input
                        type='number'
                        id="price"
                        placeholder='Nhập giá sản phẩm ... '
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-200' required></input>


                    <label htmlFor='selling'>Giá bán: </label>
                    <input
                        type='number'
                        id="selling"
                        placeholder='Nhập giá bán ... '
                        name='selling'
                        value={data.selling}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-200' required></input>


                    <label htmlFor='description'>Mô tả:</label>
                    <textarea className='p-2 bg-slate-200 h-28 resize-none'
                        id="description"
                        name='description'
                        value={data.description}
                        onChange={handleOnChange}
                        rows={3}
                        placeholder='Nhập mô tả sản phẩm ... '>
                    </textarea>




                    <button className='px-4 py-2 bg-sky-500 text-white mb-6 mt-6'>Update Prodcut</button>
                </form>
            </div>


        </div>
    )
}

export default AdminEditProduct