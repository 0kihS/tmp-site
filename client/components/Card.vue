<template>
    <div class="card">
      <img :src="card.image" alt="{{ card.name }}" />
      <div class="card-info">
        <h2>{{ card.name }}</h2>
        <p>Type: {{ card.type }}</p>
        <p>Attribute: {{ card.attribute }}</p>
        <p>ATK: {{ card.atk }}</p>
        <p>DEF: {{ card.def }}</p>
        <p>Level: {{ card.level }}</p>
        <p class="effect">{{ card.effect }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      card: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #ccc;
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .card img {
    width: 100%;
    height: auto;
    max-height: 200px;
    object-fit: cover;
  }
  
  .card-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .effect {
    font-style: italic;
    margin-top: 1rem;
  }
  </style>