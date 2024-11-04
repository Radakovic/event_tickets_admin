<template>
    <EventCreate :id="id" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import EventCreate from "@/components/Events/EventCreate.vue";

const route = useRoute();

const id = route.params.id;
</script>
