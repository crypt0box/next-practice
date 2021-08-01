import { Box, Button } from '@chakra-ui/react';

export default function Freedom() {
  return (
    <>
     {/* <Button>ボタン</Button> */}
     <Box w='100px' fontWeight="bold" textAlign="center" rounded="5px" bgColor={'red.300'} _hover={{ bgColor: 'red.400', cursor: 'pointer' }}>ボタン</Box>
     <Button bgColor={'green.300'}>ボタン</Button>
    </>
  )
}
{/* <Box w='100px' fontWeight='bold' textAlign="center" rounded='10px' bgColor={'red.300'} _hover={{ bgColor: 'red.400', cursor: 'pointer'}}>ボタン</Box>
<Box mt='10px' w='100px' textAlign="center" rounded='10px' bgColor={'blue.300'} _hover={{ bgColor: 'blue.400', cursor: 'pointer'}}>ボタン</Box>
<Button>ボタン</Button> */}