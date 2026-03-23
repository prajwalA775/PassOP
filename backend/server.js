const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors')

dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop_mongo';

const app = express()
app.use(cors())
const port = 3000

app.use(bodyParser.json())

client.connect();

app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})

app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    delete password._id;
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.json({ success: true, result: findResult });
})

app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.json({ success: true, result: findResult });
})

app.put('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const { id } = req.body;
  const password = req.body;
  delete password._id; 

  await collection.updateOne(
    { id: id },
    { $set: data }
  );

  res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
