/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
'use client';
import { useEffect } from 'react';
import Banner from '@/app/pages/home/banner';

declare global {
	interface Window {
		fbAsyncInit?: () => void;
		FB?: any;
	}
}

export default function Home() {
	useEffect(() => {
		// Check if we are in a browser environment
		if (typeof window !== 'undefined') {
			// Initialize the Facebook SDK
			window.fbAsyncInit = function () {
				if (window.FB) {
					window.FB.init({
						xfbml: true,
						version: 'v13.0',
					});
				}
			};

			// Load the Facebook SDK script
			(function (d, s, id) {
				let js: HTMLScriptElement | null,
					fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s) as HTMLScriptElement;
				js.id = id;
				js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
				fjs.parentNode?.insertBefore(js, fjs);
			})(document, 'script', 'facebook-jssdk');
		}
	}, []);

	return (
		<div>
			<Banner />
		</div>
	);
}
