'use client';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProductById } from '@/app/api/product/getProductById';
import { useState } from 'react';
import { Row, Col, Rate, Button, Spin } from 'antd';
import Image from 'next/image';
import ChartSize from '@/app/assets/images/table-price/table-pirce-05.png';
import { useAuth } from '@/app/contexts/AuthProvider';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import './detail.scss';

interface Params {
	id: string;
}

const ProductDetail: React.FC = () => {
	const params = useParams() as unknown as Params;
	const { id } = params;
	const [selectedSize, setSelectedSize] = useState<number | null>(1);
	const { addToCart, isAuthenticated } = useAuth();
	const router = useRouter();

	const handleSizeChange = (size: number) => {
		setSelectedSize(size);
	};

	const handleAddToCart = () => {
		if (!isAuthenticated) {
			router.push('/login');
			return;
		}

		Swal.fire({
			title: 'Xác nhận thêm vào giỏ hàng?',
			text: 'Bạn có chắc muốn thêm sản phẩm này vào giỏ hàng không?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Đồng ý',
			cancelButtonText: 'Hủy',
		}).then((result) => {
			Swal.fire({
				title: 'Thành công!',
				text: 'Đã thêm vào giỏ hàng',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			if (result.isConfirmed) {
				const productDataToStore = {
					id: productData?._id,
					name: productData?.name,
					price: productData?.price,
					size: selectedSize,
					imageUrl: productData?.imageUrls[0],
				};
				addToCart(productDataToStore);
				toast.success('Thêm vào giỏ hàng thành công!');
			}
		});
	};

	const {
		data: productData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['productDetail', id],
		queryFn: () => getProductById(id as string),
		enabled: !!id,
	});

	if (isLoading) {
		return (
			<div className='loading-spinner'>
				<Spin />
			</div>
		);
	}

	if (error) {
		return <div>Error loading product: {(error as Error).message}</div>;
	}

	const productImageSrc = productData?.imageUrls[0] || '/placeholder.svg';

	return (
		<div className='sec-com'>
			<div className='container'>
				<div className='exact-product-detail'>
					<Row gutter={[32, 32]}>
						<Col xs={24} md={8}>
							<div className='product-image'>
								<Image
									src={productImageSrc}
									alt='Mẫu áo thun nhóm màu trắng'
									width={500}
									height={500}
									layout='responsive'
								/>
							</div>
						</Col>
						<Col xs={24} md={16}>
							<h1 className='product-title'>{productData?.name}</h1>
							<div className='product-meta'>
								<Rate disabled defaultValue={productData?.rating} />
								<span className='review-count'>{productData?.reviewsCount} đánh giá</span>
								<span className='sales-count'>{productData?.sold} đã bán</span>
							</div>
							<div className='product-price'>{productData?.price?.toLocaleString()} VND</div>
							<div className='size-selection'>
								<span className='size-label'>Chọn Size</span>
								<div className='size-options'>
									{[1, 2, 3, 4].map((size) => (
										<button
											key={size}
											className={`size-button ${selectedSize === size ? 'selected' : ''}`}
											onClick={() => handleSizeChange(size)}
										>
											{size}
										</button>
									))}
								</div>
							</div>
							<Button type='primary' className='add-to-cart-btn' onClick={handleAddToCart}>
								THÊM VÀO GIỎ HÀNG
							</Button>
						</Col>
						<Row gutter={[32, 32]}>
							<div className='size-chart-wrap'>
								<Col xs={24} md={8}>
									<span></span>
								</Col>
								<Col xs={24} md={16}>
									<div className='size-chart'>
										<Image
											src={ChartSize}
											alt='Size chart'
											width={500}
											height={300}
											layout='responsive'
										/>
									</div>
								</Col>
							</div>
						</Row>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
