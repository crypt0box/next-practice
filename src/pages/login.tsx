import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { Login, Logout, auth } from '../lib/firebase'
import { Box, Button, Heading, Text } from '@chakra-ui/react'

const LoginPage = () => {
  const router = useRouter()
  
  useEffect(() => {
    if (!auth.currentUser) return
    router.push('/')
  }, [auth.currentUser])

  return (
    <Box>
      <Heading>Hello Next.js 👋</Heading>
      <Box>
        <Button onClick={() => Login()}>ログイン</Button>
      </Box>
      <Box>
        <pre>
          {auth.currentUser
            ? auth.currentUser.displayName + 'でログインしています'
            : 'ログインしていません'}
        </pre>
      </Box>
      <Box>
        {auth.currentUser && (
          <Text>ログインしてるとこの文章が見れるよ！よかったな</Text>
        )}
      </Box>
    </Box>
  )
}

export default LoginPage
