<!-- <template>
    <v-dialog v-model="dialog" max-width="500px">
        <v-card>
            <v-card-actions>
                <v-btn color="primary" flat @click.stop="dialog = false">Close</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template> -->

<script>
export default {
    name: 'ClassRegisterModal',
    props: {
        value: Boolean,
    },
    computed: {
        dialog: {
            get() {
                return this.dialog;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },
    data: () => ({}),
};
</script>
