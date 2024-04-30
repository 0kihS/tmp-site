import { createRouter, createWebHistory } from 'vue-router';
import Home from '../home.vue';
import Search from '../search.vue'; // Replace with your new component

const routes = [
  { path: '/', component: Home },
  { path: '/search', component: Search }, // Add more routes for your extra pages
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
