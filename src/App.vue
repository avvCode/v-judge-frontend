<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-if="route.path.startsWith('/admin')">
      <AdminLayout />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import AdminLayout from "@/layouts/AdminLayout.vue";

const route = useRoute();
const doInit = () => {
  console.log("...");
};
onMounted(() => {
  doInit();
});
</script>
