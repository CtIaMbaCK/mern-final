import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import CartProductSearch from '../components/CartProductSearch'

const SearchProduct = () => {
    const query = useLocation()
    const [dataA, setDataA] = useState([])
    const [ loading, setLoading ] = useState(false)

    console.log("query", query.search)

    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataReponse = await response.json()
        setLoading(false)
        setDataA(dataReponse.data)

    }

    useEffect(()=>{
        fetchProduct()
    },[query])

    console.log(dataA)
    return (
        <div className='mt-16'>
            <div className='container mx-auto p-4'>
                {
                    <CartProductSearch data={dataA}/>
                }
            </div>
        </div>
    )
}

export default SearchProduct