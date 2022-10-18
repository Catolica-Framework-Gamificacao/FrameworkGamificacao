<template>
    <div v-if="tableIsEmpty">
        <v-row>
            <v-col cols="12"> Não existem dados para serem mostrados. </v-col>
        </v-row>
    </div>
    <div v-else>
        <v-container>
            <v-item-group>
                <v-container>
                    <v-row>
                        <v-col color="primary" v-for="subject in subjects" :key="subject.uid" cols="12" md="4">
                            <v-item>
                                <v-card :style="{ backgroundColor: randomColor() }" class="mx-auto" elevation="6">
                                    <v-card-title>
                                        {{ subject.name }}
                                        <v-spacer></v-spacer>
                                        <v-btn icon>
                                            <v-icon @click="openEditDialog(subject.uid)">mdi-cog</v-icon>
                                        </v-btn>
                                    </v-card-title>
                                    <v-card-text class="text-left">
                                        {{ subject.description }}
                                    </v-card-text>
                                </v-card>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-container>
            </v-item-group>
        </v-container>
    </div>
</template>

<script>
import _ from 'lodash';
import DisciplineUtils from '@/utils/DisciplineUtils';

export default {
    name: 'SubjectList',
    props: {
        subjects: {
            type: Array,
            required: true,
        },
    },
    data: () => ({
        headers: DisciplineUtils.getDefaultTableHeaders(),
    }),
    computed: {
        tableIsEmpty() {
            return _.isEmpty(this.subjects);
        },
    },
    methods: {
        randomColor() {
            const r = () => Math.floor(256 * Math.random());
            const total = `rgb(${r()}, ${r()}, ${100})`;
            return total;
        },
        openEditDialog(uid) {
            console.log(uid);
        },
    },
};
</script>
