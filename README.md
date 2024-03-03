# tmp-site
This is the source code for the card search website used by [The Mokey Palace](https://mechanical-mokey.onrender.com/). The website features an easy to use and beautiful layout to easily access all custom cards in the database, as well as an easy to use and understand API. You can easily self-host the project for your own custom format though!

## How to use the API!!!

**Purpose:**

This API allows users to search for cards in a database based on various criteria, including card name, level, card type, type, attribute, attack points (ATK), defense points (DEF), set, image URL, and card effect.

**Prerequisites:**

* Node.js and npm (or yarn) installed on your machine.

**Setup:**

1. Clone or download the repository containing the API code.
2. Install dependencies: `npm install` (or `yarn install`)
3. Create a `.env` file in the project root directory and add your MongoDB connection URI: `MONGO_URI=YOUR_MONGO_URI` (replace `YOUR_MONGO_URI` with your actual URI).

**API Endpoint:**

* `/search`: This GET endpoint allows users to search for cards based on specific criteria.

**Request Parameters:**

* All parameters are optional.
* Parameters can be combined to create specific search queries.
* Case-insensitive search is applied to `name` and `effect` parameters.

| Parameter | Description | Data Type |
|---|---|---|
| name | Search by card name (partial match) | String |
| level | Search by card level | Number |
| cardtype | Search by card type (e.g., Normal, Effect, Fusion) | String |
| type | Search by card type (e.g., Monster, Spell, Trap) | String |
| attribute | Search by card attribute (e.g., Light, Dark, Fire) | String |
| atk | Search by card attack points (ATK) | Number |
| def | Search by card defense points (DEF) | Number |
| set | Search by card set (e.g., Starter Deck, Legend of Blue Eyes) | String |
| img | Search by card image URL | String |
| effect | Search by card effect (partial match) | String |
| limit | The number of copies allowed of the card in a legal deck | Number |

**Example Request:**

```
GET /search?name=Eterfall Wanderer&level=5&type=Warrior&attribute=Fire
```

This request searches for cards with the following criteria:

* Name containing "Eterfall Wanderer" (case-insensitive)
* Level 5
* Warrior type
* Fire attribute

**Response:**

The API returns a JSON array containing the matching cards from the database. Each card object contains relevant information such as name, level, type, attribute, ATK, DEF, set, image URL, and effect.

**Error Handling:**

The API will return appropriate error messages for invalid requests, such as missing parameters or invalid data types.
