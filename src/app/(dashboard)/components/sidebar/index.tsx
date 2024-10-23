'use client';
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
	HomeOutlined,
	UserOutlined,
	BarChartOutlined,
	ShoppingOutlined,
	GiftOutlined,
	ToolOutlined,
	MenuOutlined,
	CloseOutlined,
} from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Dùng usePathname từ next/navigation để lấy đường dẫn
import Logo from '@/app/assets/images/logo-auth.png';
import './sidebar.scss';

const { Sider } = Layout;

const Sidebar: React.FC = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const [selectedKey, setSelectedKey] = useState('1');
	const pathname = usePathname(); // Lấy đường dẫn hiện tại

	// Cập nhật selectedKey dựa trên URL hiện tại
	useEffect(() => {
		switch (pathname) {
			case '/dashboard':
				setSelectedKey('1');
				break;
			case '/customer':
				setSelectedKey('2');
				break;
			case '/analysis':
				setSelectedKey('3');
				break;
			case '/product':
				setSelectedKey('4');
				break;
			case '/voucher':
				setSelectedKey('5');
				break;
			case '/services':
				setSelectedKey('6');
				break;
			default:
				setSelectedKey('1');
		}
	}, [pathname]); // Theo dõi pathname để cập nhật khi URL thay đổi

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	const closeSidebar = () => {
		setSidebarOpen(false);
	};

	return (
		<>
			{/* Nút toggle cho màn hình nhỏ */}
			<button className='menu-toggle' onClick={toggleSidebar}>
				{isSidebarOpen ? <CloseOutlined /> : <MenuOutlined />}
			</button>

			{/* Lớp overlay khi sidebar mở */}
			{isSidebarOpen && <div className='overlay' onClick={closeSidebar} />}

			<Sider
				width={250}
				className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}
				onClick={(e) => e.stopPropagation()} // Ngăn không cho đóng sidebar khi nhấn bên trong
			>
				<div className='logo'>
					<h2>Overview</h2>
					<Image src={Logo} alt='Wear Your Way' width={200} height={80} />
				</div>
				<Menu
					mode='inline'
					selectedKeys={[selectedKey]} // Thêm selectedKeys
					className='sidebar-menu'
				>
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
		</>
	);
};

export default Sidebar;
