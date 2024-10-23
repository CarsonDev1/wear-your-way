'use client';
import React from 'react';
import { Card, Row, Col } from 'antd';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Image from 'next/image';
import Avatar from '@/app/assets/images/dashboard/avt.png';
import './main.scss';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement,
	LineElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const Dashboard: React.FC = () => {
	const weeklyActivityData = {
		labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
		datasets: [
			{
				label: 'Accounts',
				data: [480, 350, 320, 480, 150, 390, 390],
				backgroundColor: '#FFC107',
			},
			{
				label: 'Profit',
				data: [250, 120, 280, 380, 240, 240, 330],
				backgroundColor: '#333333',
			},
		],
	};

	const weeklyActivityOptions = {
		responsive: true,
		scales: {
			x: { stacked: true },
			y: { stacked: true, beginAtZero: true },
		},
		plugins: {
			legend: { position: 'top' as const },
		},
	};

	const expenseData = {
		labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
		datasets: [
			{
				data: [30, 25, 20, 15, 10],
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
			},
		],
	};

	const expenseOptions = {
		responsive: true,
		plugins: {
			legend: { position: 'right' as const },
		},
	};

	const transactionHistoryData = {
		labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
		datasets: [
			{
				label: 'Transaction Amount',
				data: [100, 250, 380, 700, 150, 500, 550],
				borderColor: '#FFC107',
				backgroundColor: 'rgba(255, 193, 7, 0.2)',
				fill: true,
				tension: 0.4,
			},
		],
	};

	const transactionHistoryOptions = {
		responsive: true,
		scales: {
			y: { beginAtZero: true },
		},
		plugins: {
			legend: { display: false },
		},
	};

	return (
		<div className='dashboard'>
			<Row gutter={[16, 16]}>
				<Col span={14}>
					<Card title='Weekly Activity' className='chart-card'>
						<Bar data={weeklyActivityData} options={weeklyActivityOptions} />
					</Card>
				</Col>
				<Col span={10}>
					<Card title='Expense Statistics' className='chart-card'>
						<Pie data={expenseData} options={expenseOptions} />
					</Card>
				</Col>
				<Col span={14}>
					<Card title='Top Transaction' className='chart-card'>
						<div className='top-transaction'>
							<div className='user-list'>
								<div className='user-item'>
									<Image src={Avatar} alt='Mỹ Lan' width={40} height={40} className='user-avatar' />
									<span>Mỹ Lan</span>
								</div>
								<div className='user-item'>
									<Image
										src={Avatar}
										alt='Minh Trần'
										width={40}
										height={40}
										className='user-avatar'
									/>
									<span>Minh Trần</span>
								</div>
								<div className='user-item'>
									<Image src={Avatar} alt='Tường Vũ' width={40} height={40} className='user-avatar' />
									<span>Tường Vũ</span>
								</div>
							</div>
							<div className='amount'>
								<span>Amount</span>
								<strong>5,000,000 đ</strong>
							</div>
						</div>
					</Card>
				</Col>
				<Col span={10}>
					<Card title='Transaction History' className='chart-card'>
						<Line data={transactionHistoryData} options={transactionHistoryOptions} />
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Dashboard;
