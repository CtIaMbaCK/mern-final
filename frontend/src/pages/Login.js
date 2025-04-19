import React, { useContext, useState } from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const {fetchUserDetails, fetchUserAddToCart } = useContext(Context)



    const handleChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if (dataApi.error) {
            toast.error(dataApi.message)

        }
    }

    // console.log(data)

    return (
        <section id='login'>
            <div className='mx-auto container p-4 '>

                <div className=' bg-white w-full p-2  mx-auto font-medium flex justify-around'>
                    {/*  div 1 -  dang nhap*/}
                    <div className='max-w-md mt-16 ml-10 mb-16'>
                        <div className='font-bold text-gray-700 mb-4 text-[20px]'>
                            <span>LOGIN</span>
                        </div>

                        <div className='mb-6 text-[14px] font-semibold'>
                            <span>Registered Customers</span>
                        </div>

                        <div className='mb-6'>
                            <span className='text-[11px]'>
                                Vui lòng cung cấp địa chỉ email và mật khẩu được liên kết với tài khoản. Nếu bạn gặp sự cố, vui lòng sử dụng lời nhắc bên dưới để đặt lại mật khẩu của mình.
                            </span>
                        </div>
                        {/*  */}

                        <form action="" className='pt-6 mx-auto w-full' onSubmit={handleSubmit}>
                            {/* Form Start  */}

                            <div className="relative mb-6">
                                <input
                                    onChange={handleChange}
                                    value={data.email}
                                    type="email" id="email" name="email" placeholder=" " required
                                    className=" text-sm w-full px-3 pt-5 pb-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors peer text-gray-700" />
                                <label htmlFor="email"
                                    className="text-xs absolute text-gray-500 duration-300 transform -translate-y-4 top-4 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4">
                                    EMAIL ADDRESS<span className="text-red-500">*</span>
                                </label>
                            </div>

                            {/*  */}
                            <div className="relative mb-6 ">
                                <input
                                    onChange={handleChange}
                                    value={data.password}
                                    type={showPassword ? "text" : "password"} id="password" name="password" placeholder=" " required
                                    className=" text-sm w-full px-3 pt-5 pb-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors peer text-gray-700" />
                                <label htmlFor="password"
                                    className="text-xs absolute text-gray-500 duration-300 transform -translate-y-4 top-4 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4">
                                    PASSWORD<span className="text-red-500">*</span>
                                </label>
                                <div className='text-gray-600 absolute right-0 top-4 cursor-pointer ' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showPassword ? (
                                                <FaRegEye />
                                            )
                                                :
                                                (
                                                    <FaEyeSlash />
                                                )
                                        }
                                    </span>
                                </div>
                            </div>

                            {/* button */}
                            <div className='flex flex-col'>
                                <button className='0 mb-2 p-3 border-gray-500 border hover:bg-gray-500 hover:text-white transition-colors peer'>SIGN IN</button>
                                <Link to={'/forgot-password'} className='item-center justify-center flex mb-6 p-3 border-gray-500 border hover:bg-gray-700 hover:text-white transition-colors peer'>FORGOT PASSWORD</Link>
                            </div>


                            {/* End form */}
                        </form>

                    </div>
                    {/* end of div 1 */}

                    {/* div 2 - ko co tai khoan - dk */}
                    <div className='max-w-md mt-16 ml-10 mb-16'>
                        <div className='font-bold text-gray-700 mb-4 text-[20px]'>
                            <span>REGISTER</span>
                        </div>

                        <div className='mb-6 text-[14px] font-semibold'>
                            <span>NEED AN ACCOUNNT ?</span>
                        </div>

                        <div className='mb-6'>
                            <span className='text-[11px]'>
                                Tạo tài khoản với cửa hàng của chúng tôi, bạn sẽ có thể thực hiện quy trình thanh toán nhanh hơn, lưu trữ nhiều địa chỉ giao hàng, xem và theo dõi đơn hàng trong tài khoản của mình và nhiều hơn nữa.
                            </span>
                        </div>

                        <Link to={'/sign-up'} className='item-center justify-center flex mb-6 p-3 border-gray-500 border hover:bg-gray-500 hover:text-white transition-colors peer'>SIGN UP</Link>
                    </div>
                    {/* end of div 2 */}

                </div>



            </div>
        </section>
    )
}

export default Login
