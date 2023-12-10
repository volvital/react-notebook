import { LOGIN_USER, LOGOUT_USER } from "../types"

const handlers = {
  [LOGIN_USER]: (state, {payload}) => ({ ...payload }),
  [LOGOUT_USER]: (state, {payload}) => ({ ...payload }),
  DEFAULT: state => state
}

export const authReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT
  return handle(state, action)
}