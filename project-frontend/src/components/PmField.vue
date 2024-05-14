<template>
  <div
    class="rounded-lg p-8 text-center shadow-lg py-10"
    :style="{ backgroundColor: aqiColor }"
  >
    <p class="text-sm font-medium text-white uppercase tracking-wide">
      <b> Live AQI Index</b>
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
