<template>
  <div class="landingPage min-h-screen flex flex-col justify-between relative">
    <div class="grid grid-cols-1 md:grid-cols-6 gap-4 px-4 flex-grow-0">
      <div class="col-span-1 md:col-span-6 mt-3">
        <HeaderField :town="town" :AQI="AQI" />
      </div>
      <div class="col-span-1 md:col-span-2 h-36 md:h-48">
        <MapField
          :center="center"
          :markers="markers"
          :position="sensor_position"
          :pm25="AQI"
        />
      </div>
      <div class="col-span-1 md:col-span-4 h-36 md:h-48">
        <PmField :AQI="AQI" :location="sensor_position" />
      </div>
      <!-- <div class="col-span-1 md:col-span-2 h-36 md:h-48">
        <CarbonField :CO2="CO2" />
      </div> -->
      <div class="col-span-1 md:col-span-6 h-36 md:h-48 mb-10">
        <ChartField />
      </div>
    </div>

    <button
      @click="isModalOpen = true"
      class="fixed bottom-0 left-0 m-4 flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded w-auto text-sm"
    >
      <img
        src="./assets/image/info_icon.webp"
        alt="Info"
        class="h-4 w-4 mr-2"
      />
      Info
    </button>
    <InfoPage v-if="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script>
import HeaderField from "./components/HeaderField.vue";
import CarbonField from "./components/CarbonField.vue";
import PmField from "./components/PmField.vue";
import ChartField from "./components/ChartField.vue";
import MapField from "./components/MapField.vue";
import InfoPage from "./components/InfoPage.vue";
import { getCurrentData } from "./APIConfig.js";
export default {
  name: "LandingPage",
  components: {
    HeaderField,
    CarbonField,
    PmField,
    ChartField,
    MapField,
    InfoPage,
  },
  data() {
    return {
      town: "your location",
      isModalOpen: false,
      location: null,
      CO2: 0,
      AQI: 0,
      center: { lat: 13.7370133, lng: 100.5305989 },
      markers: [],
      sensor_position: { lat: 13.7370133, lng: 100.5305989 },
    };
  },
  methods: {
    async fetchSensorData() {
      try {
        const data = await getCurrentData();
        console.log(data);
        this.AQI = data.pm25;
        this.CO2 = 1;
        this.sensor_position = { lat: data.lat, lng: data.lng };
      } catch (error) {
        console.error("Failed to fetch sensor data", error);
      }
    },
    getUserLocationAndTown() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            this.center = { lat: latitude, lng: longitude };
            this.markers = [
              {
                position: { lat: latitude, lng: longitude },
              },
            ];
            this.getTownFromCoordinates(latitude, longitude);
          },
          (error) => {
            console.error("Error Code = " + error.code + " - " + error.message);
            this.location = "Unable to retrieve location: " + error.message;
          }
        );
      } else {
        this.location = "Geolocation is not supported by this browser.";
      }
    },
    getTownFromCoordinates(latitude, longitude) {
      const apiKey = import.meta.env.VITE_GEO_API;
      const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.results && data.results.length > 0) {
            this.town =
              data.results[0].components.town ||
              data.results[0].components.city;
            this.location = this.town || "an unknown location";
          } else {
            this.location = "No results found.";
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          this.location = "Error retrieving location data.";
        });
    },
  },

  mounted() {
    this.getUserLocationAndTown();
    this.fetchSensorData();
    setInterval(this.fetchSensorData, 15000); // Update data every 30 seconds
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Sukhumvit";
  src: url("./assets/Sukhumvit.ttf") format("truetype");
}

#app {
  font-family: "Sukhumvit";
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-display: swap;
}
button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
img {
  background: none; /* Ensures no background is applied */
  border: none; /* Removes any border that might obscure transparency */
}
</style>
