<template>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
  >
    <div class="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Project Information</h2>
        <button @click="$emit('close')" class="text-black">&times;</button>
      </div>
      <div class="p-2">
        <p>
          This website is part of the final project for the
          <b>2110366 Embedded Systems Lab</b> in Computer Engineering at
          Chulalongkorn University. <br /><br />
          This project is implemented to be part of
          <a
            href="https://web.archive.org/web/20231229111820/https://www.chadchart.com/policy/6215ef934e43cd8b4760bc17"
            ><b>ChatChat's Bangkok policy</b></a
          >. We utilize the WHO AQI guidelines as a reference for determining
          hazardous air quality levels. <u>Please note</u> that the data on this
          site may include mock data for educational purposes.
        </p>

        <br />

        <p>
          This interface displays data that we collect from GPS, PM2.5, and CO2
          sensors connected to an STM32-based NodeMCU. The data is transmitted
          via NETPIE for visualization here.
        </p>
        <br />

        <p>
          <b>Location Data Usage</b>: Your location data will be used solely for
          displaying relevant data and will not be collected or stored on our
          servers.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoPage",
  emits: ["close"],
};
</script>

<style scoped></style>
