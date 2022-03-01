<template>
    <LoginForm />
</template>

<script>
import LoginForm from '../../components/authentication/LoginForm.vue';

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
