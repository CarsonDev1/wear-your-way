'use client';
import React from 'react';
import { Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/app/assets/images/logo-auth.png';

import './header.scss';
import { usePathname } from 'next/navigation';

const CustomHeader: React.FC = () => {
	const pathname = usePathname();
	return (
		<header className='custom-header container'>
			<div className='logo'>
				<Image src={Logo} alt='Wear Your Way' width={184} height={79} />
				<div className='logo-text'>{pathname === '/login' ? <span>Đăng nhập</span> : <span>Đăng ký</span>}</div>
			</div>
			<Button type='text' icon={<QuestionCircleOutlined />} className='help-button'>
				Bạn cần giúp đỡ ?
			</Button>
		</header>
	);
};

export default CustomHeader;
