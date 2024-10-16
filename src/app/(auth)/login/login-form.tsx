'use client';
import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Image from 'next/image';
import Logo from '@/app/assets/images/logo.png';
import FacebookIcon from '@/app/assets/images/facebook-icon.png';
import GoogleIcon from '@/app/assets/images/google-icon.png';

import './login.scss';
import Link from 'next/link';

const LoginPage: React.FC = () => {
	const onFinish = (values: unknown) => {
		console.log('Success:', values);
	};

	return (
		<div className='login-form sec-com'>
			<div className='container'>
				<div className='login-container'>
					<div className='login-left'>
						<div className='logo-container'>
							<Image src={Logo} alt='WYW Logo' width={900} height={800} quality={100} />
						</div>
						<p className='slogan'>
							Nền tảng thiết kế áo theo ý thích của bạn WYW
							<br />
							Nơi bạn thỏa sức sáng tạo và cá nhân hóa sản
							<br />
							phẩm theo ý tưởng riêng.
						</p>
					</div>
					<div className='login-right'>
						<div className='login-wrap'>
							<Form
								name='normal_login'
								className='login-form'
								initialValues={{ remember: true }}
								onFinish={onFinish}
							>
								<h2>Đăng nhập</h2>
								<Form.Item
									name='username'
									rules={[{ required: true, message: 'Please input your Username!' }]}
								>
									<Input
										prefix={<UserOutlined className='site-form-item-icon' />}
										placeholder='Email/Số điện thoại/Tên đăng nhập'
										className='custom-input'
										autoComplete='off'
									/>
								</Form.Item>
								<Form.Item
									name='password'
									rules={[{ required: true, message: 'Please input your Password!' }]}
								>
									<Input.Password
										prefix={<LockOutlined className='site-form-item-icon' />}
										placeholder='Mật khẩu'
										iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
										className='custom-input'
										autoComplete='off'
									/>
								</Form.Item>

								<Form.Item>
									<Button type='primary' htmlType='submit' className='login-form-button'>
										Đăng nhập
									</Button>
								</Form.Item>

								<Form.Item>
									<a className='login-form-forgot' href=''>
										Quên mật khẩu
									</a>
								</Form.Item>

								<Divider className='custom-divider' plain>
									Hoặc
								</Divider>

								<div className='social-login'>
									<Button icon={<Image src={FacebookIcon} alt='Facebook' width={20} height={20} />}>
										Facebook
									</Button>
									<Button icon={<Image src={GoogleIcon} alt='Google' width={20} height={20} />}>
										Google
									</Button>
								</div>

								<div className='register-link'>
									Bạn là người mới? <Link href='/register'>Đăng ký ngay</Link>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
