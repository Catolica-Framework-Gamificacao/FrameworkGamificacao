<template>
    <v-dialog v-model="dialog.modal" width="500" @click:outside="resetForm()">
        <v-card>
            <v-toolbar color="#785ef0">
                <v-toolbar-title>Nova disciplina</v-toolbar-title>
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
                            <v-col cols="12">
                                <v-text-field
                                    color="#785ef0"
                                    v-model="dialog.discipline.name"
                                    :rules="rules.name"
                                    label="Nome"
                                    hide-details="auto"
                                    required
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                    color="#785ef0"
                                    v-model="dialog.discipline.description"
                                    :rules="rules.description"
                                    label="Descrição"
                                    hide-details="auto"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                <v-switch
                                    v-model="dialog.discipline.showOnRanking"
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
                <v-btn rounded class="mb-3 mr-4" width="125" color="#785ef0" @click="close()">
                   <strong class="red--text text--darken-1">Cancelar</strong>
                </v-btn>
                <v-btn rounded class="mb-3 mr-4" width="125" color="#785ef0" @click="finish()">
                    Adicionar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
// import _ from 'lodash';
import DisciplineService from '@/services/DisciplineService';
import FormularyUtils from '@/utils/FormularyUtils';

export default {
    name: 'DisciplineRegisterModal',
    props: {
        dialog: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        subjects: [],
        formIsValid: true,
        rules: {
            name: [
                FormularyUtils.validadeNotEmptyRuleOrThrowMessage('Preencha o nome da disciplina!'),
            ],
        },
    }),
    // computed: {
    //     hasClassesAvailable() {
    //         return !_.isEmpty(this.subjects);
    //     },
    // },
    methods: {
        resetForm() {
            this.$refs.form.resetValidation();
            this.$refs.form.reset();
        },

        finish() {
            let { discipline } = this.dialog;
            const formIsValid = this.$refs.form.validate();

            if (formIsValid) {
                DisciplineService.create(discipline)
                    .then((newDiscipline) => {
                        discipline = newDiscipline;
                    })
                    .catch((error) => {
                        console.error(error);
                        if (error && error.message) {
                            this.$toastr.e(error.message);
                        }
                    })
                    .finally(() => {
                        this.$emit('discipline', discipline);
                        this.dialog.discipline = {};
                        this.close();
                        this.resetForm();
                    });
            }
        },

        close() {
            this.dialog.modal = false;
            this.resetForm();
        },
    },
};
</script>
