<template>
  <div class="container">
    <div class="grid grid-cols-6 gap-4">
      <div class="col-start-1 col-end-7">
        <HeaderField town="London" :AQI="50" />
      </div>
      <div class="col-start-1 col-end-3 m-4"><PmField :AQI="50" /></div>
      <div class="col-end-6 col-span-2 m-4"><CarbonField :CO2="20" /></div>
    </div>
  </div>
</template>
<script>
import HeaderField from "./components/HeaderField.vue";
import CarbonField from "./components/CarbonField.vue";
import PmField from "./components/PmField.vue";

export default {
  name: "LandingPage",
  components: {
    HeaderField,
    CarbonField,
    PmField,
  },
};
</script>

<style scoped>
#map {
  height: 180px;
}
</style>
