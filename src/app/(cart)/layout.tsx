'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from '@/app/components/progress-bar';
import '@/app/globals.scss';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { AuthProvider } from '@/app/contexts/AuthProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Step2 from '@/app/(cart)/step2';
import Provider from '@/app/utils/Provider';
import Step3 from '@/app/(cart)/step3';
import Step1 from '@/app/(cart)/step1/page';

const CartLayout: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [currentStep, setCurrentStep] = useState<number>(1);

	useEffect(() => {
		const stepFromQuery = searchParams.get('step');
		const stepNumber = stepFromQuery ? Number(stepFromQuery) : 1;

		if (stepNumber >= 1 && stepNumber <= 3) {
			setCurrentStep(stepNumber);
		}
	}, [searchParams]);

	const nextStep = () => {
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

	return (
		<html lang='en'>
			<body>
				<Provider>
					<AuthProvider>
						<AntdRegistry>
							<Header />
							<div className='cart-layout sec-com'>
								<ProgressBar currentStep={currentStep} />
								<div className='cart-content'>{renderStepContent()}</div>
							</div>
							<Footer />
						</AntdRegistry>
					</AuthProvider>
				</Provider>
			</body>
		</html>
	);
};

export default CartLayout;
