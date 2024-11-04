<script setup lang="ts">
import {computed, defineProps, onMounted, ref} from 'vue';
import { useStore } from 'vuex';

const store = useStore()
const { id } = defineProps<{ id: string }>()
const event = computed(() => store.getters['eventDetails/event'])
const tickets = computed(() => store.getters['eventDetails/tickets'])
const loader = computed(() => store.getters['eventDetails/loader'])
const search = ref<string>('');
const headers = [
    { title: 'Type', key: 'type' },
    { title: 'Price', key: 'price' },
    { title: 'Number of available tickets', key: 'numberAvailableTickets'},
    { title: 'Actions', key: 'actions' },
]

onMounted(() => {
    store.dispatch('eventDetails/fetchEventDetails', id);
});

function editTicket(item: TicketInterface) {
    console.log(item);
}

function deleteTicket(id: string) {
    store.dispatch('eventDetails/removeTicket', id);
}
</script>

<template>
    <p v-if="!event">Loading organizer data...</p>

    <v-data-table v-else
      :headers="headers"
      :items="tickets"
      :search="search"
      :hover=true
      :loading="loader"
      class="elevation-1"
    >

        <template v-slot:top>
            <v-container>
                <v-card>
                    <v-card-title class="text-overline">
                        <h1>
                            {{event.name}}
                        </h1>

                        <div class="text-green-darken-3 text-h3 font-weight-bold">
                            {{event.type}}
                        </div>

                        <div class="text-h6 text-medium-emphasis font-weight-regular">
                            <address>{{event.country}} - {{event.city}}</address>
                            <address>{{event.address}}</address>
                        </div>
                        <div class="d-flex justify-space-between py-3">
                            <h3
                                class="font-weight-medium"
                                :class="event.passed == true ? 'text-red-darken-1' : 'text-green-darken-3'"
                            >
                                {{ event.date }} {{event.passed === true ? 'PASSED' : ''}}
                            </h3>
                        </div>
                    </v-card-title>
                    <br>
                    <v-card-text>
                        <div class="d-flex justify-space-between py-3">
                              <span class="text-green-darken-3 font-weight-medium">
                                {{ event.description }}
                              </span>
                        </div>
                    </v-card-text>
                </v-card>
            </v-container>

            <v-toolbar
                flat
            >
                <v-toolbar-title class="text-amber">
                    Tickets for event
                </v-toolbar-title>
                <v-divider
                    class="mx-4"
                    inset
                    vertical
                ></v-divider>
                <v-dialog
                    max-width="500px"
                >
                    <template v-slot:activator="{ props }">
                        <v-btn
                            class="mb-2"
                            color="primary"
                            dark
                            v-bind="props"
                            :to="{ name: 'ticket-create' }"
                        >
                            New Item
                        </v-btn>
                    </template>
                </v-dialog>
            </v-toolbar>
        </template>

        <template v-slot:item="{ item }">
            <tr>
                <td>{{ item.type }}</td>
                <td>${{ item.price }}</td>
                <td>{{ item.numberAvailableTickets }}</td>
                <td>
                    <v-icon
                        class="me-2 text-cyan"
                        size="small"
                        @click="editTicket(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        class="me-2 text-red-accent-1"
                        size="small"
                        @click="deleteTicket(item.id)"
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
