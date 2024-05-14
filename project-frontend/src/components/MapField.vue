<template>
  <GMapMap
    :center="center"
    :zoom="10"
    map-type-id="terrain"
    class="w-full h-full"
  >
    <GMapMarker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :clickable="true"
      :draggable="true"
      @click="openMarker(m.id)"
    >
      <GMapInfoWindow
        :closeclick="true"
        @closeclick="openMarker(null)"
        :opened="openedMarkerID === m.id"
      >
        <div>Devie No {{ m.id }} Current AQI 50 Current CO2 20</div>
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>

<script>
export default {
  data() {
    return {
      openedMarkerID: null,
      center: { lat: 13.735172, lng: 100.5330905 },
      markers: [
        {
          id: 1,
          position: {
            lat: 13.735172,
            lng: 100.5330905,
          },
        },
        {
          id: 2,
          position: {
            lat: 13.746301,
            lng: 100.535439,
          },
        },
        {
          id: 3,
          position: {
            lat: 13.7350706,
            lng: 100.5284824,
          },
        },
        {
          id: 4,
          position: {
            lat: 13.7968445,
            lng: 100.545787,
          },
        },
        {
          id: 5,
          position: {
            lat: 13.7366288,
            lng: 100.6175042,
          },
        },
        {
          id: 6,
          position: {
            lat: 13.7461906,
            lng: 100.5938034,
          },
        },
      ],
    };
  },
  methods: {
    openMarker(id) {
      this.openedMarkerID = id;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
