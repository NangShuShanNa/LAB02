import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import StudentListView from '@/views/StudentListView.vue' // Add this import

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
    },
    {
      path: '/about',
      name: 'about',
     component:AboutView

    },
    {
      path: '/students',
      name: 'Students',
      component: ()=> import('@/views/StudentListView.vue')
    },
  ],
})

export default router
