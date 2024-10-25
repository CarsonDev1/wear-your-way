/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import { Button, InputNumber } from 'antd';
import { UndoOutlined, RedoOutlined, SaveOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import TShirt from '@/app/assets/images/design/t-shirt.png';
import Polo from '@/app/assets/images/design/polo.png';
import Image from 'next/image';

import './design.scss';

const TShirtCustomizer: React.FC = () => {
	const [shirtType, setShirtType] = useState<'thun' | 'polo'>('thun');
	const [size, setSize] = useState<{ [key: string]: number }>({ '1': 0, '2': 0, '3': 0, '4': 0 });
	const [color, setColor] = useState<string>('white');
	const [price, setPrice] = useState<number>(0);

	const handleSizeChange = (sizeKey: string, value: number | null) => {
		setSize((prev) => ({ ...prev, [sizeKey]: value || 0 }));
		// Update price logic here
	};

	const colors = ['white', 'black', 'yellow', 'red', 'blue', 'pink', 'green'];

	return (
		<div className='t-shirt-customizer'>
			<h1>Chọn loại áo và chất liệu vải</h1>

			<div className='shirt-type-selection'>
				<div
					className={`shirt-type ${shirtType === 'thun' ? 'active' : ''}`}
					onClick={() => setShirtType('thun')}
				>
					Áo thun
				</div>
				<div
					className={`shirt-type ${shirtType === 'polo' ? 'active' : ''}`}
					onClick={() => setShirtType('polo')}
				>
					Áo Polo
				</div>
			</div>

			<div className='fabric-details'>
				{shirtType === 'thun' ? (
					<ul>
						<li>Chất vải 100% Cotton (220g + 1 sticker free)</li>
						<li>Chất vải polyester (PE) (150g + 1 sticker free)</li>
						<li>Chất vải lạnh (Linen) (200g + 1 sticker free)</li>
					</ul>
				) : (
					<ul>
						<li>Chất vải cá sấu lacosta (250g + 1 sticker free)</li>
						<li>Chất vải 100% Cotton ( 230g + 1 sticker free)</li>
					</ul>
				)}
			</div>

			<div className='customization-options'>
				<Button className='custom-button'>
					Thêm sticker 😊
					<div className='sub-text'>10,000đ / 1 stick</div>
				</Button>
				<Button className='custom-button'>Thêm text</Button>
				<Button className='custom-button'>Tải ảnh lên</Button>
				<Button className='custom-button'>Cọ vẽ</Button>
			</div>

			<div className='shirt-preview'>
				{shirtType === 'thun' ? (
					<Image src={TShirt} alt='T-Shirt Front' width={450} height={320} />
				) : (
					<Image src={Polo} alt='T-Shirt Front' width={450} height={320} />
				)}
			</div>

			<div className='bottom-controls'>
				<div className='edit-controls'>
					<Button icon={<UndoOutlined />}>Xóa</Button>
					<Button icon={<RedoOutlined />}>Quay lại</Button>
					<Button icon={<SaveOutlined />}>Lưu</Button>
				</div>

				<div className='size-selection'>
					<div className='size-label'>Chọn Size</div>
					<div className='size-inputs'>
						{Object.keys(size).map((sizeKey) => (
							<div key={sizeKey} className='size-input'>
								<div className='size-number'>{sizeKey}</div>
								<InputNumber
									min={0}
									value={size[sizeKey]}
									onChange={(value) => handleSizeChange(sizeKey, value)}
								/>
							</div>
						))}
					</div>
				</div>

				<div className='price-display'>
					<span>Giá</span>
					<InputNumber value={price} formatter={(value) => `${value}đ`} disabled />
				</div>
			</div>

			<div className='color-selection'>
				{colors.map((c) => (
					<div
						key={c}
						className={`color-option ${c} ${color === c ? 'selected' : ''}`}
						onClick={() => setColor(c)}
					/>
				))}
				<div className='color-option add-color'>+</div>
			</div>

			<Button type='primary' icon={<ShoppingCartOutlined />} size='large' className='add-to-cart'>
				Thêm vào giỏ hàng
			</Button>
		</div>
	);
};

export default TShirtCustomizer;
