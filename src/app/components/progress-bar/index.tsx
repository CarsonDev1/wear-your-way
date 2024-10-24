import React, { useEffect, useRef } from 'react';
import { ShoppingCartOutlined, CreditCardOutlined, CheckOutlined } from '@ant-design/icons';
import './progress-bar.scss';
import '@/app/globals.scss';

interface ProgressBarProps {
	currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
	const progressBarRef = useRef<HTMLDivElement>(null);
	const progressWidth = `${((currentStep - 1) / 2) * 100}%`;

	useEffect(() => {
		if (progressBarRef.current) {
			progressBarRef.current.style.setProperty('--progress-width', progressWidth);
		}
	}, [currentStep, progressWidth]);

	return (
		<div className='container'>
			<div className='progress-bar' ref={progressBarRef}>
				<div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
					<ShoppingCartOutlined />
					<span>Giỏ Hàng</span>
				</div>
				<div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
					<CreditCardOutlined />
					<span>Chọn phương thức thanh toán</span>
				</div>
				<div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
					<CheckOutlined />
					<span>Xác nhận</span>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
