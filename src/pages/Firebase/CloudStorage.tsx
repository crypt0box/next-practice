import React, { useState } from 'react'
import { Firebase, storage } from '../../lib/firebase'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Image,
  Button,
} from '@chakra-ui/react'

export type firebaseOnLoadProp = {
  bytesTransferred: number
  totalBytes: number
  // このほかにもmetadata,task,refがある
}

const CloudStorage = () => {
  const [loacalImage, setLocalImage] = useState<string>()
  const [image, setImage] = useState<File>()
  const [imageUrl, setImageUrl] = useState('')
  console.log("CloudStorage -> imageUrl", imageUrl)
  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0]
    const localImageUrl = URL.createObjectURL(imageFile);
    setImage(imageFile)
    setLocalImage(localImageUrl)
  }
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!image) {
      console.log('ファイルが選択されていません')
      return
    }
    // アップロード処理
    const uploadTask = storage.ref(`/images/${image.name}`).put(image)
    uploadTask.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      next,
      error,
      complete
    )
  }
  const next = (snapshot: firebaseOnLoadProp) => {
    // 進行中のsnapshotを得る
    // アップロードの進行度を表示
    const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    console.log(percent + '% done')
    console.log(snapshot)
  }
  const error = (error: any) => {
    // エラーハンドリング
    console.log(error)
  }
  const complete = () => {
    // 完了後の処理
    // 画像表示のため、アップロードした画像のURLを取得
    if (!image) return
    storage
      .ref('images')
      .child(image.name)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setImageUrl(fireBaseUrl)
      })
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
        {loacalImage && <Image src={loacalImage} w="400px" h="360px" objectFit="contain" />}
      </Box>
    </Flex>
  )
}

export default CloudStorage