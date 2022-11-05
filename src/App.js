import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/router';

function App() {
	return (
		<div className='w-11/12 mx-auto'>
			<Toaster />
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
