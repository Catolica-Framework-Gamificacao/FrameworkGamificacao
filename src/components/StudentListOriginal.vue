<template>
    <div v-if="tableIsEmpty">
        <v-row>
            <v-col cols="12"> Não existem dados para serem mostrados. </v-col>
        </v-row>
    </div>
    <v-data-table v-else dense :headers="headers" :items="students" item-key="posicao" class="elevation-1">
        <template #[`item.showOnRanking`]="{ item }">
            {{ item.showOnRanking ? 'Sim' : 'Não' }}
        </template>
        <template #[`item.actions`]="{ item }">
            <v-btn icon color="blue" @click="edit(item)">
                <v-icon dark> mdi-pencil </v-icon>
            </v-btn>
            <v-btn icon color="red" @click="remove(item.id)">
                <v-icon dark> mdi-delete </v-icon>
            </v-btn>
        </template>
    </v-data-table>
</template>

<script>
import _ from 'lodash';
import StudentUtils from '@/utils/StudentUtils';

export default {
    name: 'SubjectList',
    props: {
        students: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        headers: StudentUtils.getDefaultTableHeaders(),
    }),
    computed: {
        tableIsEmpty() {
            return _.isEmpty(this.students);
        },
    },
};
</script>
