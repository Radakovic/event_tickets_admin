<script setup lang="ts">
    import {ref, onMounted} from 'vue';
    import axios from "axios";

    interface EventInterface {
        id: string;
        name: string;
        city: string;
        address: string;
        country: string;
        date: any;
        description: string;
        link: string;
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

    onMounted(() => {
        axios.get('/events')
            .then(response => parseResponse(response.data))
            .catch(error => {
                console.error('Error fetching organizers:', error);
            });
    })


    function parseResponse(data: any) {
        for (let item of data.member) {
            console.log(new Date(Date.parse(item.date)).toUTCString());
            let date = new Date(Date.parse(item.date)).toUTCString();
            let event = {
                id: item.id,
                address: item.address,
                city: item.city,
                name: item.name,
                country: item.country,
                date: date,
                description: item.description,
                link: '/events/' + item.id
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
                <td>
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
            </tr>
        </template>
    </v-data-table>
</template>

<style scoped lang="sass">

</style>
