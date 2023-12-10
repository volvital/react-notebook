import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth/authContext'

export const Navbar = () => {
	const navigate = useNavigate()
	const { logout } = useContext(AuthContext)

	const logoutHandler = event => {
		event.preventDefault();
		logout()
		navigate('/')
	}
	return (
		<nav className="navbar navbar-dark navbar-expand-sm bg-primary">
			<div className='container-fluid d-flex'>
				<NavLink
					className="navbar-brand"
					to="/">
					Note book
				</NavLink>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-end" id="navbarNavDarkDropdown">
					<ul className="navbar-nav">
						<li className="nav-item">
							<NavLink
								className="nav-link" 
								to="/"
								>Notes
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link" 
								to="/create"
								>Create
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link" 
								to="/about"
								>About
							</NavLink>
						</li>
						<li className="nav-item">
							<button
								className="nav-link"
								onClick={logoutHandler}
								>Exit
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	)
}