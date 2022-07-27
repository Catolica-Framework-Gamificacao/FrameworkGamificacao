<template>
    <v-dialog v-model="show" width="500" @click:outside="resetForm()">
        <v-card>
            <v-toolbar color="#785ef0">
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
                                    color="#785ef0"
                                    label="Nome"
                                    hide-details="auto"
                                    required
                                >
                                </v-text-field>
                            </v-col>

                            <v-col cols="12">
                                <v-text-field color="#785ef0" label="Matéria" hide-details="auto">
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row> </v-row>
                    </v-container>
                </v-form>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn rounded class="mb-3 mr-4" width="125" color="#785ef0" @click="finish()">
                    Criar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'ClassRegisterModal',
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
    data: () => ({
        formIsValid: false,
    }),
    methods: {
        close() {
            this.show = false;
        },
        finish() {
            // validate and create
            // then
            this.close();
        },
    },
};
</script>
