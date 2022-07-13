<template>
    <v-app>
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center" dense>
                    <v-col cols="10" sm="8" md="6" lg="3">
                        <LoginForm @login="login($event)"></LoginForm>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import LoginForm from '@/components/authentication/LoginForm.vue';
import AuthService from '@/services/AuthService';

export default {
    components: { LoginForm },
    data: () => ({
        authenticated: false,
    }),
    methods: {
        async login(credential) {
            try {
                const user = await AuthService.login(credential);
                if (!user) {
                    throw new Error('Usuário ou senha inválidos!');
                }
                this.authenticated = true;
            } catch (error) {
                this.$toastr.e(error);
                this.authenticated = false;
            } finally {
                if (this.authenticated) {
                    this.$router.push('/');
                }
            }
        },
    },
};
</script>
