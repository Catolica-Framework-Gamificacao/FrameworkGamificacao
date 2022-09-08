<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="9">
                    <v-text-field v-model="filters.studentName" label="Aluno" @input="filter()"></v-text-field>
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
        <StudentRegisterModal :dialog="addNewStudentDialog" @student="newStudent = $event"></StudentRegisterModal>
    </v-row>
</template>

<script>
import StudentList from '@/components/StudentList.vue';
import StudentRegisterModal from '@/components/modals/StudentRegisterModal.vue';
import StudentService from '@//services/StudentService';

export default {
    name: 'StudentConfiguration',
    components: {
        StudentList,
        StudentRegisterModal,
    },
    watch: {
        newStudent(newStudent, oldStudent) {
            if (newStudent !== oldStudent) {
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
            studentName: '',
        },
        students: [],
        filteredStudents: [],
        newStudent: {},
        addNewStudentDialog: {
            modal: false,
            student: {
                ra: undefined,
                name: undefined,
                showOnRanking: true,
                class: undefined,
                points: 0,
            },
        },
    }),
    methods: {
        filter() {
            this.filteredStudents = this.students;
        },
        openAddNewStudentDialog() {
            this.addNewStudentDialog.modal = true;
        },
        loadStudentsList() {
            StudentService.loadData().then((students) => {
                this.students = students;
            });
        },
    },
};
</script>
