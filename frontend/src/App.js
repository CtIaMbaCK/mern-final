import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetail } from './store/userSlice';

function App() {

  const dispatch = useDispatch()

  const [ cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    const dataReposne = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    })

    const dataApi = await dataReposne.json();

    if(dataApi.success){
      dispatch(setUserDetail(dataApi.data))
      // console.log("data-user", dataApi.data);
    }
    
    // console.log("data-user", dataReposne);
  }

  const fetchUserAddToCart = async() => {
    const dataReposne = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: 'include'
    })

    const dataApi = await dataReposne.json();

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(() => {
    // user details
    fetchUserDetails()

    // user cart detail 
    fetchUserAddToCart()
  }, [])

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, // user details fetch 
        cartProductCount, // dem so cart
        fetchUserAddToCart
      }}>
        <ToastContainer />

        <Header />
        <main className='min-h-[calc(100vh-120px)]'>
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
