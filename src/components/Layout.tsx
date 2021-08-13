import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Logout, auth } from '../lib/firebase'
import { Flex, Box, Button } from '@chakra-ui/react'

type Props = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: ReactNode
}

const Layout = ({ children, ...props }: Props) => {
  const router = useRouter()
  const gotoLogin = () => {
    router.push('/login')
  }
  return (
    <>
      <Flex
        as="header"
        position="fixed"
        top={0}
        width="full"
        shadow="sm"
        py={4}
        px={8}
        zIndex="999"
      >
        {auth.currentUser ? (
          <Box>
            <Button onClick={() => Logout()}>ログアウト</Button>
          </Box>
        ) : (
          <Box>
            <Button onClick={gotoLogin}>ログイン</Button>
          </Box>
        )}
      </Flex>
      <Box width="100%" mt={'6rem'} {...props}>
        {children}
      </Box>
    </>
  )
}

export default Layout
