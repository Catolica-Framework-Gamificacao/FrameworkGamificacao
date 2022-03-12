<template>
    <v-app>
        <v-navigation-drawer
            permanent
            app
            v-if="!$route.meta.hideMainNavigation"
        >
            <Navbar :items="items"></Navbar>
        </v-navigation-drawer>
        <v-main fluid>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export const APPLICATION_NAME = 'Ludus';

export default {
    name: 'App',
    components: { Navbar },
    data: () => ({
        items: [
            { title: 'Home', icon: 'mdi-home-variant-outline', route: '/' },
            { title: 'Ranking', icon: 'mdi-table-large', route: '/ranking' },
            {
                title: 'Minhas turmas',
                icon: 'mdi-notebook-multiple',
                route: '/turmas',
            },
        ],
    }),
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || APPLICATION_NAME;
            },
        },
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
