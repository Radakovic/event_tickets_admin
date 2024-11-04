<template>
    <EventDetails :id="id" />
</template>

<script setup lang="ts">
    import EventDetails from "@/components/Events/EventDetails.vue";
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const id = route.params.id;
</script>
