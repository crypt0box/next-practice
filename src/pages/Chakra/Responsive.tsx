import { Box, useMediaQuery } from '@chakra-ui/react';

export default function Responsive() {
  const [isBase, isSm, isMd, isLg] = useMediaQuery([
    '(min-width: 0px)',
    '(min-width: 430px)',
    '(min-width: 768px)',
    '(min-width: 960px)',
  ]);

  if (isLg) {
    return <Box>isLg</Box>
  }

  if (isMd) {
    return <Box>isMd</Box>
  }

  if (isSm) {
    return <Box>isSm</Box>
  }

  if (isBase) {
    return <Box>isBase</Box>
  }

  return <></>

  // return (
  //   <Box width="100%" bg={{ base: 'red.200', sm: 'yellow.200', md: 'green.200', lg: 'blue.200' }}>Hello</Box>
  // );
}

// sm: "30em", // 480px (16pxの場合。以下同)
// md: "48em", // 768px
// lg: "62em", // 992px
// xl: "80em", // 1280px
