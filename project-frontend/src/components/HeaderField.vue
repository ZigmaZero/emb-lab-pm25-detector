<template>
  <div class="rounded-lg p-8 m-4" :style="{ backgroundColor: aqiColor }">
    <h1>Air Quality Index in {{ town }} is {{ aqiIndex }}</h1>
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

<style scoped>
.rounded-lg {
  padding: 20px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  transition: background-color 0.3s;
}
</style>
