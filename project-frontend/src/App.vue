<template>
  <div class="landingPage min-h-screen flex flex-col justify-between relative">
    <div class="grid grid-cols-1 md:grid-cols-6 gap-4 px-4 flex-grow-0">
      <div class="col-span-1 md:col-span-6 m-0">
        <HeaderField :town="town" :AQI="AQI" />
      </div>
      <div class="col-span-1 md:col-span-2 h-36 md:h-44">
        <MapField :center="center" :markers="markers" />
      </div>
      <div class="col-span-1 md:col-span-2 h-36 md:h-44">
        <PmField :AQI="AQI" />
      </div>
      <div class="col-span-1 md:col-span-2 h-36 md:h-44">
        <CarbonField :CO2="CO2" />
      </div>
      <div class="col-span-1 md:col-span-6 h-36 md:h-44 mb-10">
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
import { getCO2, getPM } from "./AQIComputing.js";
import InfoPageVue from "./components/InfoPage.vue";

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
      center: { lat: 51.093048, lng: 6.84212 },
      markers: [
        {
          position: {
            lat: 51.093048,
            lng: 6.84212,
          },
        },
      ],
    };
  },
  methods: {
    getUserLocationAndTown() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude is", latitude, "Longitude is", longitude);
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
        console.log(this.location);
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
            console.log(this.location);
          } else {
            this.location = "No results found.";
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          this.location = "Error retrieving location data.";
        });
    },
    updateCO2() {
      getCO2().then((co2Value) => {
        this.CO2 = co2Value;
      });
    },
    updatePM() {
      getPM().then((pmValue) => {
        this.AQI = pmValue;
      });
    },
  },
  mounted() {
    this.getUserLocationAndTown();
    this.updateCO2();
    this.updatePM();
    setInterval(this.updateCO2, 30000); // Update CO2 every 30 seconds
    setInterval(this.updatePM, 30000); // Update PM2.5 every 30 seconds
  },
};
</script>

<style scoped>
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
