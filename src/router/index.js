import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/authentication/Login.vue';
import Ranking from '../views/Ranking.vue';

Vue.use(VueRouter);

const APPLICATION_NAME = 'Ludus';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: APPLICATION_NAME,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login',
            hideMainNavigation: true,
        },
    },
    {
        path: '/ranking',
        name: 'ranking',
        component: Ranking,
    },
];

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});
