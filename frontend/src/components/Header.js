import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetail } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {

  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)

  const context = useContext(Context)
  const navigate = useNavigate()
  const searchhInput = useLocation()
  const [search, setSearch] = useState(searchhInput?.search?.split("=")[1])

  console.log("searchhInput", searchhInput?.search.split("=")[1])

  // console.log("user header", user)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetail(null))
      navigate("/")
    }

    if (data.error) {
      toast.error(data.message)
    }

  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate(`/search`)
    }
  }
  return (
    <div className='fixed w-full z-[1] top-0'>
      <header className='h-16 shadow-md bg-white'>
        {/* logo */}
        <div className='h-full container mx-auto flex items-center px-8 justify-between'>
          <div className=''>
            <Link>
              <Logo w={100} h={60} />
            </Link>
          </div>
          {/* search  */}
          <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-3xl'>
            <input className=' text-gray-400 px-4 py-1 rounded-tl-3xl rounded-bl-3xl outline-none  w-full focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' type='text' placeholder='Search...'
              onChange={handleSearch} value={search}></input>
            <div className='text-lg min-w-[50px] h-8 bg-sky-500 flex justify-center items-center rounded-r-3xl text-white'>
              <GrSearch />
            </div>
          </div>
          {/* user */}
          <div className='flex items-center gap-7'>
            <div className='relatiive  flex justify-center'>
              {/* display usericon */}
              {
                user?._id && (
                  <div className='text-2xl text-gray-700 flex justify-center items-center ' onClick={() => setMenuDisplay(preve => !preve)}>
                    {
                      user?.userName ? (
                        <div className='text-[14px] flex justify-center items-center'>
                          <p>Xin chào, </p>
                          <p className='ml-2 font-semibold text-sky-500'>{user.userName}</p>
                        </div>
                      ) : (
                        <p></p>
                      )
                    }
                    <FaRegCircleUser className='ml-2' />
                  </div>
                )
              }
              {/* display admin panel */}
              {
                menuDisplay && (
                  <div className='absolute bg-white bottom-0 top-11 h-fit p-4 shadow-2xl rounded-2xl hidden md:block cursor-pointer'>
                    <nav> {
                      user?.role === ROLE.ADMIN && (
                        <Link to={'/admin-panel/all-product'} className='whitespace-nowrap hover:bg-sky-200 p-2 ' onClick={() => setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                      )
                    }
                      <Link to={"/order"} className='whitespace-nowrap hover:bg-sky-200 p-2 ' onClick={() => setMenuDisplay(preve => !preve)}>Sản phẩm đã mua</Link>
                    </nav>
                  </div>

                )
              }
            </div>
            {
              user?._id && (
                <Link to={"/cart"} className='text-2xl text-gray-700 relative'>
                  <div><MdShoppingCart /></div>
                  <div className='bg-sky-500 text-white w-5 h-5 flex items-center justify-center rounded-full absolute -top-2 -right-3'>
                    <p className='text-sm' >{context?.cartProductCount}</p> {/* so luong gio hang */}
                  </div>
                </Link>
              )
            }
            <div>
              {
                user?._id ? (
                  <button onClick={handleLogout} className=' px-3 py-1 text-white bg-sky-500 hover:bg-sky-700 rounded-full' >Logout</button>
                ) : (
                  <Link to={'/login'} className=' px-3 py-1 text-white bg-sky-500 hover:bg-sky-700 rounded-full'>Login</Link>
                )
                //
              }
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header 