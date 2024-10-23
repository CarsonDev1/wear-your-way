import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Sidebar from '@/app/(dashboard)/components/sidebar';
import Footer from '@/app/components/footer';
import './dashboard.scss';
import '../globals.scss';
import Header from '@/app/(dashboard)/components/header';
import Provider from '@/app/utils/Provider';
import { AuthProvider } from '@/app/contexts/AuthProvider';

const archivo = Archivo({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Dashboard Wear Your Way',
	description: 'Dashboard Wear Your Way',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={archivo.className}>
				<Provider>
					<AuthProvider>
						<AntdRegistry>
							<div className='dashboard-layout'>
								<Sidebar />
								<div className='dashboard-main'>
									<Header />
									{children}
								</div>
							</div>
							<Footer />
						</AntdRegistry>
					</AuthProvider>
				</Provider>
				<ToastContainer />
			</body>
		</html>
	);
}
