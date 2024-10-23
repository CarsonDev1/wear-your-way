'use client';
import React from 'react';
import { Row, Col, Card, Rate, Pagination, Spin } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import './product-list.scss';

import { Product } from '@/app/types/Product.type';
import { getProducts } from '@/app/apis/product/getProduct';
import { useQuery } from '@tanstack/react-query';

const ProductList: React.FC = () => {
	const {
		data: productList,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['productList'],
		queryFn: () => getProducts(),
	});

	// Handle loading state
	if (isLoading) {
		return (
			<div className='loading-spinner'>
				<Spin size='large' />
			</div>
		);
	}

	// Handle error state
	if (error) {
		return <div>Error loading products: {(error as Error).message}</div>;
	}

	return (
		<div className='sec-com'>
			<div className='container'>
				<div className='enhanced-responsive-product-listing'>
					<Row gutter={[16, 16]}>
						{productList?.map((product: Product) => (
							<Col xs={24} sm={12} md={8} lg={8} xl={8} key={product._id}>
								<Link href={`/product-list/${product._id}`} passHref>
									<Card
										hoverable
										cover={
											<div className='product-image'>
												<Image
													src={product.imageUrls[0]} // Assuming imageUrls array contains image URLs
													alt={product.name}
													width={300}
													height={300}
													layout='responsive'
												/>
											</div>
										}
										bodyStyle={{ padding: '12px' }}
									>
										<h3 className='product-title'>{product.name}</h3>
										<div className='product-price'>{product.price.toLocaleString()}đ</div>
										<div className='product-rating'>
											<Rate allowHalf defaultValue={product.rating} disabled />
											<span className='product-sales'>Đã bán {product.sold}</span>
										</div>
									</Card>
								</Link>
							</Col>
						))}
					</Row>
					<div className='pagination-container'>
						<Pagination defaultCurrent={1} total={50} showSizeChanger={false} responsive />
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
