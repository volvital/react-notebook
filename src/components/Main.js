import { BrowserRouter } from 'react-router-dom'
import { Navbar } from './Navbar';
import { Alert } from './Alert';
import { useRoutes } from '../routes';
import { AuthContext } from '../context/auth/authContext';
import { useContext } from 'react';

export const Main = () => {
	const { isAuthenticated } = useContext(AuthContext)
	const routes = useRoutes(isAuthenticated)
	return (
		<BrowserRouter>
			{ isAuthenticated && <Navbar />}	
			<div className="container pt-4">
				<Alert />
				{ routes }
			</div>
		</BrowserRouter>
	)
}