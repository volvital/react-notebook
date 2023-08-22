import { useContext, useState } from "react"
import { AlertContext } from "../context/alert/alertContext"
import { FirebaseContext } from "../context/firebase/firebaseContext"

export const Form = () => {
	const [value, setValue] = useState('')
	const alert = useContext(AlertContext)
	const firebase = useContext(FirebaseContext)
	const submitHandler = event => {
		event.preventDefault();
		if (value.trim()) {
			// eslint-disable-next-line
			firebase.addNote(value.trim()).
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
					className="form-control"
					placeholder="Enter title note"
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
			</div>
		</form>
	)
}