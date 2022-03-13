<template>
    <div>
        <h1>Página não encontrada</h1>
        <GoBackButton></GoBackButton>
    </div>
</template>

<script>
import GoBackButton from '@/components/buttons/GoBackButton.vue';

export default {
    name: 'PageNotFound',
    components: {
        GoBackButton,
    },
};
</script>
