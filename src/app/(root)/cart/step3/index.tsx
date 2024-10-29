'use client';

import React, { useEffect, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

import './step3.scss';
import { getOrderById } from '@/app/api/cart/getOrderById';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/app/contexts/AuthProvider';

const { Title, Paragraph, Text } = Typography;

const Step3: React.FC = () => {
	const [orderId, setOrderId] = useState<string | null>(null);
	const { clearCart } = useAuth();

	useEffect(() => {
		const storedOrderId = localStorage.getItem('orderId');

		// Reload page on initial load only once
		if (!sessionStorage.getItem('hasReloaded')) {
			sessionStorage.setItem('hasReloaded', 'true');
			location.reload();
		}

		if (storedOrderId) {
			setOrderId(storedOrderId);
			clearCart();
		} else {
			console.log('No Order ID found in localStorage');
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
