'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '@/app/assets/images/logo.png';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoIosArrowDown, IoMdMenu } from 'react-icons/io';
import { IoMdClose } from 'react-icons/io';
import './header.scss';

const Header = () => {
	const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleSubMenu = () => {
		setIsSubMenuOpen(!isSubMenuOpen);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header className='header'>
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
									<ul className='sub-menu'>
										<li>
											<a href='#'>Sub Item 1</a>
										</li>
										<li>
											<a href='#'>Sub Item 2</a>
										</li>
									</ul>
								)}
							</li>
							<li>
								<a href='#'>tin tức</a>
							</li>
							<li>
								<a href='#'>about us</a>
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
