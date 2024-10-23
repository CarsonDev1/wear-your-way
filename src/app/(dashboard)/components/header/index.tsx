'use client';
import React from 'react';
import { Input, Dropdown, Menu, Spin } from 'antd';
import { SearchOutlined, SettingOutlined, BellOutlined, UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { getAccount } from '@/app/apis/user/getAccount';
import { useAuth } from '@/app/contexts/AuthProvider';
import './header.scss';

const Header: React.FC = () => {
	const {
		data: user,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['userData'],
		queryFn: () => getAccount(),
	});

	const { logout } = useAuth();

	const menu = (
		<Menu>
			<Menu.Item key='1'>
				<span onClick={() => logout}>Log Out</span>
			</Menu.Item>
		</Menu>
	);

	if (error) {
		return <div>Error loading user data</div>;
	}

	return (
		<div className='container'>
			<header className='app-header'>
				<div className='search-container'>
					<Input
						placeholder='Search for something'
						prefix={<SearchOutlined style={{ color: '#8c8c8c' }} />}
						className='custom-search'
					/>
				</div>
				<div className='icons-container'>
					<SettingOutlined className='header-icon' />
					<div className='notification-icon'>
						<BellOutlined className='header-icon' />
						<span className='notification-dot'></span>
					</div>
					{isLoading ? (
						<Spin />
					) : (
						<Dropdown overlay={menu} trigger={['click']}>
							<div className='user-icon'>
								<UserOutlined className='header-icon' />
							</div>
						</Dropdown>
					)}
				</div>
			</header>
		</div>
	);
};

export default Header;
