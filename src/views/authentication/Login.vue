<template>
    <LoginForm />
</template>

<script>
export default {
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
