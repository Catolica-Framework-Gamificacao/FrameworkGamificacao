<template>
    <v-dialog v-model="dialog.modal" width="500" @click:outside="resetForm()">
        <v-card>
            <v-toolbar color="#785ef0">
                <v-toolbar-title>Nova turma</v-toolbar-title>
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
                                    v-model="dialog.classroom.name"
                                    :rules="rules.name"
                                    label="Nome da turma"
                                    hide-details="auto"
                                    required
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    color="#785ef0"
                                    v-model="dialog.classroom.subject"
                                    :rules="rules.subject"
                                    :items="classes"
                                    label="Disciplina"
                                    hide-details="auto"
                                    required
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12">
                                <v-subheader class="pl-0">
                                    Número de alunos
                                </v-subheader>

                                <v-slider
                                    v-model="dialog.classroom.studentsAmount"
                                    :thumb-size="15"
                                    :rules="rules.studentsAmount"
                                    color="#785ef0"
                                    thumb-label="always"
                                    required
                                />
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="6">
                                <v-switch
                                    v-model="dialog.classroom.showOnRanking"
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
import FormularyUtils from '@/utils/FormularyUtils';

export default {
    name: 'ClassRegisterModal',
    props: {
        dialog: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        classes: [],
        subjects: [],
        studentsAmount: [],
        formIsValid: true,
        rules: {
            name: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Preencha o nome da turma!')],
            studentsAmount: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Selecione o número de alunos desta turma!')],
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
            let { classroom } = this.dialog;
            const formIsValid = this.$refs.form.validate();

            if (formIsValid) {
                ClassService.create(classroom)
                    .then((newClassroom) => {
                        classroom = newClassroom;
                    })
                    .catch((error) => {
                        console.error(error);
                        if (error && error.message) {
                            this.$toastr.e(error.message);
                        }
                    })
                    .finally(() => {
                        this.$emit('classroom', classroom);
                        this.dialog.classroom = {};
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
