<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const { id } = defineProps<{ id: string }>();
const organizer = computed(() => store.getters['organizerDetails/organizer']);
const events = computed(() => store.getters['organizerDetails/events']);
const loader = computed(() => store.getters['organizerDetails/loader']);
const search = ref<string>('');
const headers = [
    { title: 'Name', key: 'name', sortable: true },
    { title: 'Type', key: 'type', sortable: true },
    { title: 'City', key: 'city', sortable: true },
    { title: 'Country', key: 'country', sortable: true },
    { title: 'Date', key: 'date', sortable: true },
    { title: 'Actions', key: 'actions', sortable: false },
];

onMounted(() => {
    store.dispatch('organizerDetails/fetchOrganizerDetails', id);
});

function removeEvent(id: string) {
    store.dispatch('organizerDetails/removeEvent', id)
}
</script>

<template>
    <p v-if="!organizer">Loading organizer data...</p>

    <v-data-table v-else
      :headers="headers"
      :items="events"
      :search="search"
      :loading="loader"
      :hover=true
      class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title class="text-amber">{{organizer.name}} - List of events</v-toolbar-title>
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
                <td>{{ item.type }}</td>
                <td>{{ item.city }}</td>
                <td>{{ item.country }}</td>
                <td>{{ item.date }}</td>
                <td>
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
            </tr>
        </template>
    </v-data-table>

</template>

<style scoped lang="sass">

</style>
