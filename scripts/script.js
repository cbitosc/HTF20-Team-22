const navBar = document.getElementById('nav')
const navExtra = document.getElementById('nav-extra')
const textIcon = document.querySelectorAll('#text-icon')
const submitBtn = document.getElementById('submit-btn')
const table = document.getElementById('table')
const input = document.getElementById('country-input')
const active = document.getElementById('active')
const recovered = document.getElementById('recovered')
const confirmed = document.getElementById('confirmed')
const deceased = document.getElementById('deceased')
let variable = 0


// map code
// function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: -33.8688, lng: 151.2195 },
//     zoom: 13,
//   });
//   const card = document.getElementById("pac-card");
//   const input = document.getElementById("pac-input");
//   map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
//   const autocomplete = new google.maps.places.Autocomplete(input);
//   // Bind the map's bounds (viewport) property to the autocomplete object,
//   // so that the autocomplete requests use the current map bounds for the
//   // bounds option in the request.
//   autocomplete.bindTo("bounds", map);
//   // Set the data fields to return when the user selects a place.
//   autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
//   const infowindow = new google.maps.InfoWindow();
//   const infowindowContent = document.getElementById("infowindow-content");
//   infowindow.setContent(infowindowContent);
//   const marker = new google.maps.Marker({
//     map,
//     anchorPoint: new google.maps.Point(0, -29),
//   });
//   autocomplete.addListener("place_changed", () => {
//     infowindow.close();
//     marker.setVisible(false);
//     const place = autocomplete.getPlace();

//     if (!place.geometry) {
//       // User entered the name of a Place that was not suggested and
//       // pressed the Enter key, or the Place Details request failed.
//       window.alert("No details available for input: '" + place.name + "'");
//       return;
//     }

//     // If the place has a geometry, then present it on a map.
//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17); // Why 17? Because it looks good.
//     }
//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);
//     let address = "";

//     if (place.address_components) {
//       address = [
//         (place.address_components[0] &&
//           place.address_components[0].short_name) ||
//           "",
//         (place.address_components[1] &&
//           place.address_components[1].short_name) ||
//           "",
//         (place.address_components[2] &&
//           place.address_components[2].short_name) ||
//           "",
//       ].join(" ");
//     }
//     infowindowContent.children["place-icon"].src = place.icon;
//     infowindowContent.children["place-name"].textContent = place.name;
//     infowindowContent.children["place-address"].textContent = address;
//     infowindow.open(map, marker);
//   });

//   // Sets a listener on a radio button to change the filter type on Places
//   // Autocomplete.
//   function setupClickListener(id, types) {
//     const radioButton = document.getElementById(id);
//     radioButton.addEventListener("click", () => {
//       autocomplete.setTypes(types);
//     });
//   }
//   setupClickListener("changetype-all", []);
//   setupClickListener("changetype-address", ["address"]);
//   setupClickListener("changetype-establishment", ["establishment"]);
//   setupClickListener("changetype-geocode", ["geocode"]);
//   document
//     .getElementById("use-strict-bounds")
//     .addEventListener("click", function () {
//       console.log("Checkbox clicked! New state=" + this.checked);
//       autocomplete.setOptions({ strictBounds: this.checked });
//     });
// }



// api data points
function getData(e){
  console.log("hello");
  const country= input.value
  if(input.value!==''){
    apiData()
      .then(res => res.json)
      .then(data => {

        data.Countries.forEach(place=>{
          if(place.Country === country){
            confirmed.innerHTML = `${place.TotalConfirmed}`
            active.innerHTML = `${place.TotalConfirmed+place.NewConfirmed-place.TotalRecovered-place.TotalDeaths}`
            recovered.innerHTML = `${place.TotalRecovered}`
            deceased.innerHTML = `${place.TotalDeaths}`
          }else{
            variable++
          }
        })
        if(variable === 190){
          alert('the entered country is not available in the database')
          variable=0;
        }
      })
  }
  else{
      alert('Pls enter something for getting data')
    }
  e.preventDefault()
}
//api process function
async function apiData(){
  const api = await fetch('https://api.covid19api.com/summary')
  const json= await api.json()
  return {json}
}


// navBar animation
navBar.addEventListener('mouseover',navChange)

function navChange(e){
  navBar.style.width = '18rem'
  textIcon.forEach(function(node){
    node.style.opacity = '1'
  })
}

navBar.addEventListener('mouseleave',function(){
  navBar.style.width = '5rem'
  textIcon.forEach(function(node){
    node.style.opacity = '0'
  })
})


// event listener for submit button
submitBtn.addEventListener('click',getData)
