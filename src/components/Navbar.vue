<template>
    <div>
        <v-list-item>
            <v-list-item-avatar>
                <v-img :src="profilePictureSrc"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="text-h6">
                    <span>{{ userDisplayName }}</span>
                </v-list-item-title>
                <v-list-item-subtitle> Ludus &copy;</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
            <v-list-item-group active-class="bg-active">
                <v-list-item v-for="item in items" :key="item.title" router :to="item.route" link>
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title class="text-left">
                            {{ item.title }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
import StorageUtils from '@/utils/StorageUtils';

export default {
    name: 'Navbar',
    props: {
        items: {
            type: Array,
            required: true,
        },
        mini: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data: () => ({
        // https://cdn.vuetifyjs.com/images/john.png
        profilePictureSrc: 'https://cdn.vuetifyjs.com/images/john.png',
        userDisplayName: 'Usuário do sistema',
    }),
    created() {
        const user = StorageUtils.getCurrentUser();
        if (user) {
            this.userDisplayName = user.name;
            if (user.profilePictureSrc) {
                this.profilePictureSrc = user.profilePictureSrc;
            }
            console.log(user);
        }
    },
};
</script>

<style scoped>
.bg-active {
    background-color: #181818;
}
</style>
