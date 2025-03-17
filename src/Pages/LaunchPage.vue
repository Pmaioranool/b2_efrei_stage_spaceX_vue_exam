<template>
  <h2>{{ launch.name }}</h2>
  <p>{{ launch.date }}</p>
  <p>{{ launch.text }}</p>
  <img :src="launch.Image" alt="image de la mission" />
  <a :href="launch.link" target="_blank">lien utile</a>
  <form action="">
    <label for="ytb_btn">YouTube video</label>
    <input id="ytb_btn" type="checkbox" v-model="ytb_show" />
  </form>
  <a :href="launch.ytbLink" v-if="ytb_show" target="_blank">video YouTube</a>
  <p>{{ launch.location }}</p>
  <p>{{ launch.payloads }}</p>
  <p>{{ launch.clients }}</p>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const ytb_show = ref(false);

watch(ytb_show, (newVal) => {
  console.log(newVal);
});

const route = useRoute();
const launch = ref({
  name: "",
  date: "",
  text: "",
  Image: "",
  link: "",
  ytbLink: "",
  location: "",
  payloads: "",
  clients: "",
});

onMounted(() => {
  const id = route.params.id;
  // Fetch the launch data based on the id
  // For now, we'll use a static example
  if (id === "1") {
    launch.value = {
      name: "FalconSat",
      date: "24-03-2020",
      text: "Engine failure at 33 seconds because of a turbopump failure",
      Image:
        "https://camo.githubusercontent.com/20fb7881149da5c31638ed493bc3718db7c93e3b30cf095af44da2256a63b62c/68747470733a2f2f6c6976652e737461746963666c69636b722e636f6d2f36353533352f34393138353134393132325f333766356335326534335f6b2e6a7067",
      link: "https://en.wikipedia.org/wiki/DemoSat",
      ytbLink: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
      location: "CCAFS SLC 40",
      payloads: "FalconSat",
      clients: "DARPA",
    };
  }
  // Add more conditions for other ids if needed
});
</script>
