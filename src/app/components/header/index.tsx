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

const Header = () => {
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const subMenuRef = useRef<HTMLUListElement | null>(null);

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
					<div className='logo'>
						<Image src={Logo} alt='Wear Your Way' width={210} height={89} />
					</div>

					<nav className={`navigation ${isMobileMenuOpen ? 'open' : ''}`}>
						<ul>
							<li>
								<a href='#'>thiết kế</a>
							</li>
							<li>
								<a href='#'>sản phẩm mẫu</a>
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
											<Link href='/posts'>Bài Viết</Link>
										</li>
									</ul>
								)}
							</li>
							<li>
								<a href='#'>tin tức</a>
							</li>
							<li className={pathname === '/about' ? 'active' : ''}>
								<Link href='/about'>about us</Link>
							</li>
						</ul>
					</nav>

					<div className='header-icons'>
						<div className='icon'>
							<MdOutlineAddShoppingCart />
						</div>
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
