<template>
  <router-link
    :to="'/launches/' + data.id"
    class="hover:bg-secondary-500 block rounded-lg p-4 shadow-md transition"
  >
    <h4 class="mb-2 text-lg font-semibold">{{ data.name }}</h4>
    <span class="w-96 text-gray-600">{{ data.date_local }}</span>
  </router-link>
</template>

<script lang="ts" setup>
interface dataInterface {
  id: string;
  name: string;
  date_local: string;
}
interface launchComponentProps {
  data: dataInterface;
}

defineProps<launchComponentProps>();
</script>
