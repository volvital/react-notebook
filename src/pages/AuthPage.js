import { Fragment, useContext, useEffect } from "react"
import { AuthForm } from "../components/AuthForm"
import { Loader } from "../components/Loader"
import { AuthContext } from "../context/auth/authContext"
import { FirebaseContext } from "../context/firebase/firebaseContext"

const storageName = process.env.REACT_APP_DB_STORAGE_NAME

export const AuthPage = () => {
	const { loading, users, fetchUsers } = useContext(FirebaseContext)
	const { login, logout } = useContext(AuthContext)
	useEffect(() => {
		fetchUsers()
		// eslint-disable-next-line
	}, []) 
	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName))
		const compare = Date.now() - data?.date

		if (compare > 3600000) {
			logout()
		} else if (data) {
			login(data.userId)
		}
		// eslint-disable-next-line
	}, []) 

	return (
		<Fragment>
			<h1 className="text-center text-primary">Note book</h1>
			{ loading
			 ? <Loader />
			 : <div className="card w-50 mx-auto bg-primary">
						<div className="card-body text-light">
							<h4 className="card-title text-center">Authentication</h4>
							<AuthForm users={users} />
						</div>
					</div>
			}
		</Fragment>
	)
}