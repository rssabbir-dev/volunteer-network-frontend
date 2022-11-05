import { createBrowserRouter } from 'react-router-dom';
import Admin from '../layout/Admin';
import Main from '../layout/Main';
import AddEvent from '../pages/Admin/AddEvent/AddEvent';
import VolunteerList from '../pages/Admin/VolunteerList/VolunteerList';
import Login from '../pages/AuthManager/Login';
import Registration from '../pages/AuthManager/Registration';
import Home from '../pages/Home/Home';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		children: [
			{
				path: '/',
				element: <Home />,
				loader: () => fetch('http://localhost:5000/events'),
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/registration',
				element: <Registration />,
			},
		],
	},
	{
		path: '/admin',
		element: <Admin />,
		children: [
			{
				path: '/admin',
				element: <VolunteerList />,
			},
			{
				path: '/admin/add-event',
				element: <AddEvent />,
			},
		],
	},
]);
