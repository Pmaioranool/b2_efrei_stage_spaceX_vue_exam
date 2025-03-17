<template>
  <main>
    <div
      class="bg-primary flex items-center justify-center rounded-lg p-4 shadow-md"
    >
      <img
        :src="launch.links.patch.large"
        alt="image de la mission"
        v-if="launch.links.patch.large"
        class="mb-4 h-auto w-150 rounded-t-lg"
      />
      <section class="m-10">
        <h2 v-if="launch.name" class="mb-4 text-2xl font-bold">
          Nom : {{ launch.name }}
        </h2>
        <p v-if="formattedDate" class="mb-2 text-lg">
          Lancée le : {{ formattedDate }} ({{ timeRemaining }})
        </p>
        <p v-if="!launch.details" class="mb-2 text-red-500">
          Les détails sont pour les lancements échoués
        </p>
        <p v-if="launch.details" class="mb-2 text-lg">
          Détails de lancement : {{ launch.details }}
        </p>
        <a
          :href="launch.links.wikipedia"
          v-if="launch.links.wikipedia"
          target="_blank"
          class="mb-2 block text-blue-500 hover:underline"
          >Lien Wikipedia</a
        >
        <a
          :href="launch.links.reddit.launch"
          v-if="launch.links.reddit.launch"
          target="_blank"
          class="mb-2 block text-blue-500 hover:underline"
          >Lien Reddit</a
        >

        <p v-if="launchpad.locality" class="mb-2 text-lg">
          Localisation : {{ launchpad.locality }}
        </p>
        <p v-if="payloads.name" class="mb-2 text-lg">
          Chargements envoyés : {{ payloads.name }}
          <span v-if="payloads.type">({{ payloads.type }})</span>
        </p>
        <p v-if="payloads.customers" class="mb-2 text-lg">
          Clients :
          <span
            v-for="client in payloads.customers"
            :key="client"
            class="block"
            >{{ client }}</span
          >
        </p>
      </section>
    </div>

    <div class="bg-primary mt-6 flex flex-col items-center p-6">
      <form
        v-if="launch.links.youtube_id"
        class="mb-4 flex items-center space-x-2"
      >
        <label for="ytb_btn" class="text-gray-300">Afficher la vidéo</label>
        <input
          id="ytb_btn"
          type="checkbox"
          v-model="ytb_show"
          class="rounded border-gray-600"
        />
      </form>
      <iframe
        v-if="ytb_show"
        width="720"
        height="480"
        :src="`https://www.youtube.com/embed/${launch.links.youtube_id}`"
        title="YouTube video player"
        frameborder="0"
        class="w-full max-w-200 rounded-lg shadow-md"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
  </main>
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
