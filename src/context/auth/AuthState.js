import { useReducer } from "react"
import { LOGIN_USER, LOGOUT_USER } from "../types"
import { AuthContext } from "./authContext"
import { authReducer } from "./authReducer"

const storageName = process.env.REACT_APP_DB_STORAGE_NAME

export const AuthState = ({children}) => {
	const initialState = {
		userId: null,
		isAuthenticated: false
	}
	const [state, dispatch] = useReducer(authReducer, initialState)
	const login = (id) => {
		dispatch({
			type: LOGIN_USER,
			payload: {userId: id, isAuthenticated: true}
		})
	}
	const logout = () => {
		localStorage.removeItem(storageName)
		dispatch({
			type: LOGOUT_USER,
			payload: {userId: null, isAuthenticated: false}
		})
	}

	return (
		<AuthContext.Provider value={{
			login, logout,
			token: state.token,
			userId: state.userId,
			isAuthenticated: state.isAuthenticated
		}}>
			{children}
		</AuthContext.Provider>
	)
}