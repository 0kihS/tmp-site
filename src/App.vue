<template>
 <div id="app">
  <h1>Card Search</h1>
  <form @submit.prevent="searchCards">
    <div class="search-bar">
      <div class="search-field">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model.trim="searchQuery.name" placeholder="Enter card name">
      </div>
      <div class="search-field">
        <label for="level">Level:</label>
        <input type="number" id="level" v-model.number="searchQuery.level" placeholder="Enter level">
      </div>
      <div class="search-field">
        <label for="cardtype">Card Type:</label>
        <select id="cardtype" v-model="searchQuery.cardtype">
          <option value="">Any</option>
          <option v-for="type in cardTypes" :key="type">{{ type }}</option>
        </select>
      </div>
    </div>
    <button type="submit">Search</button>
  </form>
    <div v-if="searching" class="loading">Loading...</div>
    <div v-else-if="cards.length">
      <h2>Results</h2>
      <ul class="card-list">
        <li v-for="card in cards" :key="card._id">
          <div class="card-info">
            <h3>{{ card.name }} </h3>
            <p>Level: {{ card.level }}</p> 
            <p>Attribute: {{ card.attribute }}</p>
            <p>{{ card.effect }}</p>
            </div>
          <img v-if="card.image" :src="card.image" alt="{{ card.name }}">
        </li>
      </ul>
    </div>
    <div v-else>No cards found matching your criteria.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardTypes: ["Monster", "Spell", "Trap"], // Adjust based on your card types
      searchQuery: {},
      cards: [],
      searching: false,
    };
  },
  methods: {
    async searchCards() {
  this.searching = true;
  this.cards = []; // Clear previous results

  try {
    // Build query string based on searchQuery
    let queryString = '';
    Object.entries(this.searchQuery).forEach(([key, value]) => {
      if (value) {
        queryString += `${key}=${encodeURIComponent(value)}&`;
      }
    });
    queryString = queryString.slice(0, -1); // Remove trailing &

    // Make the GET request with query string
    const response = await fetch(`/search?${queryString}`, {
      method: 'GET',
    });
    this.cards = await response.json();
  } catch (error) {
    console.error('Error fetching cards:', error);
    // Handle error gracefully in UI
  } finally {
    this.searching = false;
  }
},
  },
};
</script>

<style scoped>
</style>