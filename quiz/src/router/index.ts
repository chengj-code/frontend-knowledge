import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import QuizPage from '../views/QuizPage.vue'
import ResultPage from '../views/ResultPage.vue'

const base = import.meta.env.BASE_URL

const router = createRouter({
  history: createWebHistory(base),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizPage
    },
    {
      path: '/result',
      name: 'result',
      component: ResultPage
    }
  ]
})

export default router
