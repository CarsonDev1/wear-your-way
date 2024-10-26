/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['utfs.io'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'storage.googleapis.com',
				port: '',
				pathname: '/thaco-3149c.appspot.com/**',
			},
		],
	},
};

export default nextConfig;
