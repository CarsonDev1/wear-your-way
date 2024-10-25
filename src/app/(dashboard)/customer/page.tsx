'use client';
import React, { useState } from 'react';
import { Card, Table, Button, Space, Modal, Form, Input, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Account } from '@/app/types/Account.type';
import Swal from 'sweetalert2';
import Image from 'next/image';
import './customer.scss';
import { getAccounts } from '@/app/apis/user/getAccounts';
import { deleteAccount } from '@/app/apis/user/deleteAccount';
import { updateAccount } from '@/app/apis/user/updateAcount';

const Customer: React.FC = () => {
	const queryClient = useQueryClient();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [editingAccount, setEditingAccount] = useState<Account | null>(null);
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();

	const columns = [
		{
			title: 'Username',
			dataIndex: 'username',
			key: 'username',
		},
		{
			title: 'Email',
			dataIndex: 'email',
			key: 'email',
		},
		{
			title: 'Phone Number',
			dataIndex: 'phone_number',
			key: 'phone_number',
		},
		{
			title: 'Avatar',
			dataIndex: 'avatar',
			key: 'avatar',
			render: (avatar: string | undefined) =>
				avatar ? (
					<Image src={avatar} width={50} height={50} alt='Avatar' style={{ width: '50px' }} />
				) : (
					'No avatar'
				),
		},
		{
			title: 'Company',
			dataIndex: 'company',
			key: 'company',
			render: (company: string | undefined) => company || 'No company',
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address',
			render: (address: string | undefined) => address || 'No address',
		},
		{
			title: 'Role',
			dataIndex: 'role',
			key: 'role',
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (text: string, record: Account) => (
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
		data: accountList,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['accountList'],
		queryFn: () => getAccounts(),
	});

	const { mutate: mutateDeleteAccount } = useMutation({
		mutationFn: async (id: string) => {
			await deleteAccount(id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['accountList'] });
			Swal.fire({
				title: 'Deleted!',
				text: 'Account has been deleted successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
		},
		onError: (error) => {
			console.error('Error deleting account:', error);
			Swal.fire({
				title: 'Error!',
				text: 'There was an error deleting the account.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const { mutate: mutateUpdateAccount } = useMutation({
		mutationFn: async (accountData: { id: string; accountDetails: FormData }) => {
			const response = await updateAccount(accountData);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['accountList'] });

			Swal.fire({
				title: 'Success!',
				text: 'Account updated successfully.',
				icon: 'success',
				confirmButtonText: 'OK',
			});
			setIsModalVisible(false);
			form.resetFields();
		},
		onError: (error) => {
			console.error('Error updating account:', error);
			Swal.fire({
				title: 'Error!',
				text: 'There was an error updating the account.',
				icon: 'error',
				confirmButtonText: 'OK',
			});
		},
	});

	const handleEdit = (account: Account) => {
		setEditingAccount(account);
		form.setFieldsValue({
			...account,
		});
		setIsModalVisible(true);
	};

	const handleDelete = (id: string) => {
		Modal.confirm({
			title: 'Are you sure you want to delete this account?',
			onOk() {
				mutateDeleteAccount(id);
			},
		});
	};

	const handleOk = () => {
		form.validateFields().then((values) => {
			setLoading(true);

			const { username, email, phone_number, company, address, role } = values;
			const formData = new FormData();

			formData.append('username', username);
			formData.append('email', email);
			formData.append('phone_number', phone_number);
			formData.append('company', company || '');
			formData.append('address', address || '');
			formData.append('role', role);

			const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
			if (fileInput?.files) {
				Array.from(fileInput.files).forEach((file) => {
					formData.append('avatar', file);
				});
			}

			if (editingAccount) {
				mutateUpdateAccount(
					{ id: editingAccount._id, accountDetails: formData },
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

	if (isLoading)
		return (
			<div className='loading-spinner'>
				<Spin size='large' />
			</div>
		);
	if (error) return <div>Error fetching accounts...</div>;

	return (
		<div className='account-page'>
			<Card title='Account Management' className='Account-card'>
				<Table
					columns={columns}
					dataSource={Array.isArray(accountList) ? accountList : []}
					rowKey='_id'
					scroll={{ x: 800 }}
				/>
			</Card>

			<Modal
				title='Edit Account'
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				confirmLoading={loading}
			>
				<Form form={form} layout='vertical'>
					<Form.Item
						name='username'
						label='Username'
						rules={[{ required: true, message: 'Please input the username!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='email'
						label='Email'
						rules={[{ required: true, message: 'Please input the email!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						name='phone_number'
						label='Phone Number'
						rules={[{ required: true, message: 'Please input the phone number!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item name='company' label='Company'>
						<Input />
					</Form.Item>
					<Form.Item name='address' label='Address'>
						<Input />
					</Form.Item>
					<Form.Item name='avatar' label='Avatar'>
						{editingAccount && editingAccount.avatar && (
							<div>
								<p>Current Avatar:</p>
								<Image
									src={editingAccount.avatar}
									width={100}
									height={100}
									alt='Current account avatar'
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

export default Customer;
