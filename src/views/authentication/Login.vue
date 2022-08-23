<template>
    <v-app>
        <v-main>
            <v-container class="h-100">
                <v-row class="h-100 " align="center" justify="center" dense>
                    <LoginForm />
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

import LoginForm from '@/components/authentication/LoginForm.vue';

export default {
    components: { LoginForm },
    data: () => ({
        authenticated: false,
        form: {
            username: '',
            password: '',
        },
    }),
    methods: {
        async login() {
            const credential = this.form;
            console.log(credential);
        },
    },
};
</script>

<style scoped>
    .h-100 {
        height: 100%;
    }
</style>
