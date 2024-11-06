<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
    store.dispatch('organizer/fetchOrganizers');
});

const organizers = computed(() => store.getters['organizer/organizers']);

const search = ref('');
const headers = ref([
    { title: 'Name', key: 'name', sortable: true },
    { title: 'City', key: 'city', sortable: true },
    { title: 'Address', key: 'address', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false },
]);

function removeOrganizer(item) {
    store.dispatch('organizer/deleteItem', item);
}
</script>


<template>
    <v-data-table
        :headers="headers"
        :items="organizers"
        :search="search"
        :hover=true
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title class="text-amber">Organizers</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-text-field
                    v-model="search"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                ></v-text-field>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog
                    max-width="500px"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            class="mb-2"
                            color="primary"
                            dark
                            v-bind="props"
                            :to="{ name: 'organizer-create' }"
                            transition="false"
                        >
                            Create new organizer
                        </v-btn>
                    </template>
                </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item="{ item }">
            <tr>
                <td>
                    <router-link :to="{ name: 'organizer-details', params: { id: item.id } }" class="text-cyan">
                        {{ item.name }}
                    </router-link>
                </td>
                <td>{{ item.city }}</td>
                <td>{{ item.address }}</td>
                <td>
                    <router-link :to="{ name: 'organizer-edit', params: { id: item.id } }" class="text-cyan">
                        <v-icon
                            class="me-2 text-cyan"
                            size="small"
                        >
                            mdi-pencil
                        </v-icon>
                    </router-link>
                    <v-icon
                        class="me-2 text-red-accent-1"
                        size="small"
                        @click="removeOrganizer(item)"
                    >
                        mdi-delete
                    </v-icon>
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<style scoped lang="sass">

</style>
