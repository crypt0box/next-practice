import React, { useState } from 'react'
import { Firebase, storage, db, auth } from '../../lib/firebase'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Image,
  Button,
  HStack,
} from '@chakra-ui/react'

export type firebaseOnLoadProp = {
  bytesTransferred: number
  totalBytes: number
  // このほかにもmetadata,task,refがある
}

type ImageProps = {
  imageId: string
  imageUrl: string
}

const CloudStorage = () => {
  const [localImageList, setLocalImageList] = useState<ImageProps[]>()
  const [imageList, setImageList] = useState<File[]>()
  const userRef = db.collection('users').doc(`${auth.currentUser?.uid}`)

  const generateKey = (pre: string) => {
    return `${pre}_${new Date().getTime()}`
  }

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const imageFile = event.target.files?.[0]
    const localImage = {
      imageId: generateKey('image'),
      imageUrl: URL.createObjectURL(imageFile),
    }

    if (!imageList) {
      setImageList([imageFile])
    } else {
      setImageList([imageFile, ...imageList])
    }

    if (!localImageList) {
      setLocalImageList([localImage])
    } else {
      setLocalImageList([localImage, ...localImageList])
    }
  }
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!imageList?.length) {
      console.log('ファイルが選択されていません')
      return
    }
    // アップロード処理
    const urls: string[] = []
    imageList?.forEach((image) => {
      if (!auth.currentUser) return
      const uploadTask = storage
        .ref(`/images/${auth.currentUser.uid}/${image.name}`)
        .put(image)
      uploadTask.on(
        Firebase.storage.TaskEvent.STATE_CHANGED,
        next,
        error,
        () => {
          // 完了後の処理
          // 画像表示のため、アップロードした画像のURLを取得
          if (!image || !auth.currentUser) return
          storage
            .ref(`images/${auth.currentUser.uid}`)
            .child(image.name)
            .getDownloadURL()
            .then((fireBaseUrl) => {
              urls.push(fireBaseUrl)
              userRef.set(
                {
                  image: urls,
                },
                { merge: true }
              )
            })
            .catch((error) => {
              console.log('CloudStorage.tsx Error', error)
            })
        }
      )
    })
  }
  const next = (snapshot: firebaseOnLoadProp) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    console.log(percent + '% done')
  }
  const error = (error: any) => {
    // エラーハンドリング
    console.log(error)
  }

  return (
    <Flex w="100vw" h="100vh" justify="center" align="center">
      <Box>
        <Heading>Upload Image</Heading>
        <FormControl backgroundColor="gray.100">
          <FormLabel>Upload</FormLabel>
          <Input hidden type="file" accept="image/*" onChange={handleImage} />
        </FormControl>
        <Button onClick={handleSubmit}>SUBMIT</Button>
        <HStack>
          {localImageList?.length &&
            localImageList.map((localImage) => (
              <Image
                src={localImage.imageUrl}
                key={localImage.imageId}
                w="150px"
                h="150px"
                objectFit="contain"
              />
            ))}
        </HStack>
      </Box>
    </Flex>
  )
}

export default CloudStorage
