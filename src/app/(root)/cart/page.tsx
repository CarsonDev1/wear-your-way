'use client';
import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Button } from 'antd';
import { ShoppingCartOutlined, CreditCardOutlined, CheckOutlined } from '@ant-design/icons';
import Image from 'next/image';
import './cart.scss';

const { TextArea } = Input;

interface CartItem {
	id: string;
	name: string;
	price: number;
	size: number;
	imageUrl: string;
	quantity: number; // Adding quantity to manage grouped products
}

const ResponsiveCheckoutPage: React.FC = () => {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		// Fetch cart data from localStorage
		const cartData = localStorage.getItem('cart');
		if (cartData) {
			const parsedCart = JSON.parse(cartData);
			const groupedCart = groupCartItems(parsedCart);
			setCartItems(groupedCart);
		}
	}, []);

	// Helper function to group cart items by id and size and sum the quantity
	const groupCartItems = (items: CartItem[]) => {
		const groupedItems: { [key: string]: CartItem } = {};
		items.forEach((item) => {
			const key = `${item.id}-${item.size}`;
			if (groupedItems[key]) {
				// If the item already exists, increase its quantity
				groupedItems[key].quantity += 1;
			} else {
				// Otherwise, add the item to the grouped list and initialize quantity
				groupedItems[key] = { ...item, quantity: 1 };
			}
		});
		// Convert the object back to an array
		return Object.values(groupedItems);
	};

	const handleRemoveItem = (id: string, size: number) => {
		// Remove item from cart
		const updatedCart = cartItems.filter((item) => item.id !== id || item.size !== size);
		setCartItems(updatedCart);
		// Update localStorage
		localStorage.setItem('cart', JSON.stringify(updatedCart));
	};

	const calculateTotalPrice = () => {
		return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	return (
		<div className='responsive-checkout-page'>
			<div className='progress-bar'>
				<div className='step active'>
					<ShoppingCartOutlined />
					<span>Giỏ Hàng</span>
				</div>
				<div className='step'>
					<CreditCardOutlined />
					<span>Chọn phương thức thanh toán</span>
				</div>
				<div className='step'>
					<CheckOutlined />
					<span>Xác nhận</span>
				</div>
			</div>

			<Row gutter={[24, 24]}>
				<Col xs={24} md={12}>
					<div className='order-summary'>
						<h2>CHI TIẾT ĐƠN HÀNG</h2>
						{cartItems.length === 0 ? (
							<p>Giỏ hàng của bạn trống</p>
						) : (
							cartItems.map((item) => (
								<div className='product-info' key={`${item.id}-${item.size}`}>
									<Image src={item.imageUrl} alt={item.name} width={100} height={100} />
									<div className='product-details'>
										<h3>{item.name}</h3>
										<p>
											Số lượng: {item.quantity} - Size {item.size}
										</p>
										<p className='price'>{(item.price * item.quantity).toLocaleString()} đ</p>
										<button
											className='remove-btn'
											onClick={() => handleRemoveItem(item.id, item.size)}
										>
											Xóa khỏi giỏ hàng
										</button>
									</div>
								</div>
							))
						)}
						{/* <div className='shipping'>
							<span>Giao hàng</span>
							<span>20.000 đ</span>
						</div>
						<div className='free-shipping'>
							<span>• Miễn phí với đơn hàng từ</span>
							<span>500.000 đ</span>
						</div> */}
						<div className='total'>
							<span>Tổng :</span>
							<span>{calculateTotalPrice().toLocaleString()} đ</span>
						</div>
					</div>
				</Col>
				<Col xs={24} md={12}>
					<div className='customer-info'>
						<h2>NGƯỜI MUA / NHẬN HÀNG</h2>
						<Input placeholder='Họ và Tên' />
						<Input placeholder='Số điện thoại' />
						<Input placeholder='Địa chỉ nhận hàng' />
						<TextArea rows={4} placeholder='Ghi chú' />
						<Button type='primary' className='payment-btn'>
							Thanh Toán <CreditCardOutlined />
						</Button>
						<Button className='add-more-btn'>CẦN SẢN PHẨM KHÁC? CHỌN THÊM...</Button>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default ResponsiveCheckoutPage;
