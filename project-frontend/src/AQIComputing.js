// Assuming this is in AQIComputing.js
export function getAQIStatus(aqi) {
  if (aqi >= 0 && aqi <= 50) {
    return { status: "Good", color: "#B3D071" };
  } else if (aqi > 50 && aqi <= 100) {
    return { status: "Moderate", color: "#F2D573" };
  } else if (aqi > 100 && aqi <= 150) {
    return { status: "Unhealthy for Sensitive Groups", color: "#ED9E63" };
  } else if (aqi > 150 && aqi <= 200) {
    return { status: "Unhealthy", color: "#E5716E" };
  } else if (aqi > 200 && aqi <= 300) {
    return { status: "Very Unhealthy", color: "#9E7FB4" };
  } else if (aqi > 300) {
    return { status: "Hazardous", color: "#9A7985" };
  } else {
    return { status: "Invalid", color: "#FFFFFF" };
  }
}

export function getPM() {
  return Math.floor(Math.random() * 350); // Adjusted for a wider range
}
export function getCO2() {
  return Math.floor(Math.random() * 2000); // Adjusted for a more realistic CO2 range
}
