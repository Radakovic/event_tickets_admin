<script setup lang="ts">
import {onMounted} from "vue";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

onMounted (() => {
    store.dispatch('logout/logout')
        .then(() => {
            router.push({name: 'login'})
        })
})
</script>
<template></template>
