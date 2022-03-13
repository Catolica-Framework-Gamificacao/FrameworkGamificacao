<template>
    <v-row>
        <v-col xl="3" lg="3" md="4" sm="6" v-for="clazz in classes" :key="clazz.id">
            <v-card class="mx-auto" elevation="6" shaped>
                <v-card-title>
                    {{ clazz.name }}
                    <v-spacer></v-spacer>
                    <v-btn icon><v-icon>mdi-cog</v-icon></v-btn>
                </v-card-title>
                <v-card-subtitle class="text-left">
                    {{ clazz.subject }}
                </v-card-subtitle>
                <v-card-text class="text-left"> Alunos: {{ clazz.studentsAmount }} </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
export default {
    name: 'ClassList',
    props: {
        classes: {
            type: Array,
            required: true,
        },
    },
    data: () => ({}),
};
</script>
'
