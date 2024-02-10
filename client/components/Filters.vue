<template>
    <div class="filters">
      <h3>Filters</h3>
      <ul>
        <li v-for="filter in availableFilters" :key="filter.key">
          <label :for="`filter-${filter.key}`">
            {{ filter.label }}:
          </label>
          <select v-model="selectedFilters[filter.key]" :id="`filter-${filter.key}`">
            <option v-for="option in filter.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </li>
      </ul>
      <button @click="emitFilters">Apply Filters</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      filters: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        selectedFilters: {},
      };
    },
    watch: {
      filters: {
        handler(newFilters) {
          this.selectedFilters = Object.assign({}, newFilters); // Reset filters on change
        },
        deep: true,
      },
    },
    methods: {
      emitFilters() {
        this.$emit('onFilter', this.selectedFilters);
      },
    },
  };
  </script>
  
  <style scoped>
  .filters {
    margin-bottom: 1rem;
  }
  
  .filters ul {
    padding: 0;
    margin: 0;
  }
  
  .filters li {
    margin-bottom: 0.5rem;
  }
  
  .filters select {
    padding: 0.5rem;
    border: 1px solid #ccc;
}

.filters button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  cursor: pointer;
}

