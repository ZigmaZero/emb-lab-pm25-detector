<template>
  <div
    class="rounded-lg p-8 m-4 text-center shadow-lg"
    :style="{ backgroundColor: aqiColor }"
  >
    <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">
      Live AQI Index
    </p>
    <h1 class="text-6xl font-bold text-white">{{ AQI }}</h1>
  </div>
</template>

<script>
import { getAQIStatus } from "../AQIComputing.js";

export default {
  props: {
    AQI: {
      type: Number,
      required: true,
    },
  },
  computed: {
    aqiColor() {
      return getAQIStatus(this.AQI).color;
    },
  },
};
</script>

<style>
/* Additional styles if needed */
</style>
