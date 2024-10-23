'use client';
import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, InputNumber, Row, Col, Spin, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts } from '@/app/apis/product/getProduct';
import { Product } from '@/app/types/Product.type';
import { createProduct } from '@/app/apis/product/createProduct';
import { deleteProduct } from '@/app/apis/product/deleteProduct'; // Import API deleteProduct
import Swal from 'sweetalert2';
import Image from 'next/image';
import { updateProduct } from '@/app/apis/product/updateProduct';
import './product.scss';

const ProductPage: React.FC = () => {
	const queryClient = useQueryClient();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(false);
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
			render: (imageUrls: string[]) => (
				<Image src={imageUrls[0]} width={50} height={50} alt='Product Image' style={{ width: '50px' }} />
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (text: string, record: Product) => (
				<Space size='middle'>
					<Button type='primary' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
						Edit
					</Button>
					<Button type='primary' danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const {
		data: productList,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['productList'],
		queryFn: () => getProducts(),
	});

	const { mutate: mutateCreateProduct } = useMutation({
		mutationFn: async (formData: FormData) => {
			await createProduct(formData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['productList'] });
			Swal.fire({
				title: 'Success!',
				text: 'Product created successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			setIsModalVisible(false);
			form.resetFields();
		},
		onError: (error) => {
			console.error('Error creating product:', error);
			Swal.fire({
				title: 'Error!',
				text: 'There was an error creating the product.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const { mutate: mutateDeleteProduct } = useMutation({
		mutationFn: async (id: string) => {
			await deleteProduct(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['productList'] });
			Swal.fire({
				title: 'Deleted!',
				text: 'Product has been deleted successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		},
		onError: (error) => {
			console.error('Error deleting product:', error);
			Swal.fire({
				title: 'Error!',
				text: 'There was an error deleting the product.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const { mutate: mutateUpdateProduct } = useMutation({
		mutationFn: async (productData: { id: string; productDetails: FormData }) => {
			const response = await updateProduct(productData);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['productList'] });
			Swal.fire({
				title: 'Success!',
				text: 'Product updated successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			setIsModalVisible(false);
			form.resetFields();
		},
		onError: (error) => {
			console.error('Error updating product:', error);
			Swal.fire({
				title: 'Error!',
				text: 'There was an error updating the product.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const handleEdit = (product: Product) => {
		setIsAddMode(false);
		setEditingProduct(product);
		form.setFieldsValue({
			...product,
			imageUrls: product.imageUrls[0],
		});
		setIsModalVisible(true);
	};

	const handleDelete = (id: string) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this product?',
			onOk() {
				mutateDeleteProduct(id);
			},
		});
	};

	const handleAdd = () => {
		setIsAddMode(true);
		form.resetFields();
		setIsModalVisible(true);
	};

	const handleOk = () => {
		form.validateFields().then((values) => {
			setLoading(true);

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

			if (isAddMode) {
				mutateCreateProduct(formData, {
					onSettled: () => {
						setLoading(false);
					},
				});
			} else if (editingProduct) {
				mutateUpdateProduct(
					{ id: editingProduct._id, productDetails: formData },
					{
						onSettled: () => {
							setLoading(false);
						},
					}
				);
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
				confirmLoading={loading}
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
					<Form.Item
						name='size'
						label='Size'
						rules={[{ required: true, message: 'Please select at least one size!' }]}
					>
						<Checkbox.Group>
							<Row>
								<Col span={6}>
									<Checkbox value='S'>S</Checkbox>
								</Col>
								<Col span={6}>
									<Checkbox value='M'>M</Checkbox>
								</Col>
								<Col span={6}>
									<Checkbox value='L'>L</Checkbox>
								</Col>
								<Col span={6}>
									<Checkbox value='XL'>XL</Checkbox>
								</Col>
							</Row>
						</Checkbox.Group>
					</Form.Item>
					<Form.Item name='image' label='Product Image'>
						{editingProduct && editingProduct.imageUrls && (
							<div>
								<p>Current Image:</p>
								<Image
									src={editingProduct.imageUrls[0]}
									width={100}
									height={100}
									alt='Current product image'
								/>
							</div>
						)}
						<input type='file' multiple />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default ProductPage;
