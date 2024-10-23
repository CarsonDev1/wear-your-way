'use client';
import React from 'react';
import { Layout, Menu } from 'antd';
import {
	HomeOutlined,
	UserOutlined,
	BarChartOutlined,
	ShoppingOutlined,
	GiftOutlined,
	ToolOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/app/assets/images/logo-auth.png';
import './sidebar.scss';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
	return (
		<Sider width={250} className='sidebar'>
			<div className='logo'>
				<h2>Overview</h2>
				<Image src={Logo} alt='Wear Your Way' width={200} height={80} />
			</div>
			<Menu mode='inline' defaultSelectedKeys={['1']} className='sidebar-menu'>
				<Menu.Item key='1' icon={<HomeOutlined />}>
					<Link href='/dashboard'>Dashboard</Link>
				</Menu.Item>
				<Menu.Item key='2' icon={<UserOutlined />}>
					<Link href='/customer'>Customer</Link>
				</Menu.Item>
				<Menu.Item key='3' icon={<BarChartOutlined />}>
					<Link href='/analysis'>Analysis</Link>
				</Menu.Item>
				<Menu.Item key='4' icon={<ShoppingOutlined />}>
					<Link href='/product'>Product</Link>
				</Menu.Item>
				<Menu.Item key='5' icon={<GiftOutlined />}>
					<Link href='/voucher'>Voucher</Link>
				</Menu.Item>
				<Menu.Item key='6' icon={<ToolOutlined />}>
					<Link href='/services'>Services</Link>
				</Menu.Item>
			</Menu>
		</Sider>
	);
};

export default Sidebar;
