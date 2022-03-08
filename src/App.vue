<template>
    <v-app>
        <div id="app">
            <Navbar
                :items="items"
                v-if="!$route.meta.hideMainNavigation"
            ></Navbar>
            <v-main>
                <v-container fluid>
                    <router-view></router-view>
                </v-container>
            </v-main>
        </div>
    </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
    components: { Navbar },
    data: () => ({
        items: [
            { title: 'Home', icon: '', route: '/' },
            { title: 'Ranking', icon: '', route: '/ranking' },
        ],
    }),
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
