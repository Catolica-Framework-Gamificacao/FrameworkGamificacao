<template>
    <div v-if="tableIsEmpty">
        <v-row>
            <v-col cols="12"> Não existem dados de ranking para serem mostrados. </v-col>
            <v-col cols="12">
                <GoBackButton></GoBackButton>
            </v-col>
        </v-row>
    </div>
    <v-data-table
        v-else
        dense
        :headers="headers"
        :items="items"
        item-key="posicao"
        class="elevation-1"
    ></v-data-table>
</template>
<script>
import _ from 'lodash';
import GoBackButton from '@/components/buttons/GoBackButton.vue';
import RankingService from '@/services/RankingService';
import RankingUtils from '@/utils/RankingUtils';

export default {
    components: {
        GoBackButton,
    },
    data: () => ({
        items: [],
        headers: RankingUtils.getDefaultTableHeaders(),
    }),
    mounted() {
        this.loadRanking();
    },
    methods: {
        loadRanking() {
            RankingService.loadData().then((ranking) => {
                this.items = ranking;
            });
        },
    },
    computed: {
        tableIsEmpty() {
            return _.isEmpty(this.items);
        },
    },
};
</script>
