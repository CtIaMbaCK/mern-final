import React from 'react'
import { FaFacebook } from "react-icons/fa";
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className='shadow-md bg-white '>
      <div className='flex items-center container mx-auto pt-10 pb-10 justify-around'>
        <Logo h={120} className='flex left-0' />
        <div className='max-w-[30%]'>
          <p className='font-bold mb-2'>KẾT NỐI VỚI CHÚNG TÔI</p>
          <p className='text-[12px]'>HELIOS là thương hiệu thời trang nam mang đến những chế tác độc đáo,
            kết hợp với tinh thần phóng khoáng của Stussy. Mỗi sản phẩm đều được
            chế tác thủ công bằng đôi bàn tay người Việt, thể hiện sự tỉ mỉ và chinh
            phục đam mê của những người đàn ông dám nghĩ dám làm.</p>
          <p className='font-bold mb-2 mt-4'>Địa chỉ</p>
          <p className='text-[14px]'>Cơ sở chính: <strong>702 Đ. Nguyễn Văn Linh, Tân Hưng, Quận 7, Hồ Chí Minh</strong></p>
        </div>

        <div className='max-w-[30%]'>
          <p className='font-bold mb-2'>SOCIAL MEDIA</p>
          <div className='flex items-center gap-2'>
            {/* face */}
            <FaFacebook />
            <p className='text-[14px]  hover:text-cyan-700 hover:font-bold'>
              <a href='https://www.facebook.com/ThieDat/' className='text-[16px]'>Our Social Facebook</a>
            </p>
          </div>
          <p className='text-[14px]'>- HaNoi City: <strong>0385279610</strong></p>
          <p className='text-[14px]'>- HoChiMinh City: <strong>0385279610</strong></p>

          <p className='font-bold mb-2 mt-4'>Support Email</p>
          <p className='text-[14px]'>- Thien Dat: <strong><a href='mailto:hathiendat09072004@gmail.com' className='text-[16px]'>hathiendat09072004@gmail.com</a></strong></p>
          <p className='text-[14px]'>- Thien Dat: <strong><a href='mailto:hathiendat09072004@gmail.com' className='text-[16px]'>hathiendat09072004@gmail.com</a></strong></p>
        </div>




      </div>
    </footer>
  )
}

export default Footer