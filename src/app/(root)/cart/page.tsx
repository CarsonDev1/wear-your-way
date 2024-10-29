// app/(root)/cart/page.tsx
'use client';
export const dynamic = 'force-dynamic';

import CartWrapper from '@/app/(root)/cart/CartWrapper';
import React from 'react';

const Page: React.FC = () => {
	return <CartWrapper />;
};

export default Page;
