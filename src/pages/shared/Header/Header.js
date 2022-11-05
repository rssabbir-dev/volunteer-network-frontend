import React from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logos/Group 1329.png';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Header = () => {
	const { user, logOut } = useContext(AuthContext);
	const handleLogOut = () => {
		logOut()
			.then(() => toast.success('Logout success'))
			.catch((err) => toast.error(err));
	};
	const menuList = (
		<>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/'>Donation</Link>
			</li>
			<li>
				<Link to='/'>Events</Link>
			</li>
			<li>
				<Link to='/'>Blog</Link>
			</li>
		</>
	);
	return (
		<div className='navbar bg-base-100'>
			<div className='navbar-start'>
				<div className='dropdown'>
					<label tabIndex={0} className='btn btn-ghost lg:hidden'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52'
					>
						{menuList}
					</ul>
				</div>
				<Link to='/' className='normal-case text-xl'>
					<img className='w-44' src={logo} alt='' />
				</Link>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal p-0'>{menuList}</ul>
			</div>
			<div className='navbar-end'>
				{user?.uid ? (
					<button onClick={handleLogOut} className='btn'>
						Log Out
					</button>
				) : (
					<Link to='/login' className='btn btn-ghost'>
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default Header;
