import React from 'react';
import { useLoaderData } from 'react-router-dom';
import EventCard from './EventCard';

const Home = () => {
	const events = useLoaderData();
	return (
		<div className='grid grid-cols-4 gap-10 h-full'>
			{events.map((singleEvent) => (
				<EventCard key={singleEvent._id} singleEvent={singleEvent} />
			))}
		</div>
	);
};

export default Home;
