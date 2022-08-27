<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="9">
                    <v-text-field v-model="filters.disciplineName" label="Disciplina" @input="filter()"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-container fluid>
                        <v-btn text outlined @click="openAddNewDisciplineDialog()"> + Nova disciplina </v-btn>
                    </v-container>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <SubjectList :subjects="filteredSubjects"></SubjectList>
        </v-col>
        <DisciplineRegisterModal
            :dialog="addNewDisciplineDialog"
            @discipline="newDiscipline = $event"
        ></DisciplineRegisterModal>
    </v-row>
</template>

<script>
import SubjectList from '@/components/SubjectList.vue';
import DisciplineRegisterModal from '@/components/modals/DisciplineRegisterModal.vue';

export default {
    name: 'SubjectConfiguration',
    components: {
        SubjectList,
        DisciplineRegisterModal,
    },
    watch: {
        newDiscipline(newDiscipline, oldDiscipline) {
            if (newDiscipline !== oldDiscipline) {
                return this.subjects.push(newDiscipline);
            }
            return newDiscipline;
        },
        subjects() {
            this.filter();
        },
    },
    data: () => ({
        filters: {
            disciplineName: '',
        },
        subjects: [],
        filteredSubjects: [],
        newDiscipline: {},
        addNewDisciplineDialog: {
            modal: false,
            discipline: {
                name: undefined,
                showOnRanking: true,
                description: undefined,
            },
        },
    }),
    methods: {
        filter() {
            this.filteredSubjects = this.subjects;
        },
        openAddNewDisciplineDialog() {
            this.addNewDisciplineDialog.modal = true;
        },
    },
};
</script>
