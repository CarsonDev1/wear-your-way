// app/(root)/cart/CartWrapper.tsx
'use client';
export const dynamic = 'force-dynamic';

import CartLayout from '@/app/(root)/cart/layout';
import React from 'react';

const CartWrapper: React.FC = () => {
	return <CartLayout />;
};

export default CartWrapper;
