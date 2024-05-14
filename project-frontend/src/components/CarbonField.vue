<template>
  <div
    class="rounded-lg text-center shadow-lg p-8 py-10"
    :style="{ backgroundColor: aqiColor }"
  >
    <p class="text-sm font-medium text-white uppercase tracking-wide">
      <b>Live Co2 Index</b>
    </p>
    <h1 class="text-6xl font-bold text-white">{{ CO2 }}</h1>
  </div>
</template>

<script>
import { getAQIStatus } from "../AQIComputing.js";

export default {
  props: {
    CO2: {
      type: Number,
      required: true,
    },
  },
  computed: {
    aqiColor() {
      return getAQIStatus(this.CO2).color;
    },
  },
};
</script>
