import Image from 'next/image';
import React from 'react';
import TablePrice01 from '@/app/assets/images/table-price/table-pirce-01.png';
import TablePrice02 from '@/app/assets/images/table-price/table-pirce-02.png';
import TablePrice03 from '@/app/assets/images/table-price/table-pirce-03.png';
import TablePrice04 from '@/app/assets/images/table-price/table-pirce-04.png';
import TablePrice05 from '@/app/assets/images/table-price/table-pirce-05.png';
import TablePrice06 from '@/app/assets/images/table-price/table-pirce-06.png';
import Content01 from '@/app/assets/images/table-price/content-01.png';
import Content02 from '@/app/assets/images/table-price/content-02.png';
import Content03 from '@/app/assets/images/table-price/content-03.png';
import './table-price.scss';

const TablePrice = () => {
	return (
		<div className='table-price'>
			<div className='sec-com'>
				<div className='container'>
					<div className='table-price-wrap'>
						<h3 className='sec-com-tt'>Áo thun</h3>
						<div className='table-price-wrap-list'>
							<Image src={TablePrice01} alt='table-price-01' />
							<Image src={TablePrice02} alt='table-price-02' />
							<Image src={TablePrice03} alt='table-price-03' />
						</div>
						<h3 className='sec-com-tt'>Áo Polo</h3>
						<div className='table-price-wrap-list'>
							<Image src={TablePrice04} alt='table-price-04' />
							<Image src={TablePrice01} alt='table-price-05' />
						</div>
						<div className='table-price-wrap-list-item'>
							<Image src={TablePrice05} alt='table-price-05' />
						</div>
						<div className='table-price-wrap-list-item'>
							<Image src={TablePrice06} alt='table-price-06' />
						</div>
						<h3 className='sec-com-tt'>Mực in</h3>
						<div className='table-price-wrap-list-item'>
							<Image src={Content01} alt='content-01' />
						</div>
						<div className='table-price-wrap-list-item'>
							<Image src={Content02} alt='content-02' />
						</div>
						<div className='table-price-wrap-list-item'>
							<Image src={Content03} alt='content-03' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TablePrice;
