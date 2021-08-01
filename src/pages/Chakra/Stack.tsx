import { Box, Stack, HStack, VStack, Heading } from '@chakra-ui/react';

export default function StackExample() {
  const sampleText = ['dog🐶', 'cat😸', 'rabbit🐰', 'mouse🐭']
  return (
    <>
      <Heading>Box</Heading>
      <Box>
        {sampleText.map((item, index) => <Box key={index} bg="red.50" p={2}>{item}</Box>)}
      </Box>

      <Heading>Stack</Heading>
      <Stack>
        {sampleText.map((item, index) => <Box key={index} bg="red.50" p={2}>{item}</Box>)}
      </Stack>

      <Heading>HStack</Heading>
      <HStack>
        {sampleText.map((item, index) => <Box key={index} bg="red.50" p={2}>{item}</Box>)}
      </HStack>

      <Heading>VStack</Heading>
      <VStack>
        {sampleText.map((item, index) => <Box key={index} bg="red.50" p={2}>{item}</Box>)}
      </VStack>
    </>
  )
}