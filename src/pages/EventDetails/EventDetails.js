import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const EventDetails = () => {
	const { title, img, _id } = useLoaderData();
	const { user,logOut } = useContext(AuthContext);
	const [joined, setJoined] = useState({});
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const address = form.address.value;
		const joinedPerson = {
			name: user.displayName,
			email: user.email,
			address: address,
			user_uid: user.uid,
			program_name: title,
			program_img: img,
			program_id: _id,
		};
		postJoinedData(joinedPerson);
	};
	const postJoinedData = (joinedPerson) => {
		fetch('http://localhost:5000/joined', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(joinedPerson),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	};
	useEffect(() => {
		fetch(`http://localhost:5000/joined?uid=${user?.uid}`, {
			headers: {
				authorization: `Bearer ${localStorage.getItem(
					'volunteer-token'
				)}`,
			},
		})
			.then((res) => {
				if (res.status === 401 || res.status === 403) {
					return logOut().then(() => {
						toast.error('Session Expired, Please Login Again');
					});
				}
				return res.json();
			})
			.then((data) => {
				const exit = data.find(j => j.program_id === _id)
				if (exit === undefined) {
					return setJoined({})
				}
				setJoined(exit);
				console.log(exit);
			});
	}, [_id, logOut, user?.uid]);
	return (
		<div className='space-y-5'>
			<div className='grid place-content-center'>
				<h1 className='text-3xl font-bold'>Join Today</h1>
				<div className='divider text-center'></div>
			</div>
			<div className='hero'>
				<div className='hero-content flex-col gap-20 lg:flex-row-reverse'>
					<div className='text-center lg:text-left w-96'>
						<img src={img} alt='' />
						<h1 className='text-4xl'>{title}</h1>
					</div>
					<div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
						<form onSubmit={handleSubmit} className='card-body'>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>
										Full Name
									</span>
								</label>
								<input
									name='name'
									type='text'
									placeholder='name'
									className='input input-bordered'
									defaultValue={user?.displayName}
									disabled
								/>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Email</span>
								</label>
								<input
									name='email'
									type='text'
									placeholder='email'
									className='input input-bordered'
									defaultValue={user?.email}
									disabled
								/>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Address</span>
								</label>
								<input
									name='address'
									type='text'
									placeholder='Address'
									className='input input-bordered'
									defaultValue={joined?.address}
									disabled={Object.keys(joined).length}
								/>
							</div>
							<div className='form-control mt-6'>
								<button
									disabled={Object.keys(joined).length}
									className='btn btn-primary'
								>
									{Object.keys(joined).length
										? 'Already Joined'
										: 'Join Now'}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EventDetails;
