//  Google map/places near me API
let map;
let service;
let infowindow;
let isScriptInjected = false;

// controls sidebar visibility
let sidebarToggle = false;

// promise: if resolved, then return position; if rejected, return error
const getCurrentPosition = async () => {
    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            error => reject(error)
        );
    });
};

const initMap = async () => {
    document.getElementById('map_canvas').style.background = "transparent url(assets/img/Ajax-loader.gif) no-repeat center center";
    const mapElement = document.getElementById("map");
    const mapsError = document.getElementById("maps-error");

    // Gets latitude and longitude of the users place
    getCurrentPosition()
    .then(position => {

        // if the error message is UNhidden, hide it, since the promise resolved
        if (!mapsError.classList.contains("hidden")) {
            mapsError.classList.add("hidden");
        };

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
    }).catch(error => {
        console.log(error);

        // if the error message is hidden, show it, since the promise rejected
        if (mapsError.classList.contains("hidden")) {
            mapsError.classList.remove("hidden");
        };
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

    // select container div
    const placeListDiv = document.getElementById("placeList");
    // create header
    const listHeader = document.createElement("h2");
    listHeader.textContent = "Nearby Mountains, Parks & Forests";
    listHeader.className = "text-md m-2 font-bold";

    placeListDiv.appendChild(listHeader);

    // creates an ordered list
    const placeUL = document.createElement('ol');

    // for each place in the array...
    places.forEach((place) => {
        // create list item
        const placeLI = document.createElement('li');
        placeLI.className = "rounded border border-white p-1 bg-white m-2";
        // create header
        const placeHeader = document.createElement('a');
        placeHeader.className = "text-md font-bold underline hover:text-sky-200 active:text-sky-200";
        placeHeader.textContent = place.name;
        // add google maps link
        const placeLink = "https://www.google.com/maps/search/?api=1&query=" + place.name + "&query_place_id=" + place.place_id;
        placeHeader.setAttribute("href", placeLink);
        placeHeader.setAttribute("target", "_blank");
        // create address
        const placeAddr = document.createElement('p');
        placeAddr.className = "text-sm";
        placeAddr.textContent = place.formatted_address;

        placeLI.appendChild(placeHeader);
        placeLI.appendChild(placeAddr);
        placeUL.appendChild(placeLI);
    });

    placeListDiv.appendChild(placeUL);
};

const showNearbyPlaces = async () => {
    if(!isScriptInjected){
        isScriptInjected = true;
        const script = document.createElement('script');
        script.setAttribute('async', '');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAmUPLJdyPE8KF8uOxxt1hNUZIDE3ZVaCE&libraries=places&callback=initMap`
        document.getElementsByTagName('body')[0].appendChild(script);
        window.initMap = initMap;
    }

    // sidebar
    const whereToPaint = document.getElementById('where-to-paint-side');
    // chevron icon on button - open and closed states
    const whereToPaintClose = document.getElementById('where-to-closed');
    const whereToPaintCloseMobile = document.getElementById('where-to-closed-mobile');
    const whereToPaintOpen = document.getElementById('where-to-open');
    const whereToPaintOpenMobile = document.getElementById('where-to-open-mobile');

    if (!sidebarToggle) {
        sidebarToggle = true;
        whereToPaint.classList.remove('hidden');
        whereToPaintClose.classList.replace('inline', 'hidden');
        whereToPaintCloseMobile.classList.replace('inline', 'hidden');
        whereToPaintOpen.classList.replace('hidden', 'inline');
        whereToPaintOpenMobile.classList.replace('hidden', 'inline');
    } else {
        sidebarToggle = false;
        whereToPaint.classList.add('hidden');
        whereToPaintOpen.classList.replace('inline', 'hidden');
        whereToPaintOpenMobile.classList.replace('inline', 'hidden');
        whereToPaintClose.classList.replace('hidden', 'inline');
        whereToPaintCloseMobile.classList.replace('hidden', 'inline');
    }
};

// where to paint button
const whereToPaintBtn = document.getElementById('where-to-paint-btn');
whereToPaintBtn.addEventListener('click', showNearbyPlaces);
const whereToPaintBtnMobile = document.getElementById('where-to-paint-btn-mobile');
whereToPaintBtnMobile.addEventListener('click', showNearbyPlaces);
