'use client';

import React, { useEffect, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import './step3.scss';
import { getOrderById } from '@/app/apis/cart/getOrderById';
import { useQuery } from '@tanstack/react-query';

const { Title, Paragraph, Text } = Typography;

const Step3: React.FC = () => {
	const [orderId, setOrderId] = useState<string | null>(null);
	useEffect(() => {
		const storedOrderId = localStorage.getItem('orderId');
		if (storedOrderId) {
			setOrderId(storedOrderId);
		}
	}, []);
	const { data: order } = useQuery({
		queryKey: ['order', orderId],
		queryFn: () => getOrderById(orderId as string),
		enabled: !!orderId,
	});
	return (
		<div className='payment-confirmation'>
			<div className='check-icon'>
				<CheckOutlined />
			</div>
			<Title level={2} className='success-message'>
				BẠN ĐÃ THANH TOÁN THÀNH CÔNG
			</Title>
			<Paragraph className='delivery-info'>
				Đơn hàng của bạn dự kiến sẽ được gửi đến sớm nhất vào 3 ngày
			</Paragraph>
			<Paragraph className='wish-message'>Chúc bạn một ngày thật vui vẻ và tràn đầy may mắn &lt;3</Paragraph>
			<Text strong className='order-number'>
				Mã đơn hàng #{order?._id}
			</Text>
		</div>
	);
};

export default Step3;
