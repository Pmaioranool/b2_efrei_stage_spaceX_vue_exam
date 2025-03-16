<template>
  <HeaderLayout />
  <router-view></router-view>
  <FooterLayout />
</template>

<script setup lang="ts">
import HeaderLayout from "./Layout/HeaderLayout.vue";
import FooterLayout from "./Layout/FooterLayout.vue";
</script>
