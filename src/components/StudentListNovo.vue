<template>
        <div v-if="tableIsEmpty">
            <v-row>
                <v-col cols="12"> Não existem dados para serem mostrados. </v-col>
            </v-row>
        </div>
        <v-data-table
            v-else
            dense
            :headers="headers"
            :items="students"
            item-key="posicao"
            class="elevation-1"
        >
            <template #[`item.showOnRanking`]="{ item }">
                {{ item.showOnRanking ? 'Sim' : 'Não' }}
            </template>
            <template #[`item.actions`]="{ item }">
                <v-btn icon color="blue" @click="edit(item)">
                    <v-icon dark> mdi-pencil </v-icon>
                </v-btn>
                <v-btn icon color="red" @click="remove(item.id)">
                    <v-icon dark> mdi-delete </v-icon>
                </v-btn>
            </template>
        </v-data-table>
    =======
        <v-container>
            <v-col color="primary" v-for="n in 6" :key="n" cols="12" md="12">
                <v-item>
                    <v-card class="d-flex flex-row align-items-center" height="100">
                        <v-img :aspect-ratio="16/9"
          :width="50"
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>
                        <div class="d-flex flex-column">
    
                            <v-card-title>
                                <h1>NOME DO ALUNO</h1>
                            </v-card-title>
                            <v-card-subtitle>
                                <h2>RA</h2>
                            </v-card-subtitle>
    
                        </div>
                        <v-card-actions>
    
                            <v-spacer></v-spacer>
    
                            <v-btn icon @click="show = false">
                                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                            </v-btn>
                        </v-card-actions>
    
                        <v-expand-transition>
                            <div v-show="show">
    
                                <v-card-text>
                                    Texto texto texto texto
                                </v-card-text>
                            </div>
                        </v-expand-transition>
                    </v-card>
                </v-item>
            </v-col>
        </v-container>
    >>>>>>> Stashed changes
    </template>
    
    <script>
    import _ from 'lodash';
    import StudentUtils from '@/utils/StudentUtils';
    
    export default {
        name: 'SubjectList',
        props: {
            students: {
                type: Array,
                required: true,
            },
        },
        data: () => ({
            headers: StudentUtils.getDefaultTableHeaders(),
        }),
        computed: {
            tableIsEmpty() {
                return _.isEmpty(this.students);
            },
        },
    };
    </script>
    