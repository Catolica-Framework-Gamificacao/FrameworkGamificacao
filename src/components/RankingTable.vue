<template>
    <v-data-table
        dense
        :headers="headers"
        :items="items"
        item-key="posicao"
        class="elevation-1"
    ></v-data-table>
</template>
<script>
import RankingService from '../services/RankingService';

export default {
    data: () => ({
        items: [],
        headers: RankingService.getDefaultTableHeaders(),
    }),
    mounted() {
        this.loadRanking();
    },
    methods: {
        loadRanking() {
            console.log('loading...');
        },
    },
};
</script>
