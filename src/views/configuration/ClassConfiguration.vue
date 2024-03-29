<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="filters.className" label="Turma" @input="filter()"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-container fluid>
                                <v-combobox
                                    v-model="filters.selectedsFromSubjects"
                                    :items="subjects"
                                    label="Disciplina"
                                    multiple
                                    outlined
                                    dense
                                    @change="filter()"
                                ></v-combobox>
                            </v-container>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="6">
                    <v-row>
                        <v-col cols="3">
                            <v-btn @click.stop="openFiltersModal()">
                                Filtrar
                                <v-icon>mdi-filter</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn @click.stop="openCreateDialog()">
                                Cadastrar
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <div v-if="filteredClasses.length === 0">
                <span>Não existem turmas cadastradas.</span>
            </div>
            <ClassList v-else :classes="filteredClasses"></ClassList>
        </v-col>
        <ClassRegisterModal
            :dialog="createDialog"
            @on-create="addClass($event)"
        ></ClassRegisterModal>
        <ClassFiltersModal
            :dialog="showFilterDialog"
            @on-create="applyFilters($event)"
        ></ClassFiltersModal>
    </v-row>
</template>

<script>
import _ from 'lodash';
import ClassList from '@/components/ClassList.vue';
import ClassService from '@/services/ClassService';
import ClassRegisterModal from '@/components/modals/class/ClassRegisterModal.vue';
import ClassFiltersModal from '@/components/modals/class/ClassFiltersModal.vue';

export default {
    name: 'ClassConfiguration',
    components: {
        ClassList,
        ClassRegisterModal,
        ClassFiltersModal,
    },
    data: () => ({
        filters: {
            className: null,
            selectedsFromSubjects: [],
        },
        classes: [],
        filteredClasses: [],
        showFilterDialog: {
            modal: false,
            data: undefined,
        },
        createDialog: {
            modal: false,
            data: undefined,
        },
    }),
    mounted() {
        this.loadClasses();
    },
    computed: {
        subjects() {
            if (!_.isEmpty(this.classes)) {
                return this.classes.map((clazz) => clazz.subject);
            }

            return [];
        },
    },
    methods: {
        loadClasses() {
            ClassService.loadData().then((classes) => {
                this.classes = classes;
                this.filteredClasses = classes;
            });
        },
        filter() {
            this.filteredClasses = this.classes;
            if (!_.isEmpty(this.filters.className)) {
                this.filteredClasses = this.classes.filter((clazz) => {
                    const name = this.filters.className.trim();
                    const className = clazz.name.trim();
                    return className.includes(name);
                });
            }

            if (!_.isEmpty(this.filters.selectedsFromSubjects)) {
                this.filteredClasses = this.classes.filter((clazz) => {
                    const subjects = this.filters.selectedsFromSubjects || [];
                    const subject = clazz.subject.trim() || null;
                    return subjects.includes(subject);
                });
            }
        },

        openFiltersModal() {
            this.showFilterDialog.modal = true;
        },

        openCreateDialog() {
            this.createDialog.modal = true;
        },

        applyFilters(filters) {
            console.log(filters);
        },
        addClass(data) {
            if (data && this.classes) {
                this.classes.push(data);
            }
            this.filter();
        },
    },
};
</script>
