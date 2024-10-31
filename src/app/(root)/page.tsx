'use client';
import { useAuth } from '@/app/contexts/AuthProvider';
import Banner from '@/app/pages/home/banner';

export default function Home() {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) {
		window.location.href = '/login';
		return null;
	}
	return (
		<div>
			<Banner />
		</div>
	);
}
