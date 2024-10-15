import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import '../globals.scss';
import { AntdRegistry } from '@ant-design/nextjs-registry';

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
				<AntdRegistry>{children}</AntdRegistry>
			</body>
		</html>
	);
}
