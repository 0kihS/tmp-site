const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const uri = ""; // Replace with your URI

app.use(cors({
  origin: 'https://effective-space-broccoli-xgpg7p9766v3pjq7-5173.app.github.dev/', // Replace with your actual frontend URL
  credentials: true, // Allow cookies for authentication
}));

async function connectToDB() {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db("mechanical-mokey-db");
  const cardsCollection = db.collection("cards");
  console.log(cardsCollection);
  return cardsCollection;
}

app.get('/search', async (req, res) => {
  console.log('api call made');
  const { name, level, cardtype, type, attribute, atk, def, set, img, effect, limit } = req.query;
  const searchQuery = {};

 // Build search query based on provided parameters
 if (name) searchQuery.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
 if (level) searchQuery.level = level;
 if (cardtype) searchQuery.cardtype = cardtype;
 if (type) searchQuery.type = type;
 if (attribute) searchQuery.attribute = attribute;
 if (atk) searchQuery.atk = atk;
 if (def) searchQuery.def = def;
 if (set) searchQuery.set = set;
 if (img) searchQuery.img = img;
 if (effect) searchQuery.effect = { $regex: new RegExp(effect, 'i') }; // Case-insensitive search
 if (limit) {
   const numberLimit = parseInt(limit);
   if (!isNaN(numberLimit)) {
     searchQuery.__experimentalLimit = numberLimit; // Use experimental limit parameter
   }
 }

 const cardsCollection = await connectToDB();
 const cards = await cardsCollection.find(searchQuery).toArray();
 res.json(cards);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
