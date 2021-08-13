import Link from 'next/link'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'

export default function Chakra() {
  return (
    <Flex justifyContent="center">
      <Box>
        <Heading>
          Welcome to Firebase !
        </Heading>

        <Box>
          Get started by editing{' '}
          <Text backgroundColor="gray.100">pages/Firebase/index.tsx</Text>
        </Box>

        <Box p="10px" mt="10px" border="1px" borderRadius="5px">
          <Link href="/Firebase/CloudStorage">
            <a>
              <h2>CloudStorage &rarr;</h2>
              <p>I wana be meccha tuyoi enginya</p>
            </a>
          </Link>
        </Box>
      </Box>
    </Flex>
  )
}
