import React from 'react';
import Image from 'next/image';
import AboutImage from '@/app/assets/images/about/about-image.png';
import './about.scss';

const AboutUs = () => {
	return (
		<div className='about'>
			<div className='sec-com'>
				<div className='container'>
					<div className='about-wrap'>
						<div className='about-wrap-left'>
							<h3 className='about-wrap-left-tt'>About us</h3>
							<span className='about-wrap-left-sub-tt'>
								Wear Your Way (WYW): Thỏa sức sáng tạo, tận hưởng phong cách riêng
							</span>
							<p className='about-wrap-left-content'>
								Bạn đang tìm kiếm một trang web cho phép bạn tự thiết kế áo thun và quà tặng độc đáo
								theo sở thích của mình? Đến với Wear Your Way (WYW), nơi bạn có thể thỏa sức sáng tạo và
								tận hưởng phong cách thời trang độc đáo của mình!
							</p>
							<p className='about-wrap-left-content'>
								WYW in áo thun theo yêu cầu cho mọi lứa tuổi và phong cách với nhiều mẫu mã, kiểu dáng
								và màu sắc. Bằng cách sử dụng hình ảnh, logo hoặc công cụ thiết kế trực tuyến đơn giản
								của WYW, bạn có thể tự do tạo ra thiết kế của riêng mình.
							</p>
							<p className='about-wrap-left-content'>
								Ngoài ra, WYW còn mang đến cho bạn vô số lựa chọn quà tặng độc đáo đi kèm theo áo thun,
								như: móc khóa, vớ, vòng tay...
							</p>
							<p className='about-wrap-left-content'>
								Tất cả sản phẩm của WYW đều được làm từ chất liệu cao cấp, đảm bảo rằng chúng bền đẹp và
								an toàn khi sử dụng.
							</p>
							<p className='about-wrap-left-content'>
								Đặc biệt, WYW có hệ thống phân loại sản phẩm theo mức giá rõ ràng giúp bạn dễ dàng lựa
								chọn sản phẩm phù hợp với ngân sách của mình.
							</p>
						</div>
						<div className='about-wrap-right'>
							<Image src={AboutImage} alt='about-image' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AboutUs;
