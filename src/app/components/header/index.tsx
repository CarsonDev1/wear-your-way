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

const Header = () => {
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const subMenuRef = useRef<HTMLUListElement | null>(null);
	const { cartCount } = useAuth();

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
						<div className='icon'>
							<FaRegCircleUser />
						</div>
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
