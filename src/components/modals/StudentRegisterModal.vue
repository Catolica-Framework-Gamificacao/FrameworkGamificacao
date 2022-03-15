<template>
    <v-dialog v-model="dialog.modal" max-width="60%">
        <v-card>
            <v-card-title class="text-h5"> Cadastrar aluno </v-card-title>
            <v-card-text>
                <v-form>
                    <v-container>
                        <v-row>
                            <v-col cols="10">
                                <v-text-field
                                    v-model="dialog.student.name"
                                    label="Nome"
                                    outlined
                                    dense
                                >
                                </v-text-field>
                            </v-col>
                            <v-col cols="2">
                                <v-checkbox
                                    v-model="dialog.student.showOnRanking"
                                    label="Exibir"
                                    dense
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field v-model="dialog.student.ra" label="RA" outlined dense>
                                </v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-combobox
                                    v-model="dialog.student.class"
                                    :items="classes"
                                    label="Turma"
                                    outlined
                                    dense
                                ></v-combobox>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="close()">Cancelar</v-btn>
                <v-btn text @click="finish()">Confirmar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import _ from 'lodash';
import ClassService from '@/services/ClassService';
import StudentService from '@/services/StudentService';

export default {
    name: 'StudentRegisterModal',
    props: {
        dialog: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        this.loadClasses();
    },
    computed: {
        hasClassesAvailable() {
            return !_.isEmpty(this.classes);
        },
    },
    data: () => ({
        classes: [],
    }),
    methods: {
        finish() {
            let { student } = this.dialog;
            const formIsValid = this.validateStudentForm();

            if (formIsValid) {
                StudentService.create(student)
                    .then((newStudent) => {
                        student = newStudent;
                    })
                    .catch((error) => {
                        console.error(error);
                        if (error && error.message) {
                            this.$toastr.e(error.message);
                        }
                    })
                    .finally(() => {
                        this.$emit('student', student);
                        this.dialog.student = {};
                        this.close();
                    });
            } else {
                this.$toastr.e('Preencha os campos necessários no formulário!');
            }
        },
        close() {
            this.dialog.modal = false;
        },
        loadClasses() {
            ClassService.loadData().then((classes) => {
                this.classes = classes.map((clazz) => clazz.name);
            });
        },
        validateStudentForm() {
            return true;
        },
    },
};
</script>
