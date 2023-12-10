import { useReducer } from "react"
import axios from "axios"
import bcrypt from "bcryptjs"
import { FirebaseContext } from "./firebaseContext"
import { firebaseReducer } from "./firebaseReducer"
import { ADD_NOTE, ADD_USER, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER, FETCH_USERS } from "../types"

const url = process.env.REACT_APP_DB_URL

export const FirebaseState = ({children}) => {
	const initialState = {
		notes: [],
		users: [],
		loading: false
	}
	const [state, dispatch] = useReducer(firebaseReducer, initialState)
	const showLoader = () => dispatch({type: SHOW_LOADER})
	
	const fetchNotes = async () => {
		try {
			showLoader()
			const res = await axios.get(`${url}/notes.json`)
			const payload = Object.keys(res.data || {}).map(key => {
				return {
					...res.data[key],
					id: key
				}
			})
			dispatch({type: FETCH_NOTES, payload})
		} catch (error) {
			console.log(error);
		}
	}

	const addNote = async (title, id) => {
		const dateNow = new Date().toString()
		let date = dateNow.split(' ').slice(0,5).join(' ')

		const note = {
			title,
			owner: id,
			date
		}
		try {
			const res = await axios.post(`${url}/notes.json`, note)
			const payload = {
				...note,
				id: res.data.name
			}
			dispatch({type: ADD_NOTE, payload})
		} catch (e) {
			throw new Error(e.message)
		}
	}

	const fetchUsers = async () => {
		try {
			showLoader()
			const res = await axios.get(`${url}/users.json`)
			const payload = Object.keys(res.data || {}).map(key => {
				return {
					...res.data[key],
					id: key
				}
			})
			dispatch({type: FETCH_USERS, payload})
		} catch (error) {
			console.log(error);
		}
	}

	const addUser = async (email, password) => {
		const hashedPassword = await bcrypt.hash(password, 12)
		const user = {
			email,
			password: hashedPassword
		}
		try {
			const res = await axios.post(`${url}/users.json`, user)
			const payload = {
				...user,
				id: res.data.name
			}
			dispatch({type: ADD_USER, payload})
		} catch (e) {
			throw new Error(e.message)
		}
	}

	const removeNote = async id => {
		await axios.delete(`${url}/notes/${id}.json`)
		dispatch({
			type: REMOVE_NOTE,
			payload: id
		})
	}

	return (
		<FirebaseContext.Provider value={{
			fetchNotes, addNote, showLoader, removeNote, addUser, fetchUsers,
			loading: state.loading,
			notes: state.notes,
			users: state.users
		}}>
			{children}
		</FirebaseContext.Provider>
	)
}