<template>
    <v-card class="rounded-xl card__container" outlined dark>
        <span class="text-h6 font-weight-light card__title">LUDUS</span>

        <v-row class="card__fields--container">
            <v-col cols="12">
                <v-text-field color="white" v-model="form.login" label="E-mail"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-text-field color="white" v-model="form.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :type="showPassword ? 'text' : 'password'"
                    label="Senha" @click:append="showPassword = !showPassword"></v-text-field>
            </v-col>
        </v-row>

        <v-btn text class="card__button">Entrar</v-btn>
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

<style
    scoped
>
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
