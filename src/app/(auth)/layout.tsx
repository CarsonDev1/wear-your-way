import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import CustomHeader from '@/app/(auth)/components/header';
import '../globals.scss';
import Footer from '@/app/(auth)/components/footer';

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
				<AntdRegistry>
					<CustomHeader />
					{children}
					<Footer />
				</AntdRegistry>
			</body>
		</html>
	);
}
