const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv')

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI; // Replace with your MongoDB connection string

// Connect to MongoDB database
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    const db = client.db("db"); // Replace "db" with your database name
    const collection = db.collection("cards"); // Replace "cards" with your collection name

    // Serve static files from the frontend directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Middleware for body parsing
    app.use(bodyParser.json());

    // Search endpoint to fetch cards based on query
    app.get('/search', async (req, res) => {
      const { name, cardtype, type, attribute } = req.query; // Extract search parameters
      const query = {};

      if (name) query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
      if (cardtype) query.cardtype = cardtype;
      if (type) query.type = type;
      if (attribute) query.attribute = attribute;

      try {
        const results = await collection.find(query).toArray();
        res.json(results);
      } catch (err) {
        console.error(err);
        res.status(500).send('Error searching database');
      }
    });

    // Serve the Vue app
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    // Start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });