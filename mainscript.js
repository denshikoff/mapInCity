mapboxgl.accessToken = 'pk.eyJ1IjoiZGltYWRlbnNoY2giLCJhIjoiY2w3bmw0eWU1MDlscjN1cDU4dzU0Z2NucyJ9.9cbkIoc0Qn8i6TUm0I-NeQ';

//создание карты
const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/dimadenshch/cl7nm2m9q002h16lnbt4wzgx7',
    center: [39.210, 51.660], // starting position
    zoom: 12 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl(), 'top-right')


let ll = new mapboxgl.LngLat(0,0)

//события мыши
map.on('mousemove', (e) => {
    ll = e.lngLat.wrap();
})


map.on('click', (e) => {
    $('#exampleModal').modal('show');
    const marker = new mapboxgl.Marker({
        color: "#FFFFFF",
        draggable: true
    }).setLngLat(ll)
        .addTo(map);
});






/*const marker = new mapboxgl.Marker({
    draggable: true
})
    .setLngLat([39.210, 51.660])
    .addTo(map);


function onDragEnd() {
    const lngLat = marker.getLngLat();
    coordinates.style.display = 'block';
    coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
}

marker.on('dragend', onDragEnd);*/


