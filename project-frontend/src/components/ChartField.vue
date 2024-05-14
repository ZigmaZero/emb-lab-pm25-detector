<template>
  <div class="rounded-lg">
    <line-chart :chart-data="filteredData"></line-chart>
    <button
      v-for="timeFrame in timeFrames"
      :key="timeFrame"
      @click="changeTimeFrame(timeFrame)"
    >
      {{ timeFrame }}
    </button>
  </div>
</template>

<script>
import { Line } from "vue-chartjs";
import moment from "moment";

export default {
  components: {
    LineChart: {
      extends: Line,
      props: ["chartData"],
      watch: {
        chartData: function (newData) {
          this.renderChart(newData, {
            responsive: true,
            maintainAspectRatio: false,
          });
        },
      },
      mounted() {
        this.renderChart(this.chartData, {
          responsive: true,
          maintainAspectRatio: false,
        });
      },
    },
  },
  data() {
    return {
      timeFrames: ["1M", "3M", "6M"],
      allData: {
        labels: Array.from({ length: 180 }, (_, i) =>
          moment().subtract(i, "days").format("YYYY-MM-DD")
        ).reverse(),
        datasets: [
          {
            label: "AQI Index",
            backgroundColor: "rgba(135, 206, 250, 0.5)",
            borderColor: "royalblue",
            data: Array.from(
              { length: 180 },
              () => Math.floor(Math.random() * 100) + 50
            ),
          },
        ],
      },
      filteredData: null,
    };
  },
  created() {
    this.filteredData = this.allData; // Initialize with all data
  },
  methods: {
    changeTimeFrame(frame) {
      const monthsAgo = frame === "1M" ? 1 : frame === "3M" ? 3 : 6;
      const filteredLabels = [];
      const filteredDataPoints = [];

      this.allData.labels.forEach((label, index) => {
        if (moment().subtract(monthsAgo, "months").isBefore(moment(label))) {
          filteredLabels.push(label);
          filteredDataPoints.push(this.allData.datasets[0].data[index]);
        }
      });

      this.filteredData = {
        labels: filteredLabels,
        datasets: [
          {
            label: "AQI Index",
            backgroundColor: "rgba(135, 206, 250, 0.5)",
            borderColor: "royalblue",
            data: filteredDataPoints,
          },
        ],
      };
    },
  },
};
</script>

<style scoped>
button {
  margin: 5px;
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
