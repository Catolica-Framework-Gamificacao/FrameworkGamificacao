<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="9">
                    <v-text-field
                        v-model="filters.studentName"
                        label="Aluno"
                        @input="filter()"
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-container fluid>
                        <v-btn text outlined> + Novo aluno</v-btn>
                    </v-container>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <StudentList :students="filteredStudents"></StudentList>
        </v-col>
    </v-row>
</template>

<script>
import StudentList from '@/components/StudentList.vue';

export default {
    name: 'StudentConfiguration',
    components: {
        StudentList,
    },
    data: () => ({
        filters: {
            studentName: '',
        },
        students: [],
        filteredStudents: [],
    }),
    methods: {
        filter() {
            this.filteredStudents = this.students;
        },
    },
};
</script>
