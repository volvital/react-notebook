import { useContext, useState, useEffect, useRef } from "react"
import { AlertContext } from "../context/alert/alertContext"
import { AuthContext } from "../context/auth/authContext"
import { FirebaseContext } from "../context/firebase/firebaseContext"

export const Form = () => {
	const [value, setValue] = useState('')
	const alert = useContext(AlertContext)
	const firebase = useContext(FirebaseContext)
	const { userId } = useContext(AuthContext)
	const inputRef = useRef(null)

	useEffect(() => {
    const input = inputRef.current;
    input.select();
  }, []);

	const submitHandler = event => {
		event.preventDefault();
		if (value.trim()) {
			// eslint-disable-next-line
			firebase.addNote(value.trim(), userId).
			then(() => {
				alert.show('Note created!', 'success')
				// eslint-disable-next-line
			}).
			catch(() => {
				alert.show('Something wrong!', 'danger')
			})			
			setValue('')
		} else {
			alert.show('Enter note title!')
		}
	}

	return (
		<form onSubmit={submitHandler}>
			<div className="form-group">
				<input
					type="text"
					name="title"
					className="form-control"
					ref={inputRef}
					placeholder="Enter title"
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
			</div>
		</form>
	)
}