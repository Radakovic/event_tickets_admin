<template>
    <EventEdit :id="id" />
</template>

<script setup lang="ts">
import EventEdit from "@/components/Events/EventEdit.vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const id = route.params.id;
</script>
