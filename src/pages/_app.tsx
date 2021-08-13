import React, { useReducer, useEffect } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import AuthContext from '../lib/AuthContext'
import authReducer from '../lib/authReducer'
import { listenAuthState, auth } from '../lib/firebase'
import Layout from '../components/Layout'

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const [state, dispatch] = useReducer(
    authReducer.reducer,
    authReducer.initialState
  )
  useEffect(() => {
    if (!auth.currentUser) {
      router.push('/login')
    }
    return listenAuthState(dispatch)
  }, [])
  return (
    <ChakraProvider>
      <AuthContext.Provider value={state}>
        {router.pathname === '/login' ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </AuthContext.Provider>
    </ChakraProvider>
  )
}
