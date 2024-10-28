'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from '@/app/components/progress-bar';
import { AuthProvider } from '@/app/contexts/AuthProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Provider from '@/app/utils/Provider';
import Step1 from '@/app/(root)/cart/page';
import Step2 from '@/app/(root)/cart/step2';
import Step3 from '@/app/(root)/cart/step3';
import '@/app/globals.scss';

const CartLayout: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const stepFromQuery = searchParams.get('step');
		const stepNumber = stepFromQuery ? Number(stepFromQuery) : 1;

		if (stepNumber >= 1 && stepNumber <= 3) {
			setCurrentStep(stepNumber);
		}
	}, [searchParams]);

	const nextStep: () => void = () => {
		if (currentStep < 3) {
			const nextStep = currentStep + 1;
			setCurrentStep(nextStep);
			router.push(`/cart?step=${nextStep}`);
		}
	};

	const renderStepContent = (): React.ReactNode => {
		switch (currentStep) {
			case 1:
				return <Step1 nextStep={nextStep} />;
			case 2:
				return <Step2 nextStep={nextStep} />;
			case 3:
				return <Step3 />;
			default:
				return <Step1 nextStep={nextStep} />;
		}
	};

	if (!mounted) return null; // Prevents server-side rendering of this component

	return (
		<Provider>
			<AuthProvider>
				<AntdRegistry>
					<div className='cart-layout sec-com'>
						<ProgressBar currentStep={currentStep} />
						<div className='cart-content'>{renderStepContent()}</div>
					</div>
				</AntdRegistry>
			</AuthProvider>
		</Provider>
	);
};

export default CartLayout;
