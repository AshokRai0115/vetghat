var map = L.map('map');
map.setView([27.7172, 85.3240], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
 
navigator.geolocation.watchPosition(success, error);

let marker, circle, zoomed;

function success(pos){
    const ltd = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const radius = 5
    const sessionUserId = sessionStorage.getItem('loggedInUser');

    fetch("http://localhost:8000/api/v1/location/"+sessionUserId+"/set_location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ltd,
          lng,

        }),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.id) {
            console.log(data.id)
          } 
        }) 
        .catch((err) => {
          console.error(err);
          document.querySelector("#err").innerHTML = "Location storing failed";
        });
 
    // const accuracy = pos.coords.accuracy;
    
    if(marker){
        map.removeLayer(marker);
        map.removeLayer(circle);
    }
    
    marker = L.marker([ltd, lng]).addTo(map);
    circle = L.circle([ltd, lng], {radius: radius}).addTo(map);
    
    if(!zoomed){
        zoomed = map.fitBounds(circle.getBounds());
    }
    
    map.setView([ltd, lng]);
    
    // if(ltd)

}

function error(){
    if(error.code == 1){
        alert("Please allow geolocation access");

    }
    else{
        alert("cannot get current location");
    }
}

