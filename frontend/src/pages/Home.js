import React from 'react'
import CategoryList from '../components/CategoryList'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {
  return (
    <div>
      <CategoryList />

      <HorizontalCardProduct category={"VongTay"} heading={"Vòng tay từ nhà Helios"} des={"Vòng tay từ nhà Helios được làm từ những chất liệu tốt nhất, với thiết kế tinh tế và sang trọng. Chúng tôi cam kết mang đến cho bạn sản phẩm chất lượng nhất."}/>
      <HorizontalCardProduct category={"DayChuyen"} heading={"Các sản phẩm khác từ Helios"} />
      <HorizontalCardProduct category={"Other"} heading={""}/>


      <HorizontalCardProduct category={"Hoodie"} heading={"Hoodie từ nhà Stussy"}/>
      <HorizontalCardProduct category={"headWear"} heading={"Các sản phẩm khác từ Stussy"}/>
      <HorizontalCardProduct category={"Short"} heading={""}/>
    </div>
  )
}

export default Home