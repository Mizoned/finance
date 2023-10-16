import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "@/views/HomeView.vue";

const routes = [
    {
        path: '/',
        name: 'HomeView',
        component: HomeView
    },
    {
        path: '/profile',
        name: 'ProfileView',
        component: () => import('../views/ProfileView.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
});

export default router;
