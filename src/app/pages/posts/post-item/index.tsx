'use client';
import React from 'react';
import { Typography, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import Post01 from '@/app/assets/images/posts/post-01.png';
import Post02 from '@/app/assets/images/posts/post-02.png';
import Post03 from '@/app/assets/images/posts/post-03.png';
import Post04 from '@/app/assets/images/posts/post-04.png';
import Image from 'next/image';
import './post-item.scss';

const { Title, Paragraph } = Typography;

export default function PostItem() {
	return (
		<>
			<div className='post-item'>
				<div className='post-item-image'>
					<Image src={Post01} alt='Children playing outdoors' width={300} height={187} />
				</div>
				<div className='post-item-text'>
					<Title level={4}>1/6 - Ngày Quốc tế Thiếu nhi</Title>
					<Paragraph>Ưu đãi "thiếu nhi" giảm giá 20% cho tất cả các sản phẩm áo thun, phụ kiện.</Paragraph>
					<Paragraph>Miễn phí in hình ảnh, logo lên áo thun.</Paragraph>
					<Paragraph>Tặng kèm móc khóa hoặc ly nước cho hóa đơn từ 300.000đ.</Paragraph>
					<a href='#' className='post-item-text-btn'>
						<span>Xem thêm thông tin chi tiết</span>
					</a>
				</div>
			</div>
			<div className='post-item'>
				<div className='post-item-image'>
					<Image src={Post02} alt='Children playing outdoors' width={300} height={187} />
				</div>
				<div className='post-item-text'>
					<Title level={4}>Black Friday (tháng 11)</Title>
					<Paragraph>Sale "sập sàn" lên đến 50% cho một số mẫu (đã có sẵn).</Paragraph>
					<Paragraph>Mua 1 tặng 1 cho hóa đơn trên 500.000VNĐ</Paragraph>
					<a href='#' className='post-item-text-btn'>
						<span>Xem thêm thông tin chi tiết</span>
					</a>
				</div>
			</div>
			<div className='post-item'>
				<div className='post-item-image'>
					<Image src={Post03} alt='Children playing outdoors' width={300} height={187} />
				</div>
				<div className='post-item-text'>
					<Title level={4}>Các ngày trùng tháng (ví dụ: 1/1; 2/2; ...)</Title>
					<Paragraph>Combo ưu đãi cho các sản phẩm áo thun, móc khóa, vớ,....hóa đơn từ 500.000đ.</Paragraph>
					<Paragraph>Miễn phí vận chuyển.</Paragraph>
					<a href='#' className='post-item-text-btn'>
						<span>Xem thêm thông tin chi tiết</span>
					</a>
				</div>
			</div>
			<div className='post-item'>
				<div className='post-item-image'>
					<Image src={Post04} alt='Children playing outdoors' width={300} height={187} />
				</div>
				<div className='post-item-text'>
					<Title level={4}> Các ngày lễ Tình nhân (14/2, 14/5, 14/9)</Title>
					<Paragraph>Ưu đãi "độc quyền" cho các cặp đôi: giảm giá 30% khi mua 2 áo thun đôi.</Paragraph>
					<Paragraph>Tặng kèm vớ đôi cho hóa đơn từ 700.000đ.</Paragraph>
					<Paragraph>Miễn phí vận chuyển cho đơn hàng từ 1.000.000đ.</Paragraph>
					<a href='#' className='post-item-text-btn'>
						<span>Xem thêm thông tin chi tiết</span>
					</a>
				</div>
			</div>
		</>
	);
}
