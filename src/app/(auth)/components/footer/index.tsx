import Image from 'next/image';
import React from 'react';
import Logo from '@/app/assets/images/logo-footer.png';
import FooterIcon from '@/app/assets/images/footer-icon.png';
import FooterFB from '@/app/assets/images/fb-icon-auth.png';
import FooterIG from '@/app/assets/images/ig-icon-auth.png';
import FooterX from '@/app/assets/images/tw-icon-auth.png';
import './footer.scss';

const Footer = () => {
	return (
		<div>
			<footer className='footer'>
				<div className='container'>
					<div className='footer-content'>
						<div className='footer-section logo-description'>
							<Image src={Logo} alt='Wear Your Way' width={210} height={89} />
							<p>
								WYW in áo thun theo yêu cầu cho mọi lứa tuổi và phong cách với nhiều mẫu mã, kiểu dáng
								và màu sắc. Bằng cách sử dụng hình ảnh, logo hoặc công cụ thiết kế trực tuyến đơn giản
								của WYW, bạn có thể tự do tạo ra thiết kế của riêng mình.
							</p>
						</div>

						<div className='footer-section customer-support'>
							<h3>Hỗ Trợ Khách Hàng</h3>
							<ul>
								<li>
									<a href='#'>Giới thiệu về chúng tôi</a>
								</li>
								<li>
									<a href='#'>Hướng dẫn sử dụng công cụ thiết kế</a>
								</li>
								<li>
									<a href='#'>Chính sách và quy định</a>
								</li>
								<li>
									<a href='#'>Chính sách bảo mật</a>
								</li>
								<li>
									<a href='#'>Thông tin sở hữu</a>
								</li>
							</ul>
						</div>

						<div className='footer-section contact-info'>
							<h3>Chăm Sóc Khách Hàng</h3>
							<p className='phone-number'>0774023841</p>
							<p>
								<a href='mailto:wearyourway.vn@gmail.com'>wearyourway.vn@gmail.com</a>
							</p>
							<div className='social-media'>
								<h4>Follow Us</h4>
								<div className='social-media-wrap'>
									<a href='#'>
										<Image src={FooterFB} width={32} height={28} alt='footer-icon' />
									</a>
									<a href='#'>
										<Image src={FooterIG} width={32} height={28} alt='footer-icon' />
									</a>
									<a href='#'>
										<Image src={FooterX} width={32} height={28} alt='footer-icon' />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
