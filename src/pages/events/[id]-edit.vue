<template>
    <EditEvent :id="id" />
</template>

<script setup lang="ts">
import EditEvent from "@/components/EditEvent.vue";
import { useRoute } from 'vue-router';

const route = useRoute();

const id = route.params.id;
</script>
