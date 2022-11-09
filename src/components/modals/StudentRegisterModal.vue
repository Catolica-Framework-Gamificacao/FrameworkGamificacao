<template>
    <v-dialog v-model="showModal" width="1000" eager @click:outside="resetForm()">
        <v-card>
            <v-toolbar :color="$vuetify.theme.themes.dark.main">
                <v-toolbar-title>Novo aluno</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon rounded @click="close()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-text>
                <v-form ref="form" v-model="formIsValid" lazy-validation>
                    <v-container>
                        <v-row>
                            <v-col cols="4">
                                <v-text-field
                                    :color="$vuetify.theme.themes.dark.main"
                                    v-model="dialog.student.ra"
                                    :rules="rules.ra"
                                    label="RA"
                                    hide-details="auto"
                                    required
                                />
                            </v-col>
                            <v-col cols="8">
                                <v-text-field
                                    :color="$vuetify.theme.themes.dark.main"
                                    v-model="dialog.student.name"
                                    :rules="rules.name"
                                    label="Nome"
                                    hide-details="auto"
                                    required
                                />
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="9">
                                <v-text-field
                                    :color="$vuetify.theme.themes.dark.main"
                                    v-model="dialog.student.email"
                                    :rules="rules.email"
                                    label="E-mail"
                                    hide-details="auto"
                                    required
                                />
                            </v-col>
                            <v-col cols="3">
                                <v-combobox
                                    v-model="dialog.student.situation"
                                    :rules="rules.situation"
                                    :items="possibleStudentSituations"
                                    label="Situação"
                                    outlined
                                    dense
                                >
                                </v-combobox>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="9">
                                <v-select
                                    @click="resetIndexColor"
                                    :color="$vuetify.theme.themes.dark.main"
                                    v-model="dialog.student.class"
                                    :rules="rules.class"
                                    :items="classes"
                                    label="Disciplina"
                                    hide-details="auto"
                                    item-color="white"
                                    no-data-text="Nenhuma disciplina encontrada."
                                    required
                                >
                                    <template v-slot:item="{ active, item, attrs, on }">
                                        <v-list-item
                                            :style="
                                                'border-radius: 30px; margin-bottom: 5px; background-color:' +
                                                getRandomColor()
                                            "
                                            v-on="on"
                                            v-bind="attrs"
                                            class="font-weight-bold text-start"
                                        >
                                            <v-list-item-content>
                                                <v-list-item-title>
                                                    <span>{{ item.text }}</span>
                                                </v-list-item-title>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </v-select>
                            </v-col>
                            <v-col cols="3">
                                <v-switch
                                    v-model="dialog.student.showOnRanking"
                                    :color="$vuetify.theme.themes.dark.main"
                                    label="Exibir no Ranking"
                                    value="Sim"
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded class="mb-3 mr-4" width="125" :color="$vuetify.theme.themes.dark.main" @click="close()">
                    <strong class="red--text text--darken-1">Cancelar</strong>
                </v-btn>

                <v-btn rounded class="mb-3 mr-4" width="125" :color="$vuetify.theme.themes.dark.main" @click="finish()">
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

let indexColor = 0;

export default {
    name: 'StudentRegisterModal',
    props: {
        dialog: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        showModal: false,
        classes: [],
        formIsValid: true,
        rules: {
            name: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Preencha o nome!')],
            ra: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Preencha o RA do aluno!')],
            class: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Selecione uma disciplina!')],
            email: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Preencha o e-mail do aluno!')],
            situation: [FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Selecione uma situação para o aluno!')],
        },
        possibleStudentSituations: ['Ativo', 'Inativo', 'Bloqueado'],
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
            this.showModal = false;
            this.resetForm();
        },

        open() {
            this.dialog.student.situation = 'Ativo';
            this.showModal = true;
        },

        loadClasses() {
            ClassService.loadData().then((classes) => {
                this.classes = classes.map((clazz) => clazz.subject);
            });
        },

        getRandomColor() {
            const listColor = ['#dc2681', '#fd6300', '#feb100', '#628fff'];

            const color = listColor[indexColor];

            if (indexColor === 3) {
                indexColor = 0;
            } else {
                indexColor += 1;
            }

            return color;
        },

        resetIndexColor() {
            indexColor = 0;
        },
    },
};
</script>
