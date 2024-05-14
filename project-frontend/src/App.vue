<template>
  <div class="landingPage h-screen">
    <div class="grid grid-cols-6 gap-4">
      <div class="col-start-1 col-end-7">
        <HeaderField :town="location" :AQI="AQI" />
      </div>
      <div class="col-start-2 col-end-5 m-4">
        <PmField :AQI="AQI" />
      </div>
      <div class="col-start-5 col-end-7 m-4">
        <CarbonField :CO2="CO2" />
      </div>
      <!-- <div class="col-start-1 col-end-7">
        <ChartField />
      </div> -->
    </div>
  </div>
</template>

<script>
import HeaderField from "./components/HeaderField.vue";
import CarbonField from "./components/CarbonField.vue";
import PmField from "./components/PmField.vue";
import ChartField from "./components/ChartField.vue";
import { getCO2, getPM } from "./AQIComputing.js";

export default {
  name: "LandingPage",
  components: {
    HeaderField,
    CarbonField,
    PmField,
    ChartField,
  },
  data() {
    return {
      town: "your location",
      location: null,
      CO2: 0,
      AQI: 0,
    };
  },
  methods: {
    getUserLocationAndTown() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
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
      const apiKey = process.env.GEO_API;
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
  created() {
    if (!this.location) {
      this.getUserLocationAndTown();
    }
  },
  mounted() {
    this.updateCO2();
    this.updatePM();
    setInterval(this.updateCO2, 30000); // Update CO2 every 30 seconds
    setInterval(this.updatePM, 30000); // Update PM2.5 every 30 seconds
  },
};
</script>

<style scoped>
* {
  background-color: #e5e5e5;
}
button {
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
