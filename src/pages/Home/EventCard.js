import React from 'react';

const EventCard = ({singleEvent}) => {
	const { _id, title, img } = singleEvent;
	return (
		<div className='card card-compact bg-base-100 shadow-xl h-full'>
			<figure className='h-80'>
				<img src={img} className='h-full w-full object-cover' alt='Shoes' />
			</figure>
			<div className='card-body justify-between'>
				<h2 className='card-title'>{title}</h2>
				<div className='card-actions justify-end'>
					<button className='btn btn-primary btn-block'>Join Now</button>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
