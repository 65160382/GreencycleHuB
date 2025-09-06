export const loadNostraScript = (apiKey, onLoaded) => {
  const scriptId = "nostra-map-sdk";
  if (document.getElementById(scriptId)) {
    if (window.nostra && window.nostra.maps) {
      onLoaded();
    }
    return;
  }

  const script = document.createElement("script");
  script.id = scriptId;
  script.src = `http://api.nostramap.com/nostraapi/v2.0?key=${apiKey}`;
  script.async = true;
  script.onload = () => {
    if (window.nostra) {
      window.nostra.onready = () => {
        window.nostra.config.Language.setLanguage(window.nostra.language.L);
        onLoaded();
      };
    }
  };
  document.body.appendChild(script);
};

export const initializeMap = (lat, lon) => {
  const map = new window.nostra.maps.Map("map", {
    id: "mapAdmin",
    logo: true,
    scalebar: true,
    basemap: "streetmap",
    slider: true,
    level: 18,
    lat: lat,
    lon: lon,
    country: "TH",
  });

  const pointLayer = new window.nostra.maps.layers.GraphicsLayer(map, {
    id: "pointLayer",
    mouseOver: false,
  });

  map.addLayer(pointLayer);

  const marker = new window.nostra.maps.symbols.Marker({
    url: "",
    width: 70,
    height: 70,
    attributes: {
      POI_NAME: "ตำแหน่งลูกค้า",
    },
  });

  pointLayer.addMarker(lat, lon, marker);

  // setIsLoading(false);
};

export const showError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;

    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;

    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;

    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
};
