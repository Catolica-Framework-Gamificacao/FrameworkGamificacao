<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center" dense>
                    <v-col cols="10" sm="8" md="6" lg="3">
                        <LoginForm />
                    </v-col>
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
