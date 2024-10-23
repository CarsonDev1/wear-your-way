'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Divider, Spin } from 'antd';
import {
	UserOutlined,
	LockOutlined,
	EyeInvisibleOutlined,
	EyeTwoTone,
	MailOutlined,
	PhoneOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Logo from '@/app/assets/images/logo.png';
import FacebookIcon from '@/app/assets/images/facebook-icon.png';
import GoogleIcon from '@/app/assets/images/google-icon.png';

import './register.scss';
import Link from 'next/link';
import api from '@/app/utils/api';

const RegisterPage: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const onFinish = async (values: any) => {
		const { username, email, phone, password } = values;
		const formData = new FormData();

		formData.append('username', username);
		formData.append('email', email);
		formData.append('phone_number', phone);
		formData.append('password', password);

		setLoading(true);

		try {
			const response = await api.post('/auth/register', formData);

			if (response.status === 201) {
				toast.success('Đăng ký thành công! Chuyển hướng tới trang đăng nhập...', {
					position: 'top-right',
					autoClose: 3000,
				});

				setTimeout(() => {
					router.push('/login');
				}, 3000);
			}
		} catch (error: any) {
			toast.error(error.response?.data?.error || 'Đăng ký thất bại. Vui lòng thử lại sau.', {
				position: 'top-right',
				autoClose: 3000,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='register-form'>
			<div className='container'>
				<div className='register-container'>
					<div className='register-left'>
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
					<div className='register-right'>
						<div className='register-wrap'>
							<Form
								name='normal_register'
								className='register-form'
								initialValues={{ remember: true }}
								onFinish={onFinish}
							>
								<h2>Đăng ký</h2>
								<Form.Item
									name='username'
									rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
								>
									<Input
										prefix={<UserOutlined className='site-form-item-icon' />}
										placeholder='Tên đăng nhập'
										className='custom-input'
										autoComplete='off'
									/>
								</Form.Item>
								<Form.Item
									name='email'
									rules={[
										{ required: true, message: 'Vui lòng nhập email!' },
										{ type: 'email', message: 'Email không hợp lệ!' },
									]}
								>
									<Input
										prefix={<MailOutlined className='site-form-item-icon' />}
										placeholder='Email'
										className='custom-input'
										autoComplete='off'
									/>
								</Form.Item>
								<Form.Item
									name='phone'
									rules={[
										{ required: true, message: 'Vui lòng nhập số điện thoại!' },
										{ pattern: /^[0-9]{10}$/, message: 'Số điện thoại không hợp lệ!' },
									]}
								>
									<Input
										prefix={<PhoneOutlined className='site-form-item-icon' />}
										placeholder='Số điện thoại'
										className='custom-input'
										autoComplete='off'
									/>
								</Form.Item>
								<Form.Item
									name='password'
									rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
								>
									<Input.Password
										prefix={<LockOutlined className='site-form-item-icon' />}
										placeholder='Mật khẩu'
										iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
										className='custom-input'
										autoComplete='off'
									/>
								</Form.Item>
								<Form.Item
									name='confirm'
									dependencies={['password']}
									rules={[
										{ required: true, message: 'Vui lòng xác nhận mật khẩu!' },
										({ getFieldValue }) => ({
											validator(_, value) {
												if (!value || getFieldValue('password') === value) {
													return Promise.resolve();
												}
												return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
											},
										}),
									]}
								>
									<Input.Password
										prefix={<LockOutlined className='site-form-item-icon' />}
										placeholder='Xác nhận mật khẩu'
										iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
										className='custom-input'
										autoComplete='off'
									/>
								</Form.Item>

								<Form.Item>
									<Button
										type='primary'
										htmlType='submit'
										className='register-form-button'
										disabled={loading}
									>
										{loading ? <Spin /> : 'Đăng ký'}
									</Button>
								</Form.Item>

								<Divider className='custom-divider' plain>
									Hoặc
								</Divider>

								<div className='social-register'>
									<Button icon={<Image src={FacebookIcon} alt='Facebook' width={20} height={20} />}>
										Facebook
									</Button>
									<Button icon={<Image src={GoogleIcon} alt='Google' width={20} height={20} />}>
										Google
									</Button>
								</div>

								<div className='login-link'>
									Đã có tài khoản? <Link href='/login'>Đăng nhập ngay</Link>
								</div>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
