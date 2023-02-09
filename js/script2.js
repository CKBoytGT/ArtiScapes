//Google map/places near me API
// Add your google map api key here
const API_KEY = googleKey;
let map;
let service;
let infowindow;
let isScriptInjected = false;


const getCurrentPosition = async () => {
    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
        )
    })
}

const initMap = async () => {
    document.getElementById('map_canvas').style.background = "transparent url(img/Ajax-loader.gif) no-repeat center center";
    const mapElement = document.getElementById("map");
// Gets latitude and longitude of the users place
    getCurrentPosition()
    .then(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
    
        const location = new google.maps.LatLng(lat, lon);
    
        infowindow = new google.maps.InfoWindow();
    
        map = new google.maps.Map(mapElement, {
            center: location,
            zoom: 8,
          });
    // objects to be returned from the API
        const request = {
            location,
            query: "mountains, parks, forest",
            radius: 50000
        };
    
        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          for (let i = 0; i < results.length; i++) {
            createMarker(results[i], infowindow);
          }

          showList(results);

          const placesSideBarElement = document.getElementById('placeList');
          mapElement.style.setProperty('width', `${placesSideBarElement.offsetWidth}px`, '');
          mapElement.style.setProperty('height', `${placesSideBarElement.offsetWidth}px`, ''); 
        }
      });

      document.getElementById('map_canvas').removeAttribute('style');
    });
}

const getMarkerContentString = (place) => {
    return `<h4 style="color: black; font-weight: bold;">${place.name}</h4><p style="color: black;">${place.formatted_address}</p>`
}

const createMarker = (place, infowindow) => {
    if (!place.geometry || !place.geometry.location) return;
  
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
    });

    marker.addListener("click", () => {
        infowindow.setContent(getMarkerContentString(place));
        infowindow.open({
          anchor: marker,
          map,
        });
      });
}
// Displayes list of places near the user
const showList = (places) => {
    const placeListDiv = document.getElementById("placeList");
    const listHeader = document.createElement("h1");
    listHeader.innerHTML = "Nearby mountains, parks and forests";
    listHeader.style.fontWeight = "bold";
    listHeader.style.textDecoration = "underline"
    placeListDiv.appendChild(listHeader);

    const placeUL = document.createElement('ol');

    places.forEach((place) => {
        const placeLI = document.createElement('li');
        const placeHeader = document.createElement('h4');
        placeHeader.style.fontWeight = "bold";
        placeHeader.innerHTML = place.name;
        const placeAddr = document.createElement('p');
        placeAddr.innerHTML = place.formatted_address;
        const horizontalLine = document.createElement('hr');

        placeLI.appendChild(placeHeader);
        placeLI.appendChild(placeAddr);
        placeLI.appendChild(horizontalLine)
        placeUL.appendChild(placeLI);
    });

    placeListDiv.appendChild(placeUL);
    placeListDiv.style.display = "block";
    placeListDiv.style.maxHeight = "60vh"
    placeListDiv.style.overflowY = "scroll";
}

const showNearbyPlaces = async () => {
    if(!isScriptInjected){
        isScriptInjected = true;
        const script = document.createElement("script");
        script.setAttribute('async', '');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`
        document.getElementsByTagName("body")[0].appendChild(script);
        window.initMap = initMap;
    }  
}