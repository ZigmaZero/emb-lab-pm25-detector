// Function to get the user's location and then get the town using OpenCage API
export function getUserLocationAndTown() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Call the function to convert coordinates to town
        getTownFromCoordinates(latitude, longitude);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// Function to convert coordinates to a town name using OpenCage API
function getTownFromCoordinates(latitude, longitude) {
  const apiKey = process.env.GEO_API; // Replace 'YOUR_API_KEY' with your actual OpenCage API key
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.results && data.results.length > 0) {
        console.log(
          "Town: ",
          data.results[0].components.town || data.results[0].components.city
        );
      } else {
        console.log("No results found.");
      }
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
}
