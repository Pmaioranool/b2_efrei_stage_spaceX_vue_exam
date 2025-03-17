<template>
  <main>
    <!-- next launch section -->
    <router-link :to="'/launches/' + nextLaunch.id">
      <section class="bg-primary px-4 py-2 sm:px-8 sm:py-3">
        <h2 class="mb-2 text-xl font-bold">Prochain lancement</h2>
        <p class="text-lg">
          Le prochain lancement
          <span class="font-semibold">{{ nextLaunch.name }}</span>
          est prévu pour le
          {{ formattedDate }} ({{ timeRemaining }})
        </p>
        <p class="text-lg">
          Décompte : <span class="font-semibold">{{ countdown }}</span> secondes
        </p>
      </section>
    </router-link>

    <!-- filter form -->
    <section class="mt-8">
      <h2 class="mb-2 text-xl font-bold">Filtre des missions</h2>
      <form action="">
        <select
          name=""
          id=""
          class="focus:ring-primary bg-primary rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:outline-none sm:px-8 sm:py-3"
          v-model="filter"
        >
          <option value="all">Tous les lancements</option>
          <option value="success">Lancements réussis</option>
          <option value="failure">Lancements échoués</option>
        </select>
      </form>
    </section>

    <!-- select of others missions -->
    <section class="mt-8">
      <h3 class="mb-2 text-xl font-bold">Les autres missions</h3>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <LaunchComponent
          v-for="launch in filteredLaunches.slice(-12)"
          :key="launch.id"
          :data="launch"
          class="bg-secondary ml-50 flex size-100 h-32 flex-wrap items-center justify-center rounded-lg p-4 text-center shadow-md"
        ></LaunchComponent>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import LaunchComponent from "../components/LaunchComponent.vue";
import { ref, watch, computed } from "vue";
import { useFetch } from "../api/launchInfo";
import { format, formatDistanceToNow } from "date-fns";
import type { Launch } from "../Types/LaunchDetails";

const nextLaunch = ref<Launch>({ id: "", name: "", date_local: "" });
const date = ref("");

const oldLaunches = ref<Launch[]>([]);

const NextLaunchFetch = useFetch(
  "https://api.spacexdata.com/v5/launches/latest",
);

watch(NextLaunchFetch.data, (newData) => {
  if (newData) {
    nextLaunch.value = newData;
    date.value = newData.date_local;
  }
});

const formattedDate = computed(() => {
  if (date.value) {
    return format(new Date(date.value), "dd/MM/yyyy");
  }
  return "";
});

const timeRemaining = computed(() => {
  if (date.value) {
    return formatDistanceToNow(new Date(date.value), { addSuffix: true });
  }
  return date.value;
});

const countdown = computed(() => {
  if (date.value) {
    const launchDate = new Date(date.value).getTime();
    const now = new Date().getTime();
    return Math.max(Math.floor((launchDate - now) / 1000), 0);
  }
  return 0;
});

const filter = ref("all");

const oldLaunchesFetch = useFetch(
  "https://api.spacexdata.com/v5/launches/past",
);

watch(oldLaunchesFetch.data, (newData) => {
  if (newData) {
    oldLaunches.value = newData.map((launch: any) => ({
      ...launch,
      date_local: format(new Date(launch.date_local), "dd/MM/yyyy"),
    }));
  }
});

const filteredLaunches = computed(() => {
  if (filter.value === "all") {
    return oldLaunches.value;
  } else if (filter.value === "success") {
    return oldLaunches.value.filter((launch) => launch.success);
  } else if (filter.value === "failure") {
    return oldLaunches.value.filter((launch) => !launch.success);
  }
  return oldLaunches.value;
});
</script>
