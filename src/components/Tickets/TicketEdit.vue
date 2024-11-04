<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';

const { id } = defineProps<{ id: string }>();
</script>

<template>
    <h1>Tickets EDIT PAGE - Ticket id - {{ id }}</h1>
</template>

<style scoped lang="sass">

</style>
