import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        userName: "",
        role: "",
        _id:""
    })


    const fetchAllUser = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })

        const dataReponse = await fetchData.json()

        if (dataReponse.success) {
            setAllUsers(dataReponse.data)
        }

        if (dataReponse.error) {
            toast(dataReponse.message)
        }


        // console.log(dataReponse)
    }

    useEffect(() => {
        fetchAllUser()
    }, [])

    return (
        <div>
            <table className='w-full userTable'>
                <thead className='bg-sky-300 border-b-2 border-sky-300'>
                    <tr>
                        <th >No.</th>
                        <th >Name</th>
                        <th >Email</th>
                        <th >Role</th>
                        <th >Create Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((el, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{el.userName}</td>
                                    <td>{el.email}</td>
                                    <td>{el.role}</td>
                                    <td>{new Date(el.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        <button className='text-green-500 text-[20px] hover:cursor-pointer hover:text-green-600 transition ease-in-out' 
                                        onClick={() => {
                                            setUpdateUserDetails(el)
                                            setOpenUpdateRole(true)
                                        }}
                                        >
                                            <FaEdit />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {
                openUpdateRole && (
                    <ChangeUserRole 
                        onClose={() => setOpenUpdateRole(false)}
                        name={updateUserDetails.userName}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id} 
                        callFunc={fetchAllUser}/>
                )
            }

        </div>
    )
}

export default AllUsers