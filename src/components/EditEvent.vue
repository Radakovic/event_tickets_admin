<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';

const { id } = defineProps<{ id: string }>();
</script>

<template>
    <h1>Edit PAGE - Event - {{ id }}</h1>

</template>

<style scoped lang="sass">

</style>
