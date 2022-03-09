<template>
    <div v-if="tableIsEmpty">No data.</div>
    <v-data-table
        dense
        :headers="headers"
        :items="items"
        item-key="posicao"
        class="elevation-1"
        v-else
    ></v-data-table>
</template>
<script>
import _ from 'lodash';
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
    computed: {
        tableIsEmpty() {
            return _.isEmpty(this.items);
        },
    },
};
</script>
