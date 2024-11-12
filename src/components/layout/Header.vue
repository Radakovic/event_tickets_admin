<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const handleReset = () => {
    localStorage.clear();
    router.push({
        name: 'login'
    })
}
</script>

<template>
    <v-app-bar>
        <v-app-bar-title>Event tickets admin</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn @click="handleReset" class="app-logout">
            Logout
        </v-btn>
<!--        <v-app-bar-title class="app-logout">Logout</v-app-bar-title>-->
    </v-app-bar>


</template>

<style scoped>
.app-logout {
    text-align: right;
    padding-right: 25px;
}
</style>
