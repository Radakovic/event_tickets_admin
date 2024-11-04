<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import axios from 'axios';
import moment from "moment"

interface EventInterface {
    id: string;
    name: string;
    city: string;
    address: string;
    country: string;
    date: any;
    description: string;
    passed: boolean;
    type: string;
    tickets: TicketInterface[]
}

interface TicketInterface {
    id: string;
    price: string;
    type: string;
    numberAvailableTickets: number
}

const event = ref<EventInterface | null>(null);
const search = ref<string>('');

// Define table headers
const headers = [
    { title: 'Type', key: 'type' },
    { title: 'Price', key: 'price' },
    { title: 'Number of available tickets', key: 'numberAvailableTickets'},
    { title: 'Actions', key: 'actions' },
];


const { id } = defineProps<{ id: string }>();

onMounted(() => {
    axios.get(`/events/${id}`)
        .then(response => parseResponse(response.data))
        .catch(error => {
            console.error('Error fetching organizers:', error);
        });
});

function parseResponse(data: any) {
    if (data) {
        const passed: boolean = Date.parse(new Date().toString()) > Date.parse(data.date);
        const date = moment(data.date).format('MMMM Do YYYY, HH:mm');
        event.value = {
            id: data.id,
            name: data.name,
            city: data.city,
            address: data.address,
            country: data.country,
            date: date,
            description: data.description,
            type: data.type,
            passed: passed
        };

        const tickets = []
        for (let item of data.tickets) {
            let ticket: TicketInterface = {
                id: item.id,
                price: (item.price / 100).toFixed(2),
                type: item.type,
                numberAvailableTickets: item.numberAvailableTickets
            };
            tickets.push(ticket);
        }
        event.value.tickets = tickets;
    } else {
        console.error('Invalid data received:', data);
    }
}
function editTicket(item: TicketInterface) {
    console.log(item);
}

function deleteTicket(item: TicketInterface) {
    axios.delete('/tickets/' + item.id)
        .then(response => console.log(response.data))
        .catch(error => {
            console.error('Error fetching organizers:', error);
        });
    console.log(item)
}
</script>

<template>
    <p v-if="!event">Loading organizer data...</p>

    <v-data-table v-else
      :headers="headers"
      :items="event.tickets"
      :search="search"
      :hover=true
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
                        @click="deleteTicket(item)"
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
