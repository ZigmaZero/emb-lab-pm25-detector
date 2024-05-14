<template>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Project Information</h2>
        <button @click="$emit('close')" class="text-black">&times;</button>
      </div>
      <p class="mt-4">
        This website is part of the final project for the
        <b>2110366 Embedded Systems Lab</b> in Computer Engineering at
        Chulalongkorn University. We utilize the WHO AQI guidelines as a
        reference for determining hazardous air quality levels. Please note that
        the data on this site may include mock data for educational purposes.
        <br />
        <br />
        This interface displays data that we collect from GPS, PM2.5, and CO2
        sensors connected to an STM32-based NodeMCU. The data is transmitted via
        NETPIE for visualization here.
        <br />
        <br />
        <b>Location Data Usage</b>: Your location data will be used solely for
        displaying relevant data and will not be collected or stored on our
        servers.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPage",
  emits: ["close"],
};
</script>

<style scoped>
/* Optional: Additional styles for the modal */
</style>
