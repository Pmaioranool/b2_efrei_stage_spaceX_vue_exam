<template>
  <router-link :to="'/launches/' + data.id">
    <h4>{{ data.name }}</h4>
    <span>{{ data.date }}</span>
  </router-link>
</template>
<script lang="ts" setup>
interface dataInterface {
  id: string;
  name: string;
  date: string;
}
interface launchComponentProps {
  data: dataInterface;
}

defineProps<launchComponentProps>();
</script>
