/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect } from 'react';
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

// Extend HTMLDivElement attributes to include Facebook Messenger plugin attributes
const Banner: React.FC = () => {
	useEffect(() => {
		const loadFacebookSDK = () => {
			(window as any).fbAsyncInit = function () {
				(window as any).FB.init({
					xfbml: true,
					version: 'v13.0',
				});
			};

			if (!document.getElementById('facebook-jssdk')) {
				const script = document.createElement('script');
				script.id = 'facebook-jssdk';
				script.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
				document.body.appendChild(script);
			}
		};

		loadFacebookSDK();

		if ((window as any).FB) {
			(window as any).FB.XFBML.parse();
		}
	}, []);

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

			<div
				className='fb-customerchat'
				data-attribution='setup_tool'
				data-page_id='YOUR_PAGE_ID'
				data-theme_color='#0084ff'
				data-logged_in_greeting='Chào bạn! Bạn cần hỗ trợ gì?'
				data-logged_out_greeting='Chào bạn! Bạn cần hỗ trợ gì?'
			></div>
		</div>
	);
};

export default Banner;
