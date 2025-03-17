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
      v-for="launch in oldLaunches"
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

export interface Launch {
  id: string;
  name: string;
  date_local: string;
  text?: string;
  Image?: string;
  link?: string;
  ytbLink?: string;
  location?: string;
  payloads?: string;
  clients?: string;
}

const nextLaunch = ref<Launch>({ id: "", name: "", date_local: "" });
const date = ref("");

const oldLaunches = ref<Launch[]>([
  { id: "", name: "", date_local: "" },
  { id: "", name: "", date_local: "" },
]);

const NextLaunchFetch = useFetch(
  "https://api.spacexdata.com/v5/launches/latest",
);

watch(NextLaunchFetch.data, (newData) => {
  if (newData) {
    console.log(newData);
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

watch(filter, (newVal) => {
  console.log(newVal);
});

const oldLaunchesFetch = useFetch(
  "https://api.spacexdata.com/v5/launches/past",
);

watch(oldLaunchesFetch.data, (newData) => {
  if (newData) {
    console.log(newData);
    oldLaunches.value = newData.slice(-10); // Prendre les 10 derniers lancements
  }
});
</script>
