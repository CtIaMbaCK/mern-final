import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoCloseSharp } from "react-icons/io5";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callFunc

}) => {
  const [userRole,setUserRole] = useState(role)

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value)

    // console.log(e.target.value)
  }

  const updateUserRole = async() => { 
    const fetchResponse = await fetch(SummaryApi.updateUser.url,{
      method: SummaryApi.updateUser.method,
      credentials: 'include',
      headers : {
        "content-type" : "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole
      })
    })

    const resposeData = await fetchResponse.json()

    if(resposeData.success) {
      toast.success(resposeData.message)
      onClose()
      callFunc()
    }

    console.log("role updated",resposeData)
  }

  return (
    <div className='absolute w-full h-full z-10 flex justify-center items-center  top-0 left-0 bg-slate-200 bg-opacity-50 ' >
      <div className='bg-white mx-auto p-4 w-full max-w-sm shadow-md relative pb-16' >

        <button className='block ml-auto text-lg mb-2 hover:text-red-300' onClick={onClose}>
          <IoCloseSharp/>
        </button>

        <h1 className='pd-4 text-lg font-semibold bg-sky-200 text-white py-2 items-center flex justify-center mb-2'>Đổi ROLE người dùng</h1>

        <p>Name: {name}</p>
        <p>Email: {email}</p>

        <label htmlFor="countries" className=" mt-6 block mb-2 text-sm font-medium text-gray-900 dark:text-black ">Select an option</label>
        <div className='flex justify-between items-center'>
          <p>Role: </p>
          <select value={userRole} onChange={handleOnChangeSelect} id="countries" className=" text-gray-900 text-sm rounded-lg focus:ring-white block  p-2.5 dark:bg-gray-400 dark:text-white">
            {
              Object.values(ROLE).map(el => {
                return <option value={el} key={el}>{el}</option>
              })
            }
          </select>
        </div>

        <button className='w-fit mx-auto block border py-1 px-3 rounded-md right-4 mt-2 absolute bg-sky-500 text-white font-semibold hover:bg-sky-700' onClick={updateUserRole}>
          Xác nhận
        </button>
      </div>
    </div>
  )
}

export default ChangeUserRole