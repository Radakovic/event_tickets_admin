<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const onUpdateLoadEvents = (options: { page?: number; itemsPerPage?: number; search?: string, sortBy?: object }) => {

    const url = ref<string>(`/events`)
    const page: number = options.page || 1;
    const itemsPerPageValue: number = options.itemsPerPage || itemsPerPage.value;
    const searchBy: string = options.search || search.value;
    const sortedBy: object = options.sortBy[0] || {};

    url.value += `?page=${page}&itemsPerPage=${itemsPerPageValue}`;

    // disable pagination and return all items
    if (itemsPerPageValue === -1) {
        url.value = `/events?pagination=false`;
    }
    // add query param for searching by name
    if (searchBy !== '') {
        url.value += `&name=${searchBy}`;
    }
    // add query param for ordering
    if (Object.keys(sortedBy).length > 0) {
        url.value += `&order[${Object.values(sortedBy)[0]}]=${Object.values(sortedBy)[1]}`;
    }

    store.dispatch('event/fetchEvents', url.value);
};

function removeEvent(id) {
    store.dispatch('event/removeEvent', id);
}


const events = computed(() => store.getters['event/events']);
const headers = ref([
    { title: 'Name', key: 'name', sortable: false },
    { title: 'City', key: 'city', sortable: false },
    { title: 'Address', key: 'address', sortable: false },
    { title: 'Country', key: 'country', sortable: false },
    { title: 'Date', key: 'date', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false },
])

const search = ref('')
const page = ref(1)
const itemsPerPage = ref(10)
const totalItems = ref(10)
const loader = computed(() => store.getters['event/loader'])
</script>

<template>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="events"
        :search="search"
        :items-length="totalItems"
        :loading="loader"
        :page="page"
        :hover=true
        @update:options="onUpdateLoadEvents"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title class="text-amber">Events</v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-text-field
                    v-model="search"
                    label="Search by name"
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
                            :to="{ name: 'event-create' }"
                        >
                            New Item
                        </v-btn>
                    </template>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item="{ item }">
            <tr>
                <td>
                    <router-link :to="{ name: 'event-details', params: { id: item.id } }" class="text-cyan">
                        {{ item.name }}
                    </router-link>
                </td>
                <td>{{ item.city }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.country }}</td>
                <td>{{ item.date }}</td>
                <td v-if="!item.passed">
                    <router-link :to="{ name: 'event-edit', params: { id: item.id } }" class="text-cyan">
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
                        @click="removeEvent(item.id)"
                    >
                        mdi-delete
                    </v-icon>
                </td>
                <td v-else class="text-red-darken-1">
                    PASSED
                </td>
            </tr>
        </template>
    </v-data-table-server>
</template>

<style scoped lang="sass">

</style>
