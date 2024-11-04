<template>
    <TicketEdit :id="id" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import TicketEdit from "@/components/Tickets/TicketEdit.vue";

const route = useRoute();

const id = route.params.id;
</script>
