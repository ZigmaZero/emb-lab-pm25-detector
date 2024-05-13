<template>
  <div
    class="rounded-lg p-8 text-center shadow-lg"
    :style="{ backgroundColor: aqiColor }"
  >
    <p class="text-sm font-medium text-gray-500 uppercase tracking-wide">
      Live Co2 Index
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

<style>
.rounded-lg {
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  transition: background-color 0.3s;
}
</style>
