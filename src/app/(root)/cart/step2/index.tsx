/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Row, Col, Radio, Space, Typography, Spin, notification, Button } from 'antd';
import Payment01 from '@/app/assets/images/cart/payment-01.png';
import Payment02 from '@/app/assets/images/cart/payment-02.png';
import Payment03 from '@/app/assets/images/cart/payment-03.png';
import Payment04 from '@/app/assets/images/cart/payment-04.png';
import Payment05 from '@/app/assets/images/cart/payment-05.png';
import QR from '@/app/assets/images/cart/qr.png';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getOrderById } from '@/app/api/cart/getOrderById';
import { initiateMomoPayment } from '@/app/api/cart/payment';
import './step2.scss';
import { initiateVnpayPayment } from '@/app/api/cart/paymentVnpay';

const { Title, Text } = Typography;

type PageProps = {
	nextStep: () => void;
};

interface Product {
	name: string;
	price: number;
	imageUrls?: string[];
	size?: string[];
}

interface ProductWrapper {
	product: Product;
	quantity: number;
}

interface Order {
	_id: string;
	customerName: string;
	customerPhone: string;
	customerAddress: string;
	totalPrice: number;
	status: string;
	products: ProductWrapper[];
}

const Step2: React.FC<PageProps> = ({ nextStep }) => {
	const [paymentMethod, setPaymentMethod] = useState('momo');
	const [orderId, setOrderId] = useState<string | null>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const storedOrderId = localStorage.getItem('orderId');
		if (storedOrderId) {
			setOrderId(storedOrderId);
		}
	}, []);

	const {
		data: order,
		isLoading,
		error,
	} = useQuery<Order | undefined>({
		queryKey: ['order', orderId],
		queryFn: () => getOrderById(orderId as string),
		enabled: !!orderId,
	});

	useEffect(() => {
		if (order?.status === 'shipped') {
			nextStep();
		}
	}, [order?.status, nextStep]);

	const handlePaymentMethodChange = (e: any) => {
		setPaymentMethod(e.target.value);
	};

	const handleMomoPayment = async () => {
		try {
			const response = await initiateMomoPayment(order?._id, order?.totalPrice);
			if (response.payUrl) {
				window.location.href = response.payUrl;
			} else {
				notification.error({ message: 'Failed to initiate payment' });
			}
		} catch (error: any) {
			notification.error({ message: 'Error during payment initiation', description: error.message });
		}
	};

	const handleVnpayPayment = async () => {
		try {
			const response = await initiateVnpayPayment(order?._id, order?.totalPrice);
			if (response.payUrl) {
				window.location.href = response.payUrl;
			} else {
				notification.error({ message: 'Failed to initiate VNPAY payment' });
			}
		} catch (error: any) {
			notification.error({ message: 'Error during VNPAY payment initiation', description: error.message });
		}
	};

	const renderQRSection = () => {
		switch (paymentMethod) {
			case 'momo':
				return (
					<>
						<Title level={5}>QR thanh toán</Title>
						<Image src={QR} alt='QR Code' width={300} height={300} />
						<ul>
							<li>
								<Text strong>Tên chủ sở hữu:</Text> Trâm Văn Sải
							</li>
							<li>
								<Text strong>Số điện thoại:</Text> 0774023841
							</li>
							<li>
								<Text strong>Nội dung chuyển khoản:</Text> #{order?._id || 'N/A'}
							</li>
						</ul>
						<Text type='secondary'>
							Sau khi chuyển khoản thành công bạn sẽ tự động được gửi đơn hàng xác nhận
						</Text>
					</>
				);
			case 'bank':
				return (
					<>
						<Title level={5}>VNPAY thanh toán</Title>
						<div className='qr-section'>
							<Button type='primary' onClick={handleVnpayPayment}>
								Thanh Toán với VNPAY
							</Button>
						</div>
					</>
				);
			case 'credit':
			case 'cod':
				return <Text>Comming soon</Text>;
			default:
				return null;
		}
	};

	if (!mounted) return null; // Prevent server-client mismatch

	if (isLoading) {
		return (
			<div className='loading-spinner'>
				<Spin size='large' />
			</div>
		);
	}

	if (error) {
		return <div>Error fetching order details...</div>;
	}

	return (
		<div className='exact-payment-confirmation container'>
			<Row gutter={24}>
				<Col span={12}>
					<Title level={3} className='section-title'>
						CHỌN HÌNH THỨC THANH TOÁN
					</Title>
					<Radio.Group onChange={handlePaymentMethodChange} value={paymentMethod} className='payment-options'>
						<Space direction='vertical' style={{ width: '100%' }}>
							<Radio value='momo'>
								<span>Thanh toán trực tuyến thông qua ví điện tử MoMo</span>
								<Image src={Payment01} alt='MoMo' width={40} height={40} />
							</Radio>
							<Radio value='bank'>
								<span>Thanh toán ngân hàng nội địa</span>
								<Image src={Payment02} alt='VNPAY' width={40} height={40} />
							</Radio>
							<Radio value='credit'>
								<span>Thanh toán thẻ quốc tế Visa, MasterCard, JCB</span>
								<Image src={Payment03} alt='Visa' width={40} height={40} />
								<Image src={Payment04} alt='MasterCard' width={40} height={40} />
							</Radio>
							<Radio value='cod'>
								<span>Thanh toán bằng tiền mặt khi nhận hàng</span>
								<Image src={Payment05} alt='COD' width={40} height={40} />
							</Radio>
						</Space>
					</Radio.Group>

					<div className='qr-section'>{renderQRSection()}</div>
				</Col>

				<Col span={12}>
					<Title level={3} className='section-title'>
						THÔNG TIN KHÁCH HÀNG
					</Title>
					<ul className='customer-info'>
						<li>
							<Text strong>Tên khách hàng:</Text> {order?.customerName || 'N/A'}
						</li>
						<li>
							<Text strong>Số điện thoại:</Text> {order?.customerPhone || 'N/A'}
						</li>
						<li>
							<Text strong>Địa chỉ:</Text> {order?.customerAddress || 'N/A'}
						</li>
						<li>
							<Text strong>Mã đơn:</Text> #{order?._id || 'N/A'}
						</li>
					</ul>

					<Title level={3} className='section-title'>
						ĐƠN HÀNG
					</Title>
					<div className='order-summary'>
						{order?.products.map((productWrapper) => (
							<div key={productWrapper.product.name + productWrapper.quantity} className='order-details'>
								<Image
									src={productWrapper.product.imageUrls?.[0] || '/default-image.jpg'}
									alt={productWrapper.product.name}
									width={100}
									height={100}
								/>
								<div>
									<Text strong>{productWrapper.product.name}</Text>
									<Text>
										Số lượng: {productWrapper.quantity} -{' '}
										<Text type='danger'>{productWrapper.product.size?.join(', ') || 'N/A'}</Text>
									</Text>
									<Text strong className='price'>
										{productWrapper.product.price
											? `${productWrapper.product.price.toLocaleString()} đ`
											: 'N/A'}
									</Text>
								</div>
							</div>
						))}
					</div>

					<div className='total-amount'>
						<Title level={4}>THÀNH TIỀN</Title>
						<Title level={4} type='danger'>
							{order?.totalPrice ? `${order.totalPrice.toLocaleString()} đ` : 'N/A'}
						</Title>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Step2;
