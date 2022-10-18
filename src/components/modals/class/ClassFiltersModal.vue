<template>
    <v-dialog v-model="dialog.modal" width="500" @click:outside="resetForm()">
        <v-card>
            <v-toolbar color="#785ef0">
                <v-toolbar-title>Filtro</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon rounded @click="close()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded class="mb-3 mr-4" width="125" color="#785ef0" @click="close()">
                    Cancelar
                </v-btn>
                <v-btn rounded class="mb-3 mr-4" width="125" color="#785ef0" @click="finish()">
                    OK
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import ClassService from '@/services/ClassService';

export default {
    name: 'ClassFiltersModal',
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
