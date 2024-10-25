'use client';
import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Select, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { getOrders } from '@/app/api/cart/getOrder';
import { updateOrderStatus } from '@/app/api/cart/updateOrder';
import { deleteOrder } from '@/app/api/cart/deleteOrder';
import './orders.scss';

interface OrderProduct {
	product: {
		name: string;
		price: number;
	};
	quantity: number;
}

interface Order {
	_id: string;
	customerName: string;
	customerAddress: string;
	customerPhone: string;
	totalPrice: number;
	status: string;
	products: OrderProduct[];
	createdAt: string;
}

const statusOptions = ['pending', 'shipped', 'delivered', 'canceled'];

const OrderManagement: React.FC = () => {
	const queryClient = useQueryClient();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingOrder, setEditingOrder] = useState<Order | null>(null);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	// Table columns for order display
	const columns = [
		{
			title: 'Customer Name',
			dataIndex: 'customerName',
			key: 'customerName',
		},
		{
			title: 'Customer Address',
			dataIndex: 'customerAddress',
			key: 'customerAddress',
		},
		{
			title: 'Customer Phone',
			dataIndex: 'customerPhone',
			key: 'customerPhone',
		},
		{
			title: 'Total Price',
			dataIndex: 'totalPrice',
			key: 'totalPrice',
			render: (price: number | undefined) => (price ? `${price.toLocaleString()} VND` : 'N/A'),
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Created At',
			dataIndex: 'createdAt',
			key: 'createdAt',
			render: (date: string | undefined) => (date ? new Date(date).toLocaleString() : 'N/A'),
		},
		{
			title: 'Products',
			dataIndex: 'products',
			key: 'products',
			render: (products: OrderProduct[] | undefined) =>
				products && products.length > 0
					? products.map((item) => (
							<div key={item.product.name}>
								<strong>{item.product.name}</strong> - {item.quantity} pcs,{' '}
								{item.product.price ? item.product.price.toLocaleString() : 'N/A'} VND
							</div>
					  ))
					: 'No products',
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (text: string, record: Order) => (
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

	// Fetch orders
	const {
		data: orderList,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['orderList'],
		queryFn: () => getOrders(),
	});

	// Update order status mutation
	const { mutate: mutateUpdateOrderStatus } = useMutation({
		mutationFn: async (orderData: { id: string; status: string }) => updateOrderStatus(orderData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orderList'] });
			Swal.fire({
				title: 'Success!',
				text: 'Order status updated successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			setIsModalVisible(false);
			form.resetFields();
		},
	});

	// Delete order mutation
	const { mutate: mutateDeleteOrder } = useMutation({
		mutationFn: async (id: string) => deleteOrder(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orderList'] });
			Swal.fire({
				title: 'Deleted!',
				text: 'Order has been deleted successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		},
	});

	// Handle editing order status
	const handleEdit = (order: Order) => {
		setEditingOrder(order);
		form.setFieldsValue({
			status: order.status,
		});
		setIsModalVisible(true);
	};

	// Handle deleting order
	const handleDelete = (id: string) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this order?',
			onOk() {
				mutateDeleteOrder(id);
			},
		});
	};

	// Handle form submission for updating status
	const handleOk = () => {
		form.validateFields().then((values) => {
			setLoading(true);
			const { status } = values;

			if (editingOrder) {
				mutateUpdateOrderStatus(
					{ id: editingOrder._id, status },
					{
						onSettled: () => setLoading(false),
					}
				);
			}
		});
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		form.resetFields();
	};

	if (isLoading)
		return (
			<div className='loading-spinner'>
				<Spin size='large' />
			</div>
		);
	if (error) return <div>Error fetching orders...</div>;

	return (
		<div className='order-page'>
			<Card title='Order Management' className='order-card'>
				<Table columns={columns} dataSource={orderList} rowKey='_id' scroll={{ x: 1000 }} />
			</Card>

			<Modal
				title='Edit Order Status'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				confirmLoading={loading}
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						name='status'
						label='Order Status'
						rules={[{ required: true, message: 'Please select the order status!' }]}
					>
						<Select placeholder='Select a status'>
							{statusOptions.map((status) => (
								<Select.Option key={status} value={status}>
									{status.charAt(0).toUpperCase() + status.slice(1)}
								</Select.Option>
							))}
						</Select>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default OrderManagement;
