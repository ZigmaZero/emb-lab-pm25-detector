<template>
  <div class="group h-full w-full [perspective:1000px]">
    <div
      class="h-full relative rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
    >
      <!-- Front face -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center rounded-lg shadow-lg text-center [backface-visibility:hidden]"
        :style="{ backgroundColor: aqiColor }"
      >
        <p class="text-lg font-medium text-white uppercase tracking-wide">
          <b> Live PM2.5</b>
        </p>
        <h1 class="text-6xl font-bold text-white">{{ AQI }}</h1>
      </div>

      <!-- Back face -->
      <div
        class="absolute inset-0 rounded-xl bg-black/80 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]"
      >
        <div class="flex flex-col items-center justify-center h-full">
          <h1 class="text-3xl font-bold">{{ text }}</h1>
          <p class="text-lg px-2">
            The current PM2.5 data comes from the sensor at
            <span
              v-if="
                location &&
                location.lat !== undefined &&
                location.lng !== undefined
              "
            >
              {{ formatLat(location.lat) }} and {{ formatLng(location.lng) }}.
            </span>
            <span v-else> Location data unavailable. </span>
          </p>
          <!-- Optional: More info about air quality levels -->
          <!-- <p class="text-base">More info about air quality levels</p>
          <a
            :href="link"
            class="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900"
          >
            Learn More
          </a> -->
        </div>
      </div>
    </div>
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
    location: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      default: "Air Quality Info",
    },
    link: {
      type: String,
      default: "#",
    },
  },
  computed: {
    aqiColor() {
      return getAQIStatus(this.AQI).color;
    },
  },
  methods: {
    formatLat(lat) {
      const absolute = Math.abs(lat);
      const degrees = Math.floor(absolute);
      const minutesNotTruncated = (absolute - degrees) * 60;
      const minutes = Math.floor(minutesNotTruncated);
      const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);
      const direction = lat >= 0 ? "N" : "S";

      return `${degrees}°${minutes}'${seconds}"${direction}`;
    },
    formatLng(lng) {
      const absolute = Math.abs(lng);
      const degrees = Math.floor(absolute);
      const minutesNotTruncated = (absolute - degrees) * 60;
      const minutes = Math.floor(minutesNotTruncated);
      const seconds = ((minutesNotTruncated - minutes) * 60).toFixed(1);
      const direction = lng >= 0 ? "E" : "W";

      return `${degrees}°${minutes}'${seconds}"${direction}`;
    },
  },
};
</script>

<style scoped>
.group:hover .rotateY {
  transform: rotateY(180deg);
}
</style>
