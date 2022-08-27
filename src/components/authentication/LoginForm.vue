<template>
    <v-card class="rounded-xl card__container" outlined dark>
        <span class="text-h6 font-weight-light card__title">LUDUS</span>
        <v-form ref="login" v-model="formIsValid" lazy-validation>
            <v-row class="card__fields--container">
                <v-col cols="12">
                    <v-text-field color="white" v-model="form.login" label="E-mail"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        color="white"
                        v-model="form.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        label="Senha"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-form>
        <v-btn text class="card__button" @click="login()">Entrar</v-btn>
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
.card__container {
    width: 400px;
    height: 65%;
    min-width: 280px;
    max-width: 442vw;
    background-color: #785ef0;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
}

.card__title {
    align-items: center;
    display: flex;
    justify-content: center;
    font-weight: 900 !important;
    font-size: 40px !important;
    text-shadow: #08080896 0px 3px 12px;
}

.card__fields--container {
    margin-top: 40px;
    width: 320px !important;
}

.card__button {
    background-color: #dc267f;
    height: 45px !important;
    width: 260px;
    box-shadow: 4px 4px 14px 0px #08080896;
    border-radius: 15px;
}
</style>
