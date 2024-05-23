<template>
  <div class="flex flex-col items-center p-1">
    <div class="flex justify-center w-full mb-4 h-full">
      <div class="flex justify-center items-center h-full">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          :class="{ 'opacity-50': !visible.AQI }"
          @click="toggleData('AQI')"
        >
          PM2.5
        </button>
      </div>
    </div>
    <div class="w-full max-w-screen-lg mb-20 md:mb-12">
      <LineChart
        :chart-data="chartData"
        :options="chartOptions"
        style="height: 35vh"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { getGraph } from "../APIConfig.js"; // Adjust the import based on your file structure

Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  components: { LineChart },
  setup() {
    const chartData = ref({
      labels: [],
      datasets: [
        {
          label: "PM2.5 Levels",
          data: [],
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
          fill: false,
        },
      ],
    });

    const visible = ref({
      AQI: true,
    });

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
        },
      },
    };

    function toggleData(type) {
      visible.value[type] = !visible.value[type];
      const datasetIndex = type === "AQI" ? 0 : 1;
      chartData.value.datasets[datasetIndex].hidden = !visible.value[type];
    }

    async function fetchData() {
      const data = await getGraph();
      if (data) {
        const labels = [];
        const values = [];
        data.forEach((point) => {
          const date = new Date(point[0]);
          labels.push(date.toLocaleTimeString());
          values.push(point[1] * 1000); // Convert milligrams to micrograms
        });
        chartData.value.labels = labels;
        chartData.value.datasets[0].data = values;
      }
    }

    onMounted(() => {
      fetchData();
    });

    return { chartData, chartOptions, visible, toggleData };
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
