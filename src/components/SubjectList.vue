<template>
    <div v-if="tableIsEmpty">
    <v-container>
    <v-item-group>
    <v-container>
      <v-row>
        <v-col
        color=primary
          v-for="n in 6"
          :key="n"
          cols="12"
          md="4"
        >
          <v-item>
            <v-card
            :style="{backgroundColor: randomColor()}"
            class="d-flex text-start overflow-auto"
              height="100"
            >
            <v-card-text>
                <h2>Titulo da</h2>
                <p>Texto da disciplina</p>
                </v-card-text>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
    </v-container>
    </div>
    <v-data-table
        v-else
        dense
        :headers="headers"
        :items="subjects"
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
            const total = `rgb(${r()}, ${r()}, ${(100)})`;
            return total;
        },
    },
};
</script>
