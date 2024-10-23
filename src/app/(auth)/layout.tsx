import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import CustomHeader from '@/app/(auth)/components/header';
import Footer from '@/app/(auth)/components/footer';
import 'react-toastify/dist/ReactToastify.css';
import '../globals.scss';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '@/app/contexts/AuthProvider';

const archivo = Archivo({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Auth Wear Your Way',
	description: 'Auth Wear Your Way',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={archivo.className}>
				<AuthProvider>
					<AntdRegistry>
						<CustomHeader />
						{children}
						<Footer />
					</AntdRegistry>
					<ToastContainer />
				</AuthProvider>
			</body>
		</html>
	);
}
