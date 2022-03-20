<template>
    <v-dialog v-model="dialog.modal" width="500" @click:outside="resetForm()">
        <v-card>
            <v-toolbar color="#785ef0">
                <v-toolbar-title>Novo aluno</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn
                        icon
                        rounded
                        @click="close()"
                    >
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text>
                <v-form ref="form" v-model="formIsValid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    color="#785ef0"
                                    v-model="dialog.student.name"
                                    :rules="rules.name"
                                    label="Nome"
                                    hide-details="auto"
                                    required
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-select
                                    color="#785ef0"
                                    v-model="dialog.student.class"
                                    :rules="rules.class"
                                    :items="classes"
                                    label="Disciplina"
                                    hide-details="auto"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    color="#785ef0"
                                    v-model="dialog.student.ra"
                                    :rules="rules.ra"
                                    label="RA"
                                    hide-details="auto"
                                    required
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="6">
                                <v-switch
                                    v-model="dialog.student.showOnRanking"
                                    color="#785ef0"
                                    label="Exibir no Ranking"
                                    value="Sim"
                                ></v-switch>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    rounded
                    class="mb-3 mr-4"
                    width="125"
                    color="#785ef0"
                    @click="finish()"
                >
                   Adicionar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import _ from 'lodash';
import ClassService from '@/services/ClassService';
import StudentService from '@/services/StudentService';
import FormularyUtils from '@/utils/FormularyUtils';

export default {
    name: 'StudentRegisterModal',
    props: {
        dialog: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        classes: [],
        formIsValid: true,
        rules: {
            name: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Preencha o nome!')],
            ra: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Preencha o RA do aluno!')],
            class: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Selecione uma disciplina!')],
        },
    }),
    mounted() {
        this.loadClasses();
    },
    computed: {
        hasClassesAvailable() {
            return !_.isEmpty(this.classes);
        },
    },
    methods: {
        resetForm() {
            this.$refs.form.resetValidation();
            this.$refs.form.reset();
        },

        finish() {
            let { student } = this.dialog;
            const formIsValid = this.$refs.form.validate();

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
                        this.resetForm();
                    });
            }
        },

        close() {
            this.dialog.modal = false;
            this.resetForm();
        },

        loadClasses() {
            ClassService.loadData().then((classes) => {
                this.classes = classes.map((clazz) => clazz.subject);
            });
        },
    },
};
</script>
