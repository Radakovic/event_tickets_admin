<script setup lang="ts">
    import { defineProps, onMounted, ref } from 'vue';
    // import axios from 'axios';
    //
    // interface EventInterface {
    //     id: string;
    //     name: string;
    //     city: string;
    //     address: string;
    //     country: string;
    //     date: any; // Specify a more precise type if possible
    //     description: string;
    //     passed: boolean;
    //     type: string;
    // }
    //
    // interface OrganizerInterface {
    //     id: string;
    //     name: string;
    //     events: EventInterface[];
    // }
    //
    // // Initialize organizer as a ref with a default value of null
    // const organizer = ref<OrganizerInterface | null>(null);
    // const events = ref<EventInterface[]>([]);
    // const search = ref<string>('');
    //
    // // Define table headers
    // const headers = [
    //     { title: 'Name', key: 'name', sortable: true },
    //     { title: 'Type', key: 'type', sortable: true },
    //     { title: 'City', key: 'city', sortable: true },
    //     { title: 'Address', key: 'address', sortable: true },
    //     { title: 'Country', key: 'country', sortable: true },
    //     { title: 'Date', key: 'date', sortable: true },
    //     { title: 'Description', key: 'description', sortable: true },
    //     { title: 'Actions', key: 'actions', sortable: false },
    // ];


    const { id } = defineProps<{ id: string }>();

    // onMounted(() => {
    //     axios.get(`/organizers/${id}`)
    //         .then(response => parseResponse(response.data))
    //         .catch(error => {
    //             console.error('Error fetching organizers:', error);
    //         });
    // });
</script>

<template>
    <h1>{{ id }}</h1>
</template>

<style scoped lang="sass">

</style>
