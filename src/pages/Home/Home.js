import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import EventCard from './EventCard';

const Home = () => {
	const [events, setEvents] = useState([]);
	const { user } = useContext(AuthContext);
	const [joined, setJoined] = useState([]);

	//Pagination
	const [count, setCount] = useState(0);
	const [size, setSize] = useState(10);

	const handleChange = (event) => {
		setSize(event.target.value);
	};
	const pages = Math.ceil(count / size);
	const [page, setPage] = useState(0);
	//Pagination
	useEffect(() => {
		fetch(`http://localhost:5000/joined?uid=${user?.uid}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem(
					'volunteer-token'
				)}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				setJoined(data);
			});
	}, [user?.uid]);
	useEffect(() => {
		fetch(`http://localhost:5000/events?page=${page}&size=${size}`)
			.then((res) => res.json())
			.then((data) => {
				setEvents(data.events);
				setCount(data.count);
			});
	}, [page, size]);
	return (
		<div className='space-y-5'>
			<div className='grid grid-cols-4 gap-10 h-full'>
				{events.map((singleEvent) => (
					<EventCard
						key={singleEvent._id}
						joined={joined}
						singleEvent={singleEvent}
					/>
				))}
			</div>
			<div className='btn-group'>
				{[...Array(pages).keys()].map((number) => (
					<button
						key={number}
						onClick={() => setPage(number)}
						className={`btn ${number === page && 'btn-active'}`}
					>
						{number + 1}
					</button>
				))}
				<select
					defaultValue={size}
					onChange={handleChange}
					className='select select-bordered max-w-xs'
				>
					<option>5</option>
					<option>10</option>
					<option>15</option>
				</select>
			</div>
		</div>
	);
};

export default Home;
