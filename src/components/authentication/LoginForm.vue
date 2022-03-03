<template>
    <v-card class="rounded-xl" outlined dark>
        <v-card-title>
            <span class="text-h6 font-weight-light">Log in</span>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.login"
                        label="E-mail"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        v-model="form.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        type="password"
                        label="Senha"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn text block> Entrar </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'LoginForm',
    data: () => ({
        showPassword: false,
        form: {
            login: '',
            password: '',
        },
    }),
};
</script>

<style scoped>
.card {
    background-color: red;
}
</style>
