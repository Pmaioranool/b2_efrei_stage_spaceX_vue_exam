<template>
    <h2>{{ launch.name }}</h2>
    <p>{{ launch.date }}</p>
    <p>{{ launch.text }}</p>
    <a :href="launch.link" target="_blank">lien utile</a>
    <form action="">
        <input type="checkbox">YouTube video</input>
    </form>
    <a :href="launch.ytbLink" target="_blank">video YouTube</a>
    <p>{{ launch.location }}</p>
    <p>{{ launch.payloads }}</p>
    <p>{{ launch.clients }}</p>
</template>

<script lang="ts" setup>
const launch = {
    name: "FalconSat",
    date: "24-03-2020",
    text: "Engine failure at 33 seconds because of a turbopump failure",
    link: "https://en.wikipedia.org/wiki/DemoSat",
    ytbLink: "https://www.youtube.com/watch?v=0a_00nJ_Y88",
    location: "CCAFS SLC 40",
    payloads: "FalconSat",
    clients: "DARPA",
};
</script>
