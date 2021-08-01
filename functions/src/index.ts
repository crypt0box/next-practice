import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
admin.initializeApp()

export const fetchBookInfo = functions.https.onRequest(
  async (request, response) => {
    // GETリクエストじゃない場合
    if (request.method !== 'GET') {
      response.status(400).send('リクエストタイプが不正です')
    }

    // クエリがない場合
    // ※本来はこれに加えてISBN番号の形式ではないものは受け付けないように、バリデーションをする必要があります
    const query = request.query.isbn as string | undefined
    if (query === undefined) {
      response.status(400).send('クエリが不正です')
      return
    }

    try {
      const db = admin.firestore()
      const doc = await db.collection('books').doc(query).get()

      const bookInfo = doc.data()
      console.log('bookInfo', bookInfo)
      response.send(bookInfo)
    } catch (error) {
      console.log(error)
      response.status(500).send(error)
    }
  }
)

export const addBookInfo = functions.https.onRequest(
  async (request, response) => {
    // POSTリクエストじゃない場合
    if (request.method !== 'POST') {
      response.status(400).send('リクエストタイプが不正です')
    }

    // bodyがない場合
    // ※本来はこれに加えて各値の、バリデーションをする必要があります
    const body = request.body
    if (body === undefined) {
      response.status(400).send('bodyの中身が不正です')
    }

    const isbn = Object.keys(body)[0]
    const bookInfo = body[isbn]

    try {
      const db = admin.firestore()
      await db.collection('books').doc(isbn).set({ bookInfo }, { merge: true })

      response.send('Complete')
    } catch (e) {
      console.error(e)
      response.status(500).send(e)
    }
  }
)

// boosコレクションに値が追加されたら、onCreateメソッドが呼び出される
export const onBookCreate = functions.firestore
  .document('books/{isbn}')
  .onCreate(async (snapshot, context) => {
    // 新規追加された値
    const newBookInfo = snapshot.data()

    const isbn = context.params.isbn
    const title = newBookInfo.bookInfo.title
    const price = newBookInfo.bookInfo.price
    const releaseDate = newBookInfo.bookInfo.releaseDate
    console.log(
      `【新着本追加】ISBN: ${isbn}, タイトル: ${title}, 価格: ${price}, 出版日: ${releaseDate}`
    )
  })

// boosコレクションの既存の値が更新されたら、onUpdateメソッドが呼び出される
export const onBookUpdate = functions.firestore
  .document('books/{isbn}')
  .onUpdate(async (change, context) => {
    // 変更前の値
    const before = change.before.data()
    // 変更後の値
    const after = change.after.data()

    console.log(before)
    console.log(after)
  })

// boosコレクションの値が削除されたら、onDeleteメソッドが呼び出される
export const onBookDelete = functions.firestore.document('books/{isbn}').onDelete(async (snapshot, context) => {
  // 削除された値
  const deleteBookInfo = snapshot.data()

  const isbn = context.params.isbn
  const title = deleteBookInfo.bookInfo.title
  const price = deleteBookInfo.bookInfo.price
  const releaseDate = deleteBookInfo.bookInfo.releaseDate
  console.log(`【削除】ISBN: ${isbn}, タイトル: ${title}, 価格: ${price}, 出版日: ${releaseDate}`);
})