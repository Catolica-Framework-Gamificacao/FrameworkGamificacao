<template>
    <v-dialog v-model="dialog.modal" width="500" @click:outside="resetForm()">
        <v-card>
            <v-toolbar :color="$vuetify.theme.themes.dark.main">
                <v-toolbar-title>Nova turma</v-toolbar-title>
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
                                    :color="$vuetify.theme.themes.dark.main"
                                    label="Nome"
                                    v-model="formData.name"
                                    hide-details="auto"
                                    required
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field
                                    v-model="formData.subject"
                                    :color="$vuetify.theme.themes.dark.main"
                                    label="Disciplina"
                                    hide-details="auto"
                                >
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
                <v-card-actions>
                    <v-btn
                        rounded
                        class="mb-3 mr-4"
                        width="80"
                        :color="$vuetify.theme.themes.dark.main"
                        @click="openModal()"
                    >
                        Alunos
                    </v-btn>
                </v-card-actions>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded class="mb-3 mr-4" width="125" :color="$vuetify.theme.themes.dark.main" @click="close()">
                    Cancelar
                </v-btn>
                <v-btn rounded class="mb-3 mr-4" width="125" :color="$vuetify.theme.themes.dark.main" @click="finish()">
                    Criar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ClassService from '@/services/ClassService';

export default {
    name: 'ClassRegisterModal',
    props: {
        dialog: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        formIsValid: false,
        formData: {
            name: '',
            subject: '',
            studentsAmount: 0,
            discipline: '',
        },
    }),
    methods: {
        openModal() {},
        resetForm() {
            this.$refs.form.resetValidation();
            this.$refs.form.reset();
            this.formData = {
                name: '',
                subject: '',
                studentsAmount: 0,
                discipline: '',
            };
        },

        close() {
            this.dialog.modal = false;
            this.resetForm();
        },

        async finish() {
            const data = this.formData;
            const formIsValid = this.$refs.form.validate();
            if (formIsValid) {
                try {
                    const newClass = await ClassService.create(data);
                    this.$emit('on-create', newClass);
                } catch (error) {
                    console.log(error);
                    if (error && error.message) {
                        this.$toastr.e(error.message);
                    }
                } finally {
                    this.resetForm();
                    this.close();
                }
            }
        },
    },
};
</script>
