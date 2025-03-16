import { createRouter,createWebHashHistory } from "vue-router";
import HomePage from './Pages/HomePage.vue'
import LaunchPage from "./Pages/LaunchPage.vue";

const routes = [
    {
        path: '/',
        component: HomePage,
    },
    {
        path: '/launches/:id',
        component: LaunchPage
    }
]

const router =createRouter({
    history: createWebHashHistory(),
    routes
})

export default router