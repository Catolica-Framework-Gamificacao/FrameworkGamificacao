<template>
    <v-row>
        <v-col cols="12">
            <v-row>
                <v-col cols="9">
                    <v-text-field
                        v-model="filters.subjectName"
                        label="Disciplina"
                        @input="filter()"
                    ></v-text-field>
                </v-col>
                <v-col cols="3">
                    <v-container fluid>
                        <v-btn text outlined> + Nova disciplina</v-btn>
                    </v-container>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
            <SubjectList :subjects="filteredSubjects"></SubjectList>
        </v-col>
    </v-row>
</template>

<script>
import SubjectList from '@/components/SubjectList.vue';

export default {
    name: 'SubjectConfiguration',
    components: {
        SubjectList,
    },
    data: () => ({
        filters: {
            subjectName: '',
        },
        subjects: [],
        filteredSubjects: [],
    }),
    methods: {
        filter() {
            this.filteredSubjects = this.subjects;
        },
    },
};
</script>
