// app/(root)/cart/CartLayout.tsx
'use client';
export const dynamic = 'force-dynamic';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/app/components/progress-bar';
import { AuthProvider } from '@/app/contexts/AuthProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Provider from '@/app/utils/Provider';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import '@/app/globals.scss';

const CartLayout: React.FC = () => {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState<number>(1);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const params = new URLSearchParams(window.location.search);
		const stepFromQuery = params.get('step');
		const stepNumber = stepFromQuery ? Number(stepFromQuery) : 1;

		if (stepNumber >= 1 && stepNumber <= 3) {
			setCurrentStep(stepNumber);
		}
	}, []);

	const goToNextStep = () => {
		if (currentStep < 3) {
			const next = currentStep + 1;
			setCurrentStep(next);
			router.push(`/cart?step=${next}`);
		}
	};

	const renderStepContent = (): React.ReactNode => {
		switch (currentStep) {
			case 1:
				return <Step1 nextStep={goToNextStep} />;
			case 2:
				return <Step2 nextStep={goToNextStep} />;
			case 3:
				return <Step3 />;
			default:
				return <Step1 />;
		}
	};

	if (!mounted) return null;

	return (
		<Provider>
			<AuthProvider>
				<AntdRegistry>
					<Suspense fallback={<div>Loading...</div>}>
						<div className='cart-layout sec-com'>
							<ProgressBar currentStep={currentStep} />
							<div className='cart-content'>{renderStepContent()}</div>
						</div>
					</Suspense>
				</AntdRegistry>
			</AuthProvider>
		</Provider>
	);
};

export default CartLayout;
