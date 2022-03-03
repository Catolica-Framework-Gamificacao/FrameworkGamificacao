<template>
    <div id="app">
        <Navbar :items="items" v-if="!$route.meta.hideMainNavigation" />
        <router-view></router-view>
    </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
    components: { Navbar },
    data: () => ({
        items: [{ title: 'Home', icon: '', route: '/' }],
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

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
