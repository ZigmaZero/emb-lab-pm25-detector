<template>
  <div
    class="rounded-lg p-5 md:p-8 text-lg md:text-3xl mt-2 mb-0 text-white text-center shadow-lg"
    :style="{ backgroundColor: aqiColor }"
  >
    <h1>
      Air Quality Index in {{ town }} is <b> {{ aqiIndex }}</b>
    </h1>
  </div>
</template>

<script>
import { getAQIStatus } from "../AQIComputing.js";

export default {
  props: {
    town: {
      type: String,
      required: true,
    },
    AQI: {
      type: Number,
      required: true,
    },
  },
  computed: {
    aqiColor() {
      return getAQIStatus(this.AQI).color;
    },
    aqiIndex() {
      return getAQIStatus(this.AQI).status;
    },
  },
};
</script>
