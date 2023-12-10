import { ADD_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER, ADD_USER, FETCH_USERS } from "../types"

const handlers = {
	[SHOW_LOADER]: state => ({...state, loading: true}),
	[ADD_NOTE]: (state, {payload}) => ({
		...state,
		notes: [...state.notes, payload]
	}),
	[FETCH_NOTES]: (state, {payload}) => ({...state, notes: payload, loading: false}),
	[REMOVE_NOTE]: (state, {payload}) => ({
		...state,
		notes: state.notes.filter(note => note.id !== payload)
	}),
	[ADD_USER]: (state, {payload}) => ({
		...state,
		users: [...state.users, payload]
	}),
	[FETCH_USERS]: (state, {payload}) => ({...state, users: payload, loading: false}),
  DEFAULT: state => state
}

export const firebaseReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}