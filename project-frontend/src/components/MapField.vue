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
      :draggable="false"
      :icon="getMarkerColor(m.id)"
      @click="openMarker(m.id)"
    >
      <GMapInfoWindow
        :closeclick="true"
        @closeclick="openMarker(null)"
        :opened="openedMarkerID === m.id"
      >
        <div v-if="m.id === 1">
          Device No {{ m.id }} Current AQI {{ pm25 }} Current CO2 20
        </div>
        <div v-else>Device No {{ m.id }} Default Data</div>
      </GMapInfoWindow>
    </GMapMarker>
  </GMapMap>
</template>

<script>
export default {
  props: {
    position: {
      type: Object,
      default: () => ({ lat: 13.735172, lng: 100.5330905 }), // Default position if none provided
    },
    pm25: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      openedMarkerID: null,
      center: { lat: 13.735172, lng: 100.5330905 },
      markers: [
        {
          id: 1,
          position: this.position, // Use position prop for the first marker
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
  created() {
    this.center = this.position;
  },
  methods: {
    openMarker(id) {
      this.openedMarkerID = id;
    },
    getMarkerColor(id) {
      if (id === 1) {
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"; // Blue color marker
      } else {
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png"; // Red color marker (default)
      }
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
</style>
