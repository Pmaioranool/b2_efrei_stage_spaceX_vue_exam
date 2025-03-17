<template>
  <!-- next launch section -->
  <router-link :to="'/launches/' + nextLaunch.id">
    <section class="px-4 py-2 sm:px-8 sm:py-3">
      <h2 class="">Prochain lancement</h2>
      <p>
        Le prochain lancement
        <span class="font-semibold">{{ nextLaunch.name }}</span>
        est prévu pour le
        {{ formattedDate }} ({{ timeRemaining }})
      </p>
    </section>
  </router-link>

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
      v-for="launch in filteredLaunches.slice(-10)"
      :key="launch.id"
      :data="launch"
    ></LaunchComponent>
  </section>
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
