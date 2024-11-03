<template>
    <OrganizerDetails :id = "id" />
</template>

<script setup lang="ts">

import OrganizerDetails from "@/components/OrganizerDetails.vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const id = route.params.id;

</script>

