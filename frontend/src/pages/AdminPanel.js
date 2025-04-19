import React, { useEffect } from 'react'
import { FaRegCircleUser } from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ROLE from '../common/role'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=> {
        if(user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    },[user])

    return (
        <div className='mt-16'>
            <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
                <aside className='bg-white min-h-full w-full max-w-60 customShadow' >
                    <div className=' h-36 flex justify-center items-center flex-col '>
                        <div className='text-5xl text-gray-700 flex justify-center items-center mb-2'>
                            {
                                user?.userName ? (
                                    <img srcSet='https://i.pinimg.com/736x/88/e0/5b/88e05b4031b057a301454b9871578eb2.jpg'
                                        alt='adminPic'
                                        className='w-20 h-20 rounded-full'
                                        >
                                    </img>
                                    // <p className='text-[14px] flex justify-center items-center'>Xin chào,<p className='ml-2 font-semibold text-sky-500'>{user.userName}</p></p>
                                ) : (
                                    <FaRegCircleUser className='ml-2' />
                                )
                            }
                        </div>
                        <p className='capitalize font-semibold text-sky-400'>{user?.userName} - {user?.role}</p>
                        {/* <p>{user?.role}</p> */}
                    </div>
                    {/***navigation */}
                    <div>
                        <nav className='grid p-4'>
                            <Link to={"all-users"} className='px-2 py-1 hover:bg-sky-100 transition ease-in'>All Users</Link>
                            <Link to={"all-product"} className='px-2 py-1 hover:bg-sky-100 transition ease-in'>All Product</Link>
                            <Link to={"all-orders"} className='px-2 py-1 hover:bg-sky-100 transition ease-in'>All Order</Link>
                        </nav>
                    </div>
                </aside>
                <main className='w-full h-full p-2'>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default AdminPanel