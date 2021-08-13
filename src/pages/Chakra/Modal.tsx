import { useState } from 'react'
import {
  Box,
  Flex,
  HStack,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
} from '@chakra-ui/react'

export default function Modal() {
  const [selectedItem, setSelectedItem] = useState<string>('')
  const ButtonList = ['Button1', 'Button2', 'Button3', 'Button4', 'Button5']

  const onOpenDialog = (name: string) => {
    if (!name) return
    setSelectedItem(name)
  }

  const onCloseDialog = () => {
    setSelectedItem('')
  }
  return (
    <Flex w="100vw" h="100vh" justifyContent="center">
      <HStack>
        {ButtonList.map((item) => {
          return (
            <Box key={item}>
              <Button onClick={() => onOpenDialog(item)}>{item}</Button>
              <AlertDialog
                isOpen={item === selectedItem}
                onClose={onCloseDialog}
                leastDestructiveRef={undefined}
                autoFocus={false}
                isCentered
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogBody>{item}</AlertDialogBody>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            </Box>
          )
        })}
      </HStack>
    </Flex>
  )
}
