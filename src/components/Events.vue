<script setup lang="ts">
import {ref} from 'vue';
    import axios from "axios";
    import moment from "moment"

    interface EventInterface {
        id: string;
        name: string;
        city: string;
        address: string;
        country: string;
        date: any;
        description: string;
        link: string;
        passed: boolean;
    }

    interface HeaderInterface {
        title: string;
        key: string;
        sortable: boolean;
    }

    const events = ref<EventInterface[]>([])

    const headers = ref<HeaderInterface[]>([
        { title: 'Name', key: 'name', sortable: false },
        { title: 'City', key: 'city', sortable: false },
        { title: 'Address', key: 'address', sortable: false },
        { title: 'Country', key: 'country', sortable: false },
        { title: 'Date', key: 'date', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false },
    ])

    const search = ref<string>('')
    const page = ref<number>(1)
    const itemsPerPage = ref<number>(10)
    const totalItems = ref<number>(10)
    const loading = ref<boolean>(true)
    const name = ref<string>('')


    const loadItems = (options: { page?: number; itemsPerPage?: number; search?: string, sortBy?: object }) => {
        totalItems.value = 0;
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

        if (Object.keys(sortedBy).length > 0) {
            url.value += `&order[${Object.values(sortedBy)[0]}]=${Object.values(sortedBy)[1]}`;
        }

        axios.get(url.value)
            .then(response => parseResponse(response.data))
            .catch(error => {
                console.error('Error fetching organizers:', error);
            });
    };
    function parseResponse(data: any) {
        events.value = [];
        for (let item of data.member) {
            let date = moment(item.date).format('MMMM Do YYYY, HH:mm');
            let passed: boolean = Date.parse(new Date().toString()) > Date.parse(item.date);
            let event = {
                id: item.id,
                address: item.address,
                city: item.city,
                name: item.name,
                country: item.country,
                date: date,
                description: item.description,
                link: '/events/' + item.id,
                passed: passed
            }
            events.value.push(event)
        }
        loading.value = false
    }

    function navigateToLink(link: string) {
        window.location.href = link;
    }

    function editEvent(item: EventInterface) {
        console.log(item);
    }

    function deleteEvent(item: EventInterface) {
        axios.delete('/events/' + item.id)
            .then(response => console.log(response.data))
            .catch(error => {
                console.error('Error fetching organizers:', error);
            });
        console.log(item)
    }
</script>

<template>
    <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="events"
        :search="search"
        :items-length="totalItems"
        :loading="loading"
        :page="page"
        :hover=true
        @update:options="loadItems"
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
                    <v-icon
                        class="me-2 text-cyan"
                        size="small"
                        @click="editEvent(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        class="me-2 text-red-accent-1"
                        size="small"
                        @click="deleteEvent(item)"
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
