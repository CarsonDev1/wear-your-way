import React from 'react';
import PostItem from '@/app/pages/posts/post-item';
import './posts.scss';

const Post = () => {
	return (
		<div className='posts'>
			<div className='sec-com'>
				<div className='container'>
					<div className='posts-wrap'>
						<PostItem />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
