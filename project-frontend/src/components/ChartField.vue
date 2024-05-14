<template>
  <div class="flex flex-col items-center p-1">
    <div class="flex justify-center w-full mb-4 h-full">
      <div class="grid grid-cols-2 gap-4">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :class="{ 'opacity-50': !visible.AQI }"
          @click="toggleData('AQI')"
        >
          AQI
        </button>
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          :class="{ 'opacity-50': !visible.CO2 }"
          @click="toggleData('CO2')"
        >
          CO2
        </button>
      </div>
    </div>
    <div
      class="w-full max-w-screen-lg mb-20 md:mb-12"
      :style="{ height: chartHeight + 'px' }"
    >
      <LineChart :chart-data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick, onMounted } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  components: { LineChart },
  setup() {
    const chartData = ref({
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "AQI Levels",
          data: [120, 130, 110, 115, 140], // Example AQI data
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
          fill: false,
        },
        {
          label: "CO2 Levels",
          data: [400, 420, 410, 430, 450], // Example CO2 data
          borderColor: "rgb(54, 162, 235)",
          tension: 0.1,
          fill: false,
        },
      ],
    });

    const visible = ref({
      AQI: true,
      CO2: true,
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false, // Set to false to make chart height responsive
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    };

    const chartHeight = ref(400); // Initial height of the chart

    function toggleData(type) {
      visible.value[type] = !visible.value[type];
      const datasetIndex = type === "AQI" ? 0 : 1;
      chartData.value.datasets[datasetIndex].hidden = !visible.value[type];
    }

    // Watch for changes in the chart container's height and update the chart height accordingly
    watch(chartData, () => {
      nextTick(() => {
        updateChartHeight();
      });
    });

    // Update chart height on mount and resize
    onMounted(() => {
      updateChartHeight();
      window.addEventListener("resize", updateChartHeight);
    });

    // Function to update chart height based on screen size
    function updateChartHeight() {
      const chartContainer = document.querySelector(".max-w-screen-lg");
      if (chartContainer) {
        chartHeight.value =
          window.innerWidth <= 640 ? 300 : chartContainer.clientHeight;
      }
    }

    return { chartData, chartOptions, toggleData, visible, chartHeight };
  },
});
</script>

<style scoped>
button:focus {
  outline: none;
}
button.opacity-50 {
  opacity: 0.5;
}
</style>
