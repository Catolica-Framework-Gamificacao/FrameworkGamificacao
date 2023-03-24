<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="9">
                    <v-text-field v-model="filters.name" label="Aluno" @input="filter()"></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-container fluid>
                        <v-btn text outlined @click="openAddNewStudentDialog()"> + Novo aluno </v-btn>
                    </v-container>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <StudentList :students="filteredStudents"></StudentList>
        </v-col>

        <StudentRegisterModal ref="modalStudent" @student="newStudent = $event" />
    </v-row>
</template>

<script>
import StudentList from '@/components/StudentList.vue';
import StudentRegisterModal from '@/components/modals/StudentRegisterModal.vue';
import StudentService from '@//services/StudentService';
import StudentUtils from '@/utils/StudentUtils';

export default {
    name: 'StudentConfiguration',
    components: {
        StudentList,
        StudentRegisterModal,
    },
    watch: {
        newStudent(newStudent, oldStudent) {
            if (newStudent && newStudent !== oldStudent) {
                console.log(newStudent);
                return this.students.push(newStudent);
            }
            return newStudent;
        },
        students() {
            this.filter();
        },
    },
    mounted() {
        this.loadStudentsList();
    },
    data: () => ({
        filters: {
            name: '',
        },
        students: [],
        filteredStudents: [],
        newStudent: {},
    }),
    methods: {
        filter() {
            this.filteredStudents = this.students;
        },
        openAddNewStudentDialog() {
            StudentUtils.openRegisterModal(this.$refs.modalStudent);
        },
        async loadStudentsList() {
            try {
                this.students = await StudentService.loadData();
            } catch (error) {
                console.error(error);
                this.students = [];
            }
        },
    },
};
</script>
