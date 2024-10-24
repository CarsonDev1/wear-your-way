import React, { useState } from 'react';
import { Row, Col, Radio, Space, Typography } from 'antd';
import { BankOutlined, DollarOutlined } from '@ant-design/icons';
import Payment01 from '@/app/assets/images/cart/payment-01.png';
import Payment02 from '@/app/assets/images/cart/payment-02.png';
import Payment03 from '@/app/assets/images/cart/payment-03.png';
import Payment04 from '@/app/assets/images/cart/payment-04.png';
import Payment05 from '@/app/assets/images/cart/payment-05.png';

import './step2.scss';
import Image from 'next/image';

const { Title, Text } = Typography;

const Step2: React.FC = () => {
	const [paymentMethod, setPaymentMethod] = useState('momo');

	const handlePaymentMethodChange = (e: any) => {
		setPaymentMethod(e.target.value);
	};

	const renderQRSection = () => {
		switch (paymentMethod) {
			case 'momo':
				return (
					<>
						<Title level={5}>QR thanh toán</Title>
						<Image src='/qr-code.png' alt='QR Code' width={150} height={40} />
						<ul>
							<li>
								<Text strong>Tên chủ sở hữu:</Text> Trâm Văn Sải
							</li>
							<li>
								<Text strong>Số điện thoại:</Text> 0774023841
							</li>
							<li>
								<Text strong>Nội dung chuyển khoản:</Text> #12345
							</li>
						</ul>
						<Text type='secondary'>
							Sau khi chuyển khoản thành công bạn sẽ tự động được gửi đơn hàng xác nhận
						</Text>
					</>
				);
			case 'bank':
				return <Text>Thông tin chuyển khoản ngân hàng</Text>;
			case 'credit':
				return <Text>Thông tin thanh toán thẻ quốc tế</Text>;
			case 'cod':
				return <Text>Thông tin thanh toán khi nhận hàng</Text>;
			default:
				return null;
		}
	};

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
								<BankOutlined />
							</Radio>
							<Radio value='credit'>
								<span>Thanh toán thẻ quốc tế Visa, MasterCard, JCB</span>
								<Image src='/visa-mc-jcb.png' alt='Credit Cards' width={100} height={40} />
							</Radio>
							<Radio value='cod'>
								<span>Thanh toán bằng tiền mặt khi nhận hàng</span>
								<DollarOutlined />
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
							<Text strong>Tên khách hàng:</Text> Trâm Văn A
						</li>
						<li>
							<Text strong>Số điện thoại:</Text> 01223972361
						</li>
						<li>
							<Text strong>Địa chỉ:</Text> 81 đường... Quận Bình Tân
						</li>
						<li>
							<Text strong>Mã đơn:</Text> #12345
						</li>
					</ul>

					<Title level={3} className='section-title'>
						ĐƠN HÀNG
					</Title>
					<div className='order-summary'>
						<Image src='/t-shirt.png' alt='T-shirt' width={100} height={40} />
						<div className='order-details'>
							<Text strong>Áo " Ăn chơi sợ gì mưa rơi "</Text>
							<Text>
								Số lượng 10* - <Text type='danger'>4 áo size 1, 3 áo Size 2, 3 áo size 3</Text>
							</Text>
							<Text strong className='price'>
								200.000 đ / áo
							</Text>
						</div>
					</div>

					<div className='total-amount'>
						<Title level={4}>THÀNH TIỀN</Title>
						<Title level={4} type='danger'>
							2.000.000 đ
						</Title>
					</div>
				</Col>
			</Row>
		</div>
	);
};

export default Step2;
