<template>
  <div id="app">
    <h1>Card Search</h1>
    <form @submit.prevent="searchCards">
      <div class="search-field">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="searchQuery.name" placeholder="Enter card name">
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
      <button type="submit">Search</button>
    </form>
    <div v-if="searching" class="loading">Loading...</div>
    <div v-else-if="cards.length">
      <h2>Results</h2>
      <ul class="card-list">
        <li v-for="card in cards" :key="card._id">
          <div class="card-info">
            <h3>{{ card.name }}</h3>
            <p>Level: {{ card.level }}</p>
            </div>
          <img v-if="card.img" :src="card.img" alt="{{ card.name }}">
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
        const response = await fetch('/search', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.searchQuery),
        });
        this.cards = await response.json();
      } catch (error) {
        console.error('Error fetching cards:', error);
        // Handle error gracefully in UI (e.g., display an error message)
      } finally {
        this.searching = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add basic styling for your app as needed */
</style>