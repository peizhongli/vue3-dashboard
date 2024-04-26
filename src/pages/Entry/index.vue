<script setup lang="ts">
import { ref } from "vue";
import MapChart from "@components/MapChart/index.vue";

const mapData = [
  { code: "110000", value: 290 },
  { code: "120000", value: 320 },
  { code: "130000", value: 240 },
  { code: "140000", value: 520 },
  { code: "150000", value: 120 },
  { code: "210000", value: 210 },
  { code: "220000", value: 620 },
  { code: "230000", value: 20 },
  { code: "310000", value: 220 },
  { code: "320000", value: 820 },
  { code: "330000", value: 320 },
  { code: "340000", value: 520 },
  { code: "350000", value: 120 },
  { code: "360000", value: 620 },
  { code: "370000", value: 920 },
];
</script>

<template>
  <MapChart :data="mapData" />
</template>

<style scoped></style>
