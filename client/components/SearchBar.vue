<template>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" @keyup.enter="handleSearch" placeholder="Search cards..." />
      <button @click="handleSearch">Search</button>
      <div v-if="searchResults.length > 0" class="suggestions">
        <ul>
          <li v-for="suggestion in searchResults" :key="suggestion.id" @click="updateSearchQuery(suggestion.name)">
            {{ suggestion.name }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['onSearch'],
    data() {
      return {
        searchQuery: '',
        searchResults: [],
      };
    },
    methods: {
      handleSearch() {
        this.$emit('onSearch', this.searchQuery);
        this.searchResults = []; // Clear suggestions after search
      },
      updateSearchQuery(query) {
        this.searchQuery = query;
        this.handleSearch();
      },
      // Implement logic to fetch suggestions based on partial query (optional)
    },
  };
  </script>
  
  <style scoped>
  .search-bar {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .search-bar input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    flex-grow: 1;
  }
  
  .search-bar button {
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  
  .suggestions {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .suggestions li {
    padding: 0.5rem;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
  }
  
  .suggestions li:hover {
    background-color: #f5f5f5;
  }
  </style>