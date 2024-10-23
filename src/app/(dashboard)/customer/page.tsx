'use client';
import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './customer.scss';

interface User {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: string;
}

const Customer: React.FC = () => {
	const [users, setUsers] = useState<User[]>([
		{ id: 1, name: 'Mỹ Lan', email: 'mylan@example.com', phone: '0123456789', role: 'Admin' },
		{ id: 2, name: 'Minh Trần', email: 'minhtran@example.com', phone: '0987654321', role: 'User' },
		{ id: 3, name: 'Tường Vũ', email: 'tuongvu@example.com', phone: '0369852147', role: 'User' },
	]);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [form] = Form.useForm();

	const columns = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Phone',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (text: string, record: User) => (
				<Space size='middle'>
					<Button type='primary' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
						Edit
					</Button>
					<Button type='primary' danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)}>
						Delete
					</Button>
				</Space>
			),
		},
	];

	const handleEdit = (user: User) => {
		setEditingUser(user);
		form.setFieldsValue(user);
		setIsModalVisible(true);
	};

	const handleDelete = (id: number) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this user?',
			onOk() {
				setUsers(users.filter((user) => user.id !== id));
			},
		});
	};

	const handleOk = () => {
		form.validateFields().then((values) => {
			if (editingUser) {
				setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...values } : user)));
			}
			setIsModalVisible(false);
			form.resetFields();
		});
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		form.resetFields();
	};

	return (
		<div className='customer-page'>
			<Card title='Customer Management' className='customer-card'>
				<Table columns={columns} dataSource={users} rowKey='id' />
			</Card>

			<Modal title='Edit User' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
				<Form form={form} layout='vertical'>
					<Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please input the name!' }]}>
						<Input />
					</Form.Item>
					<Form.Item
						name='email'
						label='Email'
						rules={[
							{ required: true, message: 'Please input the email!' },
							{ type: 'email', message: 'Please enter a valid email!' },
						]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='phone'
						label='Phone'
						rules={[{ required: true, message: 'Please input the phone number!' }]}
					>
						<Input />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default Customer;
