export async function getCurrentData() {
  const url = "https://api.netpie.io/v2/feed/api/v1/datapoints/query";
  const UserToken =
    "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJHUnBpZUdFSCIsImlhdCI6MTcxNjQ2NzMwOCwibmJmIjoxNzE2NDY3MDA4LCJleHAiOjE3MTY1NTM3MDgsImV4cGlyZUluIjo4NjQwMCwiY3R4Ijp7ImNsaWVudGlkIjoiNWI0NGM0ZDRkMWMwODY5ZmE0YjNlZDkyZTFmNzgzYjgiLCJ1c2VyaWQiOiJVNzQ0ODAzMTU5MzAxIn0sImlzcyI6ImNlcjp1c2VydG9rZW4ifQ.x7ozHZrY7BbGO29uh1geNRx_fZ4D4MlO_sLmgMqYl6LYyrytx8Ig0OFlnV7py85h2MKB9IAjWV13xK_A0h5vgg";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UserToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start_relative: {
        value: 1,
        unit: "days",
      },
      metrics: [
        {
          name: "1af58697-e327-49e6-8d6e-59cb9ba6d6fb",
          limit: 1,
          order: "asc",
          tags: {
            attr: [
              "position.longitude.degree",
              "position.latitude.degree",
              "pm25.level",
            ],
          },
        },
      ],
    }),
  });

  if (response.ok) {
    try {
      const data = await response.json();
      //console.log(data.queries[0]);
      let lat = data.queries[0].results[1].values[0][1];
      let lng = data.queries[0].results[0].values[0][1];
      let pm25 = 0;
      try {
        // console.log(data.queries[0].results[2]);
        pm25 = data.queries[0].results[2].values[0][1];
      } catch (e) {
        console.error("Error retrieving pm2.5 data", e);
      }
      pm25 = Math.round(pm25 * 1000);
      lat = parseFloat(lat) / 100;
      lng = parseFloat(lng) / 100;
      pm25 = parseFloat(pm25);
      console.log("lat", lat, "lng", lng, "pm2.5", pm25);
      return { lat: lat, lng: lng, pm25: pm25 };
    } catch (e) {
      console.error("Netpie Not Connected", e);
      return { lat: 13.7370133, lng: 100.5305989, pm25: 1 };
    }
  } else {
    console.error("Failed to retrieve Current data", response.statusText);
  }
}

export async function getGraph() {
  const url = "https://api.netpie.io/v2/feed/api/v1/datapoints/query";
  const UserToken = import.meta.env.VITE_NET_USER_TOKEN;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UserToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start_relative: {
        value: 1,
        unit: "days",
      },
      metrics: [
        {
          name: "1af58697-e327-49e6-8d6e-59cb9ba6d6fb",
          order: "desc",
          limit: 50,
          tags: {
            attr: ["pm25.level"],
          },
        },
      ],
    }),
  });

  if (response.ok) {
    const data = await response.json();
    let pm25 = [];
    try {
      pm25 = data.queries[0].results.map((result) => result.values);
    } catch (e) {
      console.error("Error retrieving pm2.5 Graph data", e);
    }
    // console.log(pm25[0]);
    return pm25[0];
  } else {
    console.error("Failed to retrieve Graph data", response.statusText);
  }
}

export async function checkToken() {
  const url = "https://api.netpie.io/v2/feed/api/v1/datapoints/query";
  const UserToken = import.meta.env.VITE_NET_USER_TOKEN;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UserToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      start_relative: {
        value: 1,
        unit: "days",
      },
      metrics: [
        {
          name: "1af58697-e327-49e6-8d6e-59cb9ba6d6fb",
          order: "desc",
          limit: 50,
          tags: {
            attr: ["pm25.level"],
          },
        },
      ],
    }),
  });

  if (response.ok) {
    const data = await response.json();
    let pm25 = [];
    try {
      pm25 = data.queries[0].results.map((result) => result.values);
    } catch (e) {
      console.error("Error retrieving pm2.5 Graph data", e);
    }
    // console.log(pm25[0]);
    return pm25[0];
  } else {
    console.error("Failed to retrieve Graph data", response.statusText);
  }
}
getCurrentData();
