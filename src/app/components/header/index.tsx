'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Logo from '@/app/assets/images/logo.png';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoIosArrowDown, IoMdMenu } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import './header.scss';
import { useAuth } from '@/app/contexts/AuthProvider';
import { Button, Dropdown, Menu, Spin } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getAccount } from '@/app/api/user/getAccount';

const Header = () => {
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const subMenuRef = useRef<HTMLUListElement | null>(null);
	const { cartCount } = useAuth();

	// Only make the API request if the accessToken exists
	const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
	const { isLoading, error, data } = useQuery({
		queryKey: ['userData'],
		queryFn: () => (token ? getAccount() : Promise.resolve(null)),
	});

	const { logout } = useAuth();

	const menu = (
		<Menu>
			<Menu.Item key='1'>
				<span onClick={logout}>Log Out</span>
			</Menu.Item>
		</Menu>
	);

	const pathname = usePathname();

	const toggleSubMenu = () => {
		setIsSubMenuOpen(!isSubMenuOpen);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (subMenuRef.current && !subMenuRef.current.contains(event.target as Node)) {
				setIsSubMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	// Conditional rendering for user icon based on data or loading state
	const renderUserIcon = () => {
		if (isLoading) {
			return <Spin />;
		} else if (data) {
			return (
				<Dropdown overlay={menu} trigger={['click']}>
					<div className='user-icon'>
						<FaRegCircleUser className='header-icon' />
					</div>
				</Dropdown>
			);
		} else {
			return (
				<Link href='/login'>
					<Button>Login</Button>
				</Link>
			);
		}
	};

	return (
		<header className={`header ${isScrolled ? 'scrolled' : ''}`}>
			<div className='container'>
				<div className='header-wrap'>
					<Link href='/'>
						<div className='logo'>
							<Image src={Logo} alt='Wear Your Way' width={210} height={89} />
						</div>
					</Link>

					<nav className={`navigation ${isMobileMenuOpen ? 'open' : ''}`}>
						<ul>
							<li>
								<Link href='https://custom-tshirt-two.vercel.app'>thiết kế</Link>
							</li>
							<li>
								<Link href='/product-list'>sản phẩm mẫu</Link>
							</li>
							<li>
								<a href='#' onClick={toggleSubMenu}>
									thông tin <IoIosArrowDown className={isSubMenuOpen ? 'rotate' : ''} />
								</a>
								{isSubMenuOpen && (
									<ul ref={subMenuRef} className={`sub-menu ${isSubMenuOpen ? 'open' : ''}`}>
										<li className={pathname === '/table-price' ? 'active' : ''}>
											<Link href='/table-price'>Bảng Giá</Link>
										</li>
										<li>
											<Link href='#'>Bài Viết</Link>
										</li>
									</ul>
								)}
							</li>
							<li className={pathname === '/posts' ? 'active' : ''}>
								<Link href='/posts'>Tin Tức</Link>
							</li>
							<li className={pathname === '/about' ? 'active' : ''}>
								<Link href='/about'>about us</Link>
							</li>
						</ul>
					</nav>

					<div className='header-icons'>
						<Link href='/cart'>
							<div className='icon cart-icon'>
								<MdOutlineAddShoppingCart />
								{cartCount > 0 && <span className='cart-count'>{cartCount}</span>}
							</div>
						</Link>
						{renderUserIcon()}
						<div className='burger-menu' onClick={toggleMobileMenu}>
							{isMobileMenuOpen ? <IoMdClose /> : <IoMdMenu />}
						</div>
					</div>
				</div>
			</div>

			{isMobileMenuOpen && <div className='mobile-menu-overlay' onClick={toggleMobileMenu}></div>}
		</header>
	);
};

export default Header;
