<template>
    <v-app>
        <v-navigation-drawer
            permanent
            app
            v-if="!$route.meta.hideMainNavigation"
            :color="$vuetify.theme.themes.dark.main"
        >
            <Navbar :items="items"></Navbar>
        </v-navigation-drawer>
        <v-app-bar
            app elevation="0"
            :color="$vuetify.theme.themes.dark.mainDark"
            v-if="!$route.meta.hideMainNavigation"
        >
            <v-spacer></v-spacer>
                <!-- <v-btn text outlined @click="" v-if="!$route.meta.title === 'Turmas'"> -->
                <v-btn text outlined @click="openAddNewClassDialog()">
                    + Nova turma
                </v-btn>

            <v-btn icon>
                <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main fluid :color="$vuetify.theme.themes.dark.mainDark">
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
        <ClassRegisterModal
            :dialog="addNewClassDialog"
            @classroom="newClassroom = $event"
        />
    </v-app>
</template>

<script>

import Navbar from '@/components/Navbar.vue';
import ClassRegisterModal from '@/components/modals/ClassRegisterModal.vue';

export const APPLICATION_NAME = 'Ludus';

export default {
    name: 'App',
    components: {
        Navbar,
        ClassRegisterModal,
    },
    data: () => ({
        items: [
            { title: 'Início', icon: 'mdi-home-variant-outline', route: '/' },
            { title: 'Ranking', icon: 'mdi-table-large', route: '/ranking' },
            {
                title: 'Disciplinas',
                icon: 'mdi-school',
                route: '/disciplinas',
            },
            {
                title: 'Alunos',
                icon: 'mdi-account-multiple',
                route: '/alunos',
            },
            {
                title: 'Turmas',
                icon: 'mdi-human-male-board',
                route: '/turmas',
            },
        ],
        addNewClassDialog: {
            modal: false,
            classroom: {
                name: undefined,
                showOnRanking: true,
                description: undefined,
            },
        },
    }),
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || APPLICATION_NAME;
            },
        },
    },
    methods: {
        openAddNewClassDialog() {
            this.addNewClassDialog.modal = true;
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
