<template>
  <v-layout class="rounded rounded-md">
    <Header />
    <Sidebar />

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      <router-view></router-view>
    </v-main>

  </v-layout>
</template>

<script setup>
  import Header from "@/components/layout/Header.vue";
  import Sidebar from "@/components/layout/Sidebar.vue";
</script>
