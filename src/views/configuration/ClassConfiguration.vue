<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="6">
                    <v-text-field
                        v-model="filters.className"
                        label="Turma"
                        @input="filter()"
                    ></v-text-field>
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
        <v-col cols="12">
            <ClassList :classes="filteredClasses"></ClassList>
        </v-col>
    </v-row>
</template>

<script>
import _ from 'lodash';
import ClassList from '@/components/ClassList.vue';
import ClassService from '@/services/ClassService';

export default {
    name: 'ClassConfiguration',
    components: {
        ClassList,
    },
    data: () => ({
        filters: {
            className: null,
            selectedsFromSubjects: [],
        },
        classes: [],
        filteredClasses: [],
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
    },
};
</script>
