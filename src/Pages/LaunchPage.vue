<template>
  <h2 v-if="launch.name">Nom : {{ launch.name }}</h2>
  <p v-if="formattedDate">
    Lancée le : {{ formattedDate }} ({{ timeRemaining }})
  </p>
  <p v-if="!launch.details">Les détails sont pour les lancements échoués</p>
  <p v-if="launch.details">Détails de lancement : {{ launch.details }}</p>
  <img
    :src="launch.links.patch.small"
    alt="image de la mission"
    v-if="launch.links.patch.small"
  />
  <a
    :href="launch.links.wikipedia"
    v-if="launch.links.wikipedia"
    target="_blank"
    >Lien Wikipedia</a
  >
  <a
    :href="launch.links.reddit.launch"
    v-if="launch.links.reddit.launch"
    target="_blank"
    >Lien Reddit</a
  >
  <form action="" v-if="launch.links.youtube_id">
    <label for="ytb_btn">YouTube video</label>
    <input id="ytb_btn" type="checkbox" v-model="ytb_show" />
  </form>
  <iframe
    v-if="ytb_show"
    width="560"
    height="315"
    :src="`https://www.youtube.com/embed/${launch.links.youtube_id}?si=TE0ZslIA9cgmIO6T`"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>

  <p v-if="launchpad.locality">Localisation : {{ launchpad.locality }}</p>
  <p v-if="payloads.name">
    Chargements envoyés : {{ payloads.name }}
    <span v-if="payloads.type">({{ payloads.type }})</span>
  </p>
  <p v-if="payloads.customers">
    Clients :
    <span v-for="client in payloads.customers">{{ client }}</span>
  </p>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useFetch } from "../api/launchInfo";
import { format, formatDistanceToNow } from "date-fns";
import type { LaunchDetails } from "../Types/LaunchDetails";

const ytb_show = ref(false);

const route = useRoute();

const launch = ref<LaunchDetails>({
  fairings: {
    reused: null,
    recovery_attempt: null,
    recovered: null,
    ships: [],
  },
  links: {
    patch: { small: null, large: null },
    reddit: { campaign: null, launch: null, media: null, recovery: null },
    flickr: { small: [], original: [] },
    presskit: null,
    webcast: null,
    youtube_id: null,
    article: null,
    wikipedia: null,
  },
  static_fire_date_utc: null,
  static_fire_date_unix: null,
  net: false,
  window: null,
  rocket: "",
  success: null,
  failures: [],
  details: null,
  crew: [],
  ships: [],
  capsules: [],
  payloads: [],
  launchpad: "",
  flight_number: 0,
  name: "",
  date_utc: "",
  date_unix: 0,
  date_local: "",
  date_precision: "",
  upcoming: false,
  cores: [],
  auto_update: true,
  tbd: false,
  launch_library_id: null,
  id: "",
});
const payloadId = ref<any>();
const launchPadId = ref<any>();

const date = ref("");

const launchFetch = useFetch(
  "https://api.spacexdata.com/v5/launches/" + route.params.id,
);

watch(launchFetch.data, (newData) => {
  if (newData) {
    launch.value = newData;
    date.value = newData.date_local;
    payloadId.value = newData.payloads;
    payloadsFetch(payloadId.value);
    launchPadId.value = newData.launchpad;
    launchPadFetch(launchPadId.value);
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

const payloads = ref<any>({});

async function payloadsFetch(payloadId: string) {
  const payloadsFetch = useFetch(
    "https://api.spacexdata.com/v4/payloads/" + payloadId,
  );

  watch(payloadsFetch.data, (newData) => {
    if (newData) {
      payloads.value = newData;
    }
  });
}

const launchpad = ref<any>({});

async function launchPadFetch(launchPadId: string) {
  const launchPadFetch = useFetch(
    "https://api.spacexdata.com/v4/launchpads/" + launchPadId,
  );

  watch(launchPadFetch.data, (newData) => {
    if (newData) {
      launchpad.value = newData;
    }
  });
}
</script>
