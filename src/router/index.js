import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Login from '@/views/authentication/Login.vue';
import AuthService from '../services/AuthService';

Vue.use(VueRouter);

const routes = [
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
        path: '/cadastro',
        name: 'cadastro',
        component: null,
        meta: {
            title: 'Ludus - Cadastro',
            hideMainNavigation: true,
        },
    },
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/ranking',
        name: 'ranking',
        component: () => import('@/views/Ranking.vue'),
    },
    {
        path: '/disciplinas',
        name: 'disciplinas',
        component: () => import('@/views/configuration/SubjectConfiguration.vue'),
    },
    {
        path: '/alunos',
        name: 'alunos',
        component: () => import('@/views/configuration/StudentConfiguration.vue'),
    },
    // {
    //     path: '/turmas',
    //     name: 'turmas',
    //     component: () => import('@/views/configuration/ClassConfiguration.vue'),
    // },
    {
        path: '*',
        name: '404',
        component: () => import('@/views/shared/PageNotFound.vue'),
        meta: {
            title: 'Página não encontrada',
            hideMainNavigation: true,
        },
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, _from, next) => {
    const publicRoutes = ['/login', '/register'];
    const authRequired = !publicRoutes.includes(to.path);
    const loggedIn = AuthService.isLoggedIn();
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;
