import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import sideImg from '../../assets/images/extraVolunteer.png';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Registration = () => {
	const navigate = useNavigate();
	const { createUser, verifyEmail, updateUserProfile } =
		useContext(AuthContext);
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		handleRegistration(name, email, password);
	};
	const handleRegistration = (name, email, password) => {
		createUser(email, password)
			.then((res) => {
				const user = res.user;
				toast.success('Registration Success');
				handleUpdateUserProfile(name);
				handleVerifyEmail();
				navigate('/login');
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			});
	};

	const handleVerifyEmail = () => {
		verifyEmail()
			.then(() => {
				toast.success(
					'Please Verify Your Email Now, Check Inbox or Span Folder'
				);
			})
			.catch((err) => {
				toast.error(err.message);
			});
	};

	const handleUpdateUserProfile = (name, photoURL) => {
		const profileData = { displayName: name, photoURL: photoURL };
		updateUserProfile(profileData)
			.then(() => {})
			.catch((err) => console.log(err));
	};
	return (
		<div className='space-y-5'>
			<div className='grid place-content-center'>
				<h1 className='text-3xl font-bold'>Registration</h1>
				<div className='divider text-center'></div>
			</div>
			<div className='hero'>
				<div className='hero-content flex-col gap-20 lg:flex-row-reverse'>
					<div className='text-center lg:text-left'>
						<img src={sideImg} alt='' />
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
								/>
							</div>
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Password</span>
								</label>
								<input
									name='password'
									type='text'
									placeholder='password'
									className='input input-bordered'
								/>
							</div>
							<div className='form-control mt-6'>
								<button className='btn btn-primary'>
									Registration
								</button>
								<label className='label text-center'>
									<p href='#' className='label-text-alt'>
										Have an account?{' '}
										<Link
											className='link link-hover'
											to='/login'
										>
											Login Here
										</Link>
									</p>
								</label>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Registration;
