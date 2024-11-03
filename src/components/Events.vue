<script setup lang="ts">
    import {ref, onMounted} from 'vue';
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

    const events = ref<EventInterface[]>([])

    const headers = [
        { title: 'Name', key: 'name', sortable: true },
        { title: 'City', key: 'city', sortable: true },
        { title: 'Address', key: 'address', sortable: true },
        { title: 'Country', key: 'country', sortable: true },
        { title: 'Date', key: 'date', sortable: true },
        { title: 'Actions', key: 'actions', sortable: false },
    ]

    const search = ref()

    onMounted(() => {
        axios.get('/events')
            .then(response => parseResponse(response.data))
            .catch(error => {
                console.error('Error fetching organizers:', error);
            });
    })


    function parseResponse(data: any) {
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
    }

    function navigateToLink(link: string) {
        window.location.href = link;
    }

    function editEvent(item: EventInterface) {
        console.log(item);
    }

    function deleteEvent(item: EventInterface) {
        console.log(item);
    }
</script>

<template>
    <v-data-table
        :headers="headers"
        :items="events"
        :search="search"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar
                flat
            >
                <v-toolbar-title>Events</v-toolbar-title>
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
                <td @click="navigateToLink(item.link)" style="cursor: pointer;" class="text-cyan">{{ item.name }}</td>
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
                <td  v-else>
                    PASSED
                </td>
            </tr>
        </template>
    </v-data-table>
</template>

<style scoped lang="sass">

</style>
