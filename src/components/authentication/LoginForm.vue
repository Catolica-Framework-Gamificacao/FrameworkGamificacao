<template>
    <v-card class="rounded-xl" outlined dark>
        <v-card-title>
            <span class="text-h6 font-weight-light">Log in</span>
        </v-card-title>
        <v-card-text>
            <v-form ref="login" v-model="formIsValid" lazy-validation>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            v-model="form.login"
                            :rules="rules.email"
                            label="E-mail"
                            type="email"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            v-model="form.password"
                            :rules="rules.password"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            label="Senha"
                            @click:append="showPassword = !showPassword"
                            v-on:keyup.enter="login()"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn text block @click="login()"> Entrar </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import FormularyUtils from '@/utils/FormularyUtils';
import StorageUtils from '@/utils/StorageUtils';

export default {
    name: 'LoginForm',
    mounted() {
        const lastLogin = StorageUtils.getLastLogin();
        if (lastLogin) {
            this.form.login = lastLogin;
        }
    },
    data: () => ({
        showPassword: false,
        formIsValid: false,
        form: {
            login: '',
            password: '',
        },
        rules: {
            email: [
                FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Preencha o e-mail!'),
                (email) => FormularyUtils.emailIsValid(email) || 'Preencha com um e-mail válido!',
            ],
            password: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Preencha a senha!')],
        },
    }),
    methods: {
        async login() {
            const formIsValid = this.$refs.login.validate();
            if (formIsValid) {
                localStorage.setItem('LAST_LOGIN', this.form.login);
                this.$emit('login', this.form);
            }
        },
    },
};
</script>

<style scoped>
.card {
    background-color: red;
}
</style>
