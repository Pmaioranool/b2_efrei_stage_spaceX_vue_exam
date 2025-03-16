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
      <select name="" id="" class="bg-primary px-4 py-2 sm:px-8 sm:py-3">
        <option value="">Tous les lancements</option>
        <option value="">Lancements réussis</option>
        <option value="">Lancements échoués</option>
      </select>
    </form>
  </section>

  <!-- select of others missions -->
  <section>
    <h3>Les autres mission</h3>
  </section>
</template>

<script lang="ts" setup>
const nextLaunch = {
  name: "Crew-4",
  date: "2025-01-01",
};
</script>
