'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './banner.scss';
import Image from 'next/image';
import Banner01 from '@/app/assets/images/banner-01.png';
import Banner02 from '@/app/assets/images/banner-02.png';
import BannerChat from '@/app/assets/images/banner-chat.png';

const Banner = () => {
	return (
		<div className='banner'>
			<Swiper modules={[Navigation]} spaceBetween={10} slidesPerView={1} navigation={true} className='mySwiper'>
				<SwiperSlide>
					<Image src={Banner01} alt='Shirt 1' className='product' width={1820} height={1200} />
				</SwiperSlide>
				<SwiperSlide>
					<Image src={Banner02} alt='Shirt 2' className='product' width={1820} height={1200} />
				</SwiperSlide>
			</Swiper>

			<button className='cta-button'>THIẾT KẾ NGAY</button>

			<div className='chat-button'>
				<button>Chat tư vấn</button>
				<Image src={BannerChat} width={72} height={74} alt='banner-chat' className='icon-chat' />
			</div>
		</div>
	);
};

export default Banner;
