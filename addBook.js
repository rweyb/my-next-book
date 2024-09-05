const { MongoClient } = require('mongodb');

// MongoDBの接続URLとデータベース名
const url = 'mongodb://localhost:27017';
const dbName = 'bookshelf'; // データベース名を変更

async function addNewBook() {
  const client = new MongoClient(url);

  try {
    // MongoDBへの接続
    await client.connect();
    console.log('Connected correctly to server');

    const db = client.db(dbName);
    const collection = db.collection('books');

    // 新しい本のデータ
    const newBook = {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 1500,
      publisher: 'Scribner',
      published: new Date('1925-04-10'),
      image: 'https://example.com/gatsby.jpg',
    };

    // データの挿入
    const result = await collection.insertOne(newBook);
    console.log('Book added:', result.insertedId);
  } catch (err) {
    console.error('Error adding book:', err);
  } finally {
    // クライアントの接続を閉じる
    await client.close();
  }
}

addNewBook();
