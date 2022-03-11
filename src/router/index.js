import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/authentication/Login.vue'),
        meta: {
            title: 'Login',
            hideMainNavigation: true,
        },
    },
    {
        path: '/ranking',
        name: 'ranking',
        component: () => import('../views/Ranking.vue'),
    },
];

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
