<template>
  <!-- next launch section -->
  <section class="px-4 py-2 sm:px-8 sm:py-3">
    <h2 class="">Prochain lancement</h2>
    <p>
      Le prochain lancement
      <span class="font-semibold">{{ nextLaunch.name }}</span>
      est prévu pour le
      {{ nextLaunch.date }}
    </p>
  </section>

  <!-- filter form -->
  <section>
    <!-- watch to see if the select change -->
    <h2>filtre des mission</h2>
    <form action="">
      <select
        name=""
        id=""
        class="bg-primary px-4 py-2 sm:px-8 sm:py-3"
        v-model="filter"
      >
        <option value="all">Tous les lancements</option>
        <option value="success">Lancements réussis</option>
        <option value="failure">Lancements échoués</option>
      </select>
    </form>
  </section>

  <!-- select of others missions -->
  <section>
    <h3>Les autres mission</h3>
    <LaunchComponent
      v-for="launch in launches"
      :key="launch.id"
      :data="launch"
    ></LaunchComponent>
  </section>
</template>

<script lang="ts" setup>
import LaunchComponent from "../components/LaunchComponent.vue";
import { ref, watch } from "vue";

const nextLaunch = {
  name: "Crew-4",
  date: "2025-01-01",
};

const launches = [
  {
    id: "1",
    name: "FalconSat",
    date: "24-03-2020",
  },
  {
    id: "2",
    name: "Falcon 1",
    date: "24-03-2006",
  },
];

const filter = ref("all");

watch(filter, (newVal) => {
  console.log(newVal);
});
</script>
