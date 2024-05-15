<template>
  <div class="group h-full w-full">
    <div
      class="h-full relative rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
    >
      <!-- Front face  -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center rounded-lg shadow-lg h-full text-center [backface-visibility:hidden]"
        :style="{ backgroundColor: aqiColor }"
      >
        <p class="text-lg font-medium text-white uppercase tracking-wide">
          <b>Live CO2 Index</b>
        </p>
        <h1 class="text-6xl font-bold text-white">{{ CO2 }}</h1>
      </div>

      <!-- Back face -->
      <div
        class="absolute inset-0 rounded-xl bg-black/80 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]"
      >
        <div class="flex flex-col items-center justify-center h-full">
          <h1 class="text-3xl font-bold">{{ text }}</h1>
          <p class="text-lg px-2">
            The current CO2 data comes from the nearest sensor.
          </p>
          <!-- <p class="text-base">Tips for reducing emissions</p>
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
