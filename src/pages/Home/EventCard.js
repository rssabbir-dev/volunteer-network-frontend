import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ singleEvent, joined }) => {
	const [exit, setExit] = useState(false);
	useEffect(() => {
		if (joined.length) {
			const findIsExit = joined.find(
				(j) => j.program_id === singleEvent._id
			);
			setExit(findIsExit);
		}
	},[exit, joined, singleEvent._id])
	const { _id, title, img } = singleEvent;
	return (
		<div className='card card-compact bg-base-100 shadow-xl h-full'>
			<figure className='h-80'>
				<img
					src={img}
					className='h-full w-full object-cover'
					alt='Shoes'
				/>
			</figure>
			<div className='card-body justify-between'>
				<h2 className='card-title'>{title}</h2>
				<div className='card-actions justify-end'>
					<Link to={`/events/${_id}`}>
						<button
							className={`btn btn-block ${
								exit ? 'btn-warning' : 'btn-primary'
							}`}
						>
							{exit ? 'Already Joined' : 'Join Now'}
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
