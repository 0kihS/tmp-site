const cors = require('cors');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();


const app = express();
const uri = process.env.MONGO_URI; // Replace with your URI

app.use(cors({
  origin: 'https://mokeypalace.vercel.app' // Allowed origin
}));

async function connectToDB() {
  const client = await MongoClient.connect(uri);
  const db = client.db("mechanical-mokey-db");
  const cardsCollection = db.collection("cards");
  return cardsCollection;
}

app.get('/search', async (req, res) => {
  const { name, level, cardtype, type, category, attribute, atk, def, set, img, effect, limit, linkArrows, ability } = req.query;
  const searchQuery = {};

 // Build search query based on provided parameters
 if (name) searchQuery.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
 if (level) searchQuery.level = parseInt(level);
 if (cardtype) searchQuery.cardtype = cardtype;

 
 let regexString = "";
 
 if (edtype) {
   regexString += `(?=.*${category})`; 
 }
 
 if (ability) {
   regexString += `(?=.*${ability})`; 
 }
 
 if (type) {
   regexString += `(?=.*${type})`;
 }

 if (type || edtype || ability) {
  searchQuery.type = { $regex: new RegExp(regexString, "i") };
  console.log(searchQuery.type);
 }
 if (attribute) searchQuery.attribute = attribute;
 if (atk) searchQuery.atk = atk;
 if (def) searchQuery.def = def;
 if (set) searchQuery.set = set;
 if (linkArrows) {
  searchQuery.linkArrows = { $elemMatch: { $in: linkArrows.split(',') } };
}
 if (img) searchQuery.img = img;
 if (effect) searchQuery.effect = { $regex: new RegExp(effect, 'i') }; // Case-insensitive search
 if (limit) {
   const numberLimit = parseInt(limit);
   if (!isNaN(numberLimit)) {
     searchQuery.__experimentalLimit = numberLimit; // Use experimental limit parameter
   }
 }

 const cardsCollection = await connectToDB();
 const cards = await cardsCollection.find(searchQuery).sort({ name: 1 }).toArray();
 res.json(cards);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
