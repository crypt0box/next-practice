import { Login, Logout, auth } from '../lib/firebase'
import { Box, Text, Button, Heading } from '@chakra-ui/react'

export const AuthPage = () => (
  <Box>
    <Heading>Hello Next.js 👋</Heading>
    <Box>
      <Button onClick={() => Login()}>ログイン</Button>
      <Button onClick={() => Logout()}>ログアウト</Button>
    </Box>
    <Box>
      <pre>
        {auth.currentUser
          ? auth.currentUser.displayName + 'でログインしています'
          : 'ログインしていません'}
      </pre>
    </Box>
    <Box>
      {auth.currentUser && <Text>ログインしてるとこの文章が見れるよ！よかったな</Text>}
    </Box>
  </Box>
)

export default AuthPage
