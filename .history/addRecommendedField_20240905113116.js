// addRecommendedField.js
const { MongoClient } = require('mongodb');

async function addRecommendedField() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('bookshelf'); // データベース名を指定
    const books = database.collection('books'); // コレクション名を指定

    // 全てのドキュメントに recommended フィールドを追加
    const result = await books.updateMany(
      {},
      { $set: { recommended: false } } // 既存の全てのドキュメントに recommended フィールドを追加
    );

    console.log(`${result.modifiedCount} documents updated.`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

addRecommendedField();
