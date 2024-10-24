'use client';
import React, { useState } from 'react';
import ProgressBar from '@/app/components/progress-bar';
import Step1 from '@/app/(cart)/cart/page';
import '@/app/globals.scss';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import { AuthProvider } from '@/app/contexts/AuthProvider';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import Step2 from '@/app/(cart)/step2';

const Step3 = () => <div>Step 3 Content</div>;

const CartLayout: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(1);

	const nextStep = () => {
		if (currentStep < 3) setCurrentStep(currentStep + 1);
	};

	const prevStep = () => {
		if (currentStep > 1) setCurrentStep(currentStep - 1);
	};

	const renderStepContent = () => {
		switch (currentStep) {
			case 1:
				return <Step1 nextStep={nextStep} />;
			case 2:
				return <Step2 />;
			case 3:
				return <Step3 />;
			default:
				return <Step1 nextStep={nextStep} />;
		}
	};

	return (
		<html lang='en'>
			<body>
				<AuthProvider>
					<AntdRegistry>
						<Header />
						<div className='cart-layout sec-com'>
							<ProgressBar currentStep={currentStep} />
							<div className='cart-content'>{renderStepContent()}</div>
							<div className='navigation-buttons'>
								{currentStep > 1 && <button onClick={prevStep}>Quay lại</button>}
							</div>
						</div>
						<Footer />
					</AntdRegistry>
				</AuthProvider>
			</body>
		</html>
	);
};

export default CartLayout;
