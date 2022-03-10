<template>
    <div>
        <v-list-item>
            <v-list-item-content>
                <v-list-item-title class="text-h6"> User </v-list-item-title>
                <v-list-item-subtitle> Ludus &copy;</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav shaped>
            <v-list-item
                v-for="item in items"
                :key="item.title"
                router
                :to="item.route"
                link
            >
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title class="text-left">
                        {{ item.title }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
export default {
    name: 'Navbar',
    props: {
        items: {
            type: Array,
            required: true,
        },
    },
    data: () => ({}),
};
</script>
