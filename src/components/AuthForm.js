import { useContext, useState } from "react"
import { AlertContext } from "../context/alert/alertContext"
import { FirebaseContext } from "../context/firebase/firebaseContext"
import { AuthContext } from "../context/auth/authContext"
import bcrypt from "bcryptjs"

const storageName = process.env.REACT_APP_DB_STORAGE_NAME

export const AuthForm = ({users}) => {
	const { login } = useContext(AuthContext)
	const alert = useContext(AlertContext)
	const firebase = useContext(FirebaseContext)
	const [form, setForm] = useState({
		email: '', password: ''
	})
	
	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value })
	}

	const registerHandler = event => {
		event.preventDefault();
		if (form.email.trim() && form.password.trim()) {
			try {
				const candidate = users.find(item => item.email === form.email)
				if (candidate) {
					alert.show('User already exist!', 'danger')
				} else {
					firebase.addUser(form.email, form.password)
					alert.show('User created!', 'success')
				}				
			}
			catch {
				alert.show('Something wrong!', 'danger')
			}		
		} else {
			alert.show('Fill out the form!')
		}
		setForm({
			email: '', password: ''
		})
	}

	const loginHandler = async (event) => {
		event.preventDefault()
		if (form.email.trim() && form.password.trim()) {
			try {
				const candidate = users.find(item => item.email === form.email)
				if (!candidate) {
					alert.show('You are not registered!', 'danger')
				} else {
					const isMatch = await bcrypt.compare(form.password, candidate.password)
					if(isMatch) {
						login(candidate.id)
						const date = Date.now()
						localStorage.setItem(storageName, JSON.stringify({
							date, userId: candidate.id
						}))
						alert.show('Login is successful', 'success')
					} else {
						alert.show('Incorrect password, try again!', 'danger')
					}
				}				
			}
			catch {
				alert.show('Something wrong!', 'danger')
			}		
		} else {
			alert.show('Fill out the form!')
		}
		setForm({
			email: '', password: ''
		})
	}

	return (
		<form>
			<div className="mb-3">
				<label htmlFor="inputEmail" className="form-label">Email</label>
				<input 
					type="email" 
					className="form-control" 
					id="inputEmail"
					name="email"
					value={form.email}
					onChange={changeHandler} />
			</div>
			<div className="mb-3">
				<label htmlFor="inputPassword" className="form-label">Password</label>
				<input 
					type="password" 
					className="form-control" 
					id="inputPassword" 
					name="password"
					value={form.password}
					onChange={changeHandler} />
			</div>
			<div className="card-action">
				<button 
					type="submit" 
					className="btn btn-success" 
					style={{marginRight: 10, marginBottom: 10}}
					onClick={loginHandler}
					>Login
				</button>
				<button 
					type="submit" 
					className="btn btn-warning"
					style={{marginBottom: 10}}
					onClick={registerHandler}
					>Registration
				</button>
			</div>
		</form>
	)
}