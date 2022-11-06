import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import sideImg from '../../assets/images/extraVolunteer.png';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

export const handleJWT = (user) => {
	const currentUser = {
		uid: user.uid,
	};
	fetch('http://localhost:5000/jwt', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(currentUser),
	})
		.then((res) => res.json())
		.then((data) => {
			localStorage.setItem('volunteer-token', data.token);
		});
};
const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const from = location?.state?.from?.pathname || '/';
	const { loginUser,setLoading } = useContext(AuthContext);
	const handleSubmit = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
		handleUserLogin(email, password);
	};
	const handleUserLogin = (email, password) => {
		loginUser(email, password)
			.then((res) => {
				const user = res.user;
				if (!user.emailVerified) {
					toast.error('Verify Email Before login');
				} else {
					toast.success('Login Success');
					handleJWT(user);
					navigate(from, { replace: true });
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error(err.message);
			})
			.finally(() => {
				setLoading(false)
			})
	};

	
	return (
		<div className='space-y-5'>
			<div className='grid place-content-center'>
				<h1 className='text-3xl font-bold'>Login</h1>
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
								<label className='label'>
									<Link
										to='/'
										className='label-text-alt link link-hover'
									>
										Forgot password?
									</Link>
								</label>
							</div>
							<div className='form-control mt-6'>
								<button className='btn btn-primary'>
									Login
								</button>
								<label className='label text-center'>
									<p href='#' className='label-text-alt'>
										Don't have an account?{' '}
										<Link
											className='link link-hover'
											to='/registration'
										>
											Create an account
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

export default Login;
