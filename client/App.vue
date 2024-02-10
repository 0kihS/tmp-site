<template>
  <div class="app">
    <header>
      <h1>Card Search</h1>
      <search-bar @search="handleSearch"></search-bar>
    </header>
    <main>
      <filters @filter="handleFilter"></filters>
      <div class="results">
        <card v-for="card in filteredCards" :key="card.id" :card="card" />
      </div>
    </main>
  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';
import Filters from './components/Filters.vue';
import Card from './components/Card.vue';

export default {
  components: { SearchBar, Filters, Card },
  data() {
    return {
      cards: [],
      filters: {},
    };
  },
  methods: {
    handleSearch(searchQuery) {
      // Logic to fetch cards based on search query
      this.cards = []; // Placeholder

      // Update filters here if searching filters based on query
    },
    handleFilter(newFilters) {
      this.filters = newFilters;

      // Apply filters to existing cards data
      this.filteredCards = this.cards.filter(card => {
        // Implement filtering logic based on filters object
      });
    },
  },
};
</script>

<style scoped>
.app {
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.results {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>