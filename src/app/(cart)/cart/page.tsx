/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import { CreditCardOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'; // Import icons
import Image from 'next/image';
import Swal from 'sweetalert2';
import './cart.scss';
import api from '@/app/utils/api';

const { TextArea } = Input;

interface CartItem {
	id: string;
	name: string;
	price: number;
	size: number;
	imageUrl: string;
	quantity: number;
}

interface Step1Props {
	nextStep: () => void;
}

const Step1: React.FC<Step1Props> = ({ nextStep }) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		address: '',
		notes: '',
	});
	const [formErrors, setFormErrors] = useState({
		name: '',
		phone: '',
		address: '',
	});

	useEffect(() => {
		const cartData = localStorage.getItem('cart');
		if (cartData) {
			const parsedCart = JSON.parse(cartData);
			const groupedCart = groupCartItems(parsedCart);
			setCartItems(groupedCart);
		}
	}, []);

	const groupCartItems = (items: CartItem[]) => {
		const groupedItems: { [key: string]: CartItem } = {};
		items.forEach((item) => {
			const key = `${item.id}-${item.size}`;
			if (groupedItems[key]) {
				groupedItems[key].quantity += 1;
			} else {
				groupedItems[key] = { ...item, quantity: 1 };
			}
		});
		return Object.values(groupedItems);
	};

	const handleRemoveItem = (id: string, size: number) => {
		Swal.fire({
			title: 'Xóa sản phẩm?',
			text: 'Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Xóa',
			cancelButtonText: 'Hủy',
		}).then((result) => {
			if (result.isConfirmed) {
				const updatedCart = cartItems.filter((item) => item.id !== id || item.size !== size);
				setCartItems(updatedCart);
				localStorage.setItem('cart', JSON.stringify(updatedCart));
				Swal.fire('Đã xóa!', 'Sản phẩm đã được xóa khỏi giỏ hàng.', 'success');
			}
		});
	};

	const calculateTotalPrice = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validateForm = () => {
		const errors: typeof formErrors = {
			name: '',
			phone: '',
			address: '',
		};
		let isValid = true;

		if (!formData.name) {
			errors.name = 'Họ và Tên là bắt buộc';
			isValid = false;
		}
		if (!formData.phone) {
			errors.phone = 'Số điện thoại là bắt buộc';
			isValid = false;
		}
		if (!formData.address) {
			errors.address = 'Địa chỉ nhận hàng là bắt buộc';
			isValid = false;
		}

		setFormErrors(errors);
		return isValid;
	};

	const handleSubmit = async () => {
		if (validateForm()) {
			setLoading(true);
			const orderData = {
				products: cartItems.map((item) => ({
					productId: item.id,
					quantity: item.quantity,
				})),
				customerName: formData.name,
				customerAddress: formData.address,
				customerPhone: formData.phone,
			};

			try {
				const response = await api.post('/orders/create', orderData);
				if (response.status === 201) {
					const orderId = response.data._id; // Assuming _id is the orderId in the response
					localStorage.setItem('orderId', orderId); // Store orderId in local storage
					message.success('Đơn hàng đã được tạo thành công');
					nextStep();
				} else {
					message.error(`Đã xảy ra lỗi: ${response.data.error}`);
				}
			} catch (error: any) {
				message.error(`Đã xảy ra lỗi khi tạo đơn hàng: ${error.message}`);
			} finally {
				setLoading(false);
			}
		} else {
			message.error('Vui lòng điền đầy đủ các trường bắt buộc');
		}
	};

	return (
		<div className='container responsive-checkout-page'>
			<Row gutter={[24, 24]}>
				<Col xs={24} md={12}>
					<div className='order-summary'>
						<h2>CHI TIẾT ĐƠN HÀNG</h2>
						{cartItems.length === 0 ? (
							<p>Giỏ hàng của bạn trống</p>
						) : (
							cartItems.map((item) => (
								<div className='product-info' key={`${item.id}-${item.size}`}>
									<div className='product-info-image'>
										<Image src={item.imageUrl} alt={item.name} width={200} height={170} />
										<button
											className='remove-btn'
											onClick={() => handleRemoveItem(item.id, item.size)}
										>
											<DeleteOutlined /> Xóa khỏi giỏ hàng
										</button>
									</div>
									<div className='product-details'>
										<h3>{item.name}</h3>
										<p>
											Số lượng: {item.quantity} - Size {item.size}
										</p>
										<p className='price'>{(item.price * item.quantity).toLocaleString()} đ</p>
									</div>
								</div>
							))
						)}
						<div className='total-wrap'>
							<span>Tổng :</span>
							<span className='total'>{calculateTotalPrice().toLocaleString()} đ</span>
						</div>
					</div>
				</Col>
				<Col xs={24} md={12}>
					<div className='customer-info'>
						<h2>NGƯỜI MUA / NHẬN HÀNG</h2>
						<Input
							placeholder='Họ và Tên'
							name='name'
							value={formData.name}
							onChange={handleInputChange}
							status={formErrors.name ? 'error' : ''}
							className={formErrors.name ? 'error-input' : ''}
						/>
						{formErrors.name && (
							<p className='error-message'>
								<ExclamationCircleOutlined /> {formErrors.name}
							</p>
						)}

						<Input
							placeholder='Số điện thoại'
							name='phone'
							value={formData.phone}
							onChange={handleInputChange}
							status={formErrors.phone ? 'error' : ''}
							className={formErrors.phone ? 'error-input' : ''}
						/>
						{formErrors.phone && (
							<p className='error-message'>
								<ExclamationCircleOutlined /> {formErrors.phone}
							</p>
						)}

						<Input
							placeholder='Địa chỉ nhận hàng'
							name='address'
							value={formData.address}
							onChange={handleInputChange}
							status={formErrors.address ? 'error' : ''}
							className={formErrors.address ? 'error-input' : ''}
						/>
						{formErrors.address && (
							<p className='error-message'>
								<ExclamationCircleOutlined /> {formErrors.address}
							</p>
						)}

						<TextArea
							rows={4}
							placeholder='Ghi chú'
							name='notes'
							value={formData.notes}
							onChange={handleInputChange}
						/>

						<Button type='primary' className='payment-btn' onClick={handleSubmit} loading={loading}>
							Thanh Toán <CreditCardOutlined />
						</Button>

						<Button type='primary' className='payment-btn'>
							CẦN SẢN PHẨM KHÁC? CHỌN THÊM....
						</Button>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Step1;
