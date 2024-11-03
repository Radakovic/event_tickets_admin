<script setup lang="ts">
    import { defineProps, onMounted, ref } from 'vue';
    import axios from 'axios';

    interface EventInterface {
        id: string;
        name: string;
        city: string;
        address: string;
        country: string;
        date: any; // Specify a more precise type if possible
        description: string;
        passed: boolean;
        type: string;
    }

    interface OrganizerInterface {
        id: string;
        name: string;
        events: EventInterface[];
    }

    // Initialize organizer as a ref with a default value of null
    const organizer = ref<OrganizerInterface | null>(null);
    const events = ref<EventInterface[]>([]);
    const search = ref<string>('');

    // Define table headers
    const headers = [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'Type', key: 'type', sortable: true },
        { title: 'City', key: 'city', sortable: true },
        { title: 'Address', key: 'address', sortable: true },
        { title: 'Country', key: 'country', sortable: true },
        { title: 'Date', key: 'date', sortable: true },
        { title: 'Description', key: 'description', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false },
    ];


    const { id } = defineProps<{ id: string }>();

    onMounted(() => {
        axios.get(`/organizers/${id}`)
            .then(response => parseResponse(response.data))
            .catch(error => {
                console.error('Error fetching organizers:', error);
            });
    });

    function parseResponse(data: any) {
        console.log(data)
        if (data && data.id && data.name) {
            organizer.value = {
                id: data.id,
                name: data.name,
                events: [],
            };

            for (let item of data.events) {
                let passed: boolean = Date.parse(new Date().toString()) > Date.parse(item.date);
                let event: EventInterface = {
                    id: item.id,
                    address: item.address,
                    city: item.city,
                    country: item.country,
                    date: item.date,
                    description: item.description,
                    name: item.name,
                    type: item.type,
                    passed: passed
                };
                events.value.push(event);
            }

            organizer.value.events = events.value;
        } else {
            console.error('Invalid data received:', data);
        }
    }
</script>

<template>
    <p v-if="!organizer">Loading organizer data...</p>

    <v-data-table v-else
        :headers="headers"
        :items="organizer.events"
        :search="search"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title class="text-amber">{{organizer.name}}</v-toolbar-title>
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
                <!--        <v-dialog-->
                <!--            v-model="dialog"-->
                <!--            max-width="500px"-->
                <!--        >-->
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
                <!--                <td @click="navigateToLink(item.link)" style="cursor: pointer;" class="text-cyan">{{ item.name }}</td>-->
                <td>
                    <router-link :to="{ name: '/events/[id]', params: { id: item.id } }" class="text-cyan">
                        {{ item.name }}
                    </router-link>
                </td>
                <td>{{ item.type }}</td>
                <td>{{ item.city }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.country }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.description }}</td>
                <td>
                    <v-icon
                        class="me-2 text-cyan"
                        size="small"
                        @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        class="me-2 text-red-accent-1"
                        size="small"
                        @click="deleteItem(item)"
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
