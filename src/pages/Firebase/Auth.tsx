import React, { useReducer, useEffect } from 'react'
import AuthContext from '../../lib/AuthContext'
import authReducer from '../../lib/authReducer'
import { listenAuthState } from '../../lib/firebase'
import AuthPage from '../../components/AuthPage'

export const AuthContainer = () => {
  const [state, dispatch] = useReducer(
    authReducer.reducer,
    authReducer.initialState
  )
  useEffect(() => {
    return listenAuthState(dispatch)
  }, [])
  return (
    <AuthContext.Provider value={state}>
      <AuthPage />
    </AuthContext.Provider>
  )
}

export default AuthContainer
