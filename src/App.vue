<template>
    <v-app>
        <v-navigation-drawer app v-if="!$route.meta.hideMainNavigation">
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

export default {
    name: 'App',
    components: { Navbar },
    data: () => ({
        items: [
            { title: 'Home', icon: '', route: '/' },
            { title: 'Ranking', icon: '', route: '/ranking' },
        ],
    }),
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Ludus';
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
