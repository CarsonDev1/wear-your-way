'use client';
import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, InputNumber, Row, Col, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import './product.scss';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/app/apis/product/getProduct';
import { Product } from '@/app/types/Product.type';
import { createProduct } from '@/app/apis/product/createProduct';

const ProductPage: React.FC = () => {
	const {
		data: productList,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['productList'],
		queryFn: () => getProducts(),
	});

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const [isAddMode, setIsAddMode] = useState(false);
	const [form] = Form.useForm();

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (price: number) => `${price.toLocaleString()} VND`,
		},
		{
			title: 'Sold',
			dataIndex: 'sold',
			key: 'sold',
		},
		{
			title: 'Reviews Count',
			dataIndex: 'reviewsCount',
			key: 'reviewsCount',
		},
		{
			title: 'Rating',
			dataIndex: 'rating',
			key: 'rating',
		},
		{
			title: 'Size',
			dataIndex: 'size',
			key: 'size',
			render: (sizes: string[]) => sizes.join(', '),
		},
		{
			title: 'Image',
			dataIndex: 'imageUrls',
			key: 'imageUrls',
			render: (imageUrls: string[]) => <img src={imageUrls[0]} alt='Product Image' style={{ width: '50px' }} />,
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (text: string, record: Product) => (
				<Space size='middle'>
					<Button type='primary' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
						Edit
					</Button>
					<Button type='primary' danger icon={<DeleteOutlined />}>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const handleEdit = (product: Product) => {
		setIsAddMode(false);
		setEditingProduct(product);
		form.setFieldsValue(product);
		setIsModalVisible(true);
	};

	const handleDelete = (id: number) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this product?',
			onOk() {},
		});
	};

	const handleAdd = () => {
		setIsAddMode(true);
		form.resetFields();
		setIsModalVisible(true);
	};

	const handleOk = () => {
		form.validateFields().then(async (values) => {
			const { name, price, sold, reviewsCount, rating, size } = values;
			const formData = new FormData();

			formData.append('name', name);
			formData.append('price', price);
			formData.append('sold', sold);
			formData.append('reviewsCount', reviewsCount || 0);
			formData.append('rating', rating || 0);
			formData.append('size', size);

			const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
			if (fileInput?.files) {
				Array.from(fileInput.files).forEach((file) => {
					formData.append('image', file);
				});
			}

			try {
				if (isAddMode) {
					await createProduct(formData);
				} else if (editingProduct) {
					// Add logic for updating the product if editing
				}
				setIsModalVisible(false);
				form.resetFields();
			} catch (error) {
				console.error('Error creating product:', error);
			}
		});
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		form.resetFields();
	};

	if (isLoading) return <Spin size='large' />;
	if (error) return <div>Error fetching products...</div>;

	return (
		<div className='product-page'>
			<Card
				title={
					<Row justify='space-between'>
						<Col>Product Management</Col>
						<Col>
							<Button type='primary' icon={<PlusOutlined />} onClick={handleAdd}>
								Add Product
							</Button>
						</Col>
					</Row>
				}
				className='Product-card'
			>
				<Table columns={columns} dataSource={productList} rowKey='id' />
			</Card>

			<Modal
				title={isAddMode ? 'Add Product' : 'Edit Product'}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						name='name'
						label='Name'
						rules={[{ required: true, message: 'Please input the product name!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='price'
						label='Price'
						rules={[{ required: true, message: 'Please input the price!' }]}
					>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item
						name='sold'
						label='Sold'
						rules={[{ required: true, message: 'Please input the sold quantity!' }]}
					>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='reviewsCount' label='Reviews Count'>
						<InputNumber min={0} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='rating' label='Rating'>
						<InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} />
					</Form.Item>
					<Form.Item name='size' label='Size'>
						<Input placeholder='Enter sizes separated by commas, e.g., S, M, L' />
					</Form.Item>
					<Form.Item name='image' label='Product Image'>
						<input type='file' multiple />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ProductPage;
