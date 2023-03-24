import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    console.log(localStorage.token)
    next();
  } else {
    next("/login");
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    beforeEnter: isLoggedIn,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView

  },
 
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
