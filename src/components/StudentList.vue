<template>
    <div v-if="tableIsEmpty">
        <v-row>
            <v-col cols="12"> Não existem dados para serem mostrados. </v-col>
        </v-row>
    </div>
    <v-data-table
        v-else
        dense
        :headers="headers"
        :items="students"
        item-key="posicao"
        class="elevation-1"
        :items-per-page="20"
    >
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
        <StudentRegisterModal ref="editModal" @student="editedStudent = $event" />
    </v-data-table>
</template>

<script>
import _ from 'lodash';
import StudentUtils from '@/utils/StudentUtils';
import StudentRegisterModal from '@/components/modals/StudentRegisterModal.vue';

export default {
    name: 'SubjectList',
    components: {
        StudentRegisterModal,
    },
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
    methods: {
        edit(item) {
            StudentUtils.openRegisterModal(this.$refs.editModal);
            console.log(item);
        },
    },
};
</script>
