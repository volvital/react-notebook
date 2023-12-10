import { Fragment, useContext, useEffect } from "react";
import { Loader } from "../components/Loader";
import { NotesList } from "../components/NotesList";
import { AuthContext } from "../context/auth/authContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Notes = () => {
	const { userId } = useContext(AuthContext)
	const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext)
	let userNotes = notes.filter(item => item.owner === userId)
	useEffect(() => {
		fetchNotes()
		// eslint-disable-next-line
	}, []) 
	return (
		<Fragment>
			<h1 className="text-center">Notes</h1>
			<br />
			{ loading
			 ? <Loader />
			 : <NotesList notes={userNotes} onRemove={removeNote} />
			}
		</Fragment>
	)
}