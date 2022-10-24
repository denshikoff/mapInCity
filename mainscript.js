
mapboxgl.accessToken = 'pk.eyJ1IjoiZGltYWRlbnNoY2giLCJhIjoiY2w3bmw0eWU1MDlscjN1cDU4dzU0Z2NucyJ9.9cbkIoc0Qn8i6TUm0I-NeQ';

/*//file
var fso = new ActiveXObject("Scripting.FileSystemObject");
var filepath = "C:\\Users\\densh\\Desktop\\диплом\\data.txt";
var filesObject = fso.OpenTextFile(filepath, 8, true);*/


//создание карты
const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/dimadenshch/cl7nm2m9q002h16lnbt4wzgx7',
    center: [39.210, 51.660], // starting position
    zoom: 15 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl(), 'top-right')

/*загрузка старый точек*/
/*map.on('load', () => {
    map.addSource('places', {*/

//добавление маркера
let coordinates = new mapboxgl.LngLat(0,0)

//события мыши
map.on('mousemove', (e) => {
    coordinates = e.lngLat.wrap();
})


map.on('click', (e) => {
    $('#Modalform').modal('show');
});


//модальное окно
$('#submit').click(function(){

    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage ="url('bus2.png')";
    new mapboxgl.Marker(el).setLngLat(coordinates).addTo(map);

    let geoJsonMarker = {
        "type" : document.getElementById("select_type").value,
        "text" : document.getElementById("message-text").value,
        "point" : coordinates
    };
    let json = JSON.stringify(geoJsonMarker)
    console.log(json)
    document.getElementById("message-text").value = ""
    $('#Modalform').modal('hide');
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


