import Step1 from '@/app/(cart)/step1';
import React from 'react';

interface Step1Props {
	nextStep: () => void;
}

const Cart: React.FC<Step1Props> = ({ nextStep }) => {
	return (
		<div>
			<Step1 nextStep={nextStep} />
		</div>
	);
};

export default Cart;
