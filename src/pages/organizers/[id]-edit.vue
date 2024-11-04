<template>
    <OrganizerEdit :id="id" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import OrganizerEdit from "@/components/Organizers/OrganizerEdit.vue";

const route = useRoute();

const id = route.params.id;
</script>
