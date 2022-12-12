

//создание карты
mapboxgl.accessToken = 'pk.eyJ1IjoiZGltYWRlbnNoY2giLCJhIjoiY2w3bmw0eWU1MDlscjN1cDU4dzU0Z2NucyJ9.9cbkIoc0Qn8i6TUm0I-NeQ';
const map = new mapboxgl.Map({
    container: "map",
    style: 'mapbox://styles/dimadenshch/cl7nm2m9q002h16lnbt4wzgx7',
    center: [39.210, 51.660], // starting position
    zoom: 15 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl(), 'top-right');


//загрузка старый точек
map.on('load', () => {
    let xhr = new XMLHttpRequest();
    xhr.onload = () => {
        let markers = JSON.parse(xhr.responseText);
        for(const m of markers) {
            const el = document.createElement('div');
            el.className = 'marker';
            el.style.backgroundImage = getTypeMarker(m.type);
            const popup = new mapboxgl.Popup({ offset: 25 }).setText(m.text);
            new mapboxgl.Marker(el).setLngLat(m.point).setPopup(popup).addTo(map);
        }
    };
    xhr.open("GET", new URL("http://localhost:3000"));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send('');

});

//добавление маркера
let coordinates = new mapboxgl.LngLat(0,0);
let date = new Date();

//события мыши
map.on('mousemove', (e) => {
    coordinates = e.lngLat.wrap();
})


map.on('dblclick', (e) => {
    $('#Modalform').modal('show');
});


//модальное окно
$('#submit').click(function(){
    let gjs = {
        "type" : document.getElementById("select_type").value,
        "text" : document.getElementById("message-text").value,
        "point" : coordinates,
        "date" : date.getDate() + ":" + date.getMonth() + ":" + date.getFullYear()
    };
    const el = document.createElement('div');
    el.className = 'marker';
    //тип маркера по картинке
    el.style.backgroundImage = getTypeMarker(gjs.type);
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(gjs.text);
    new mapboxgl.Marker(el).setLngLat(coordinates).setPopup(popup).addTo(map);

    let json = JSON.stringify(gjs)
    sendJSON(json);
    document.getElementById("message-text").value = ""
    $('#Modalform').modal('hide');
});


//функция отправки json на сервер
function sendJSON(jsonStr){
    let xhr = new XMLHttpRequest();
    xhr.open("POST", new URL("http://localhost:3000"));
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(jsonStr);
    console.log("Added data!")
}

//функция для типа маркеров
function getTypeMarker(type) {
    let list_pic = ["url('png/bus.png')", "url('png/com.png')", "url('png/disable.png')", "url('png/road.png')", "url('png/person.png')"];
    switch (type) {
        case "Общественный транспорт": return list_pic[0];

        case "ЖКХ": return list_pic[1];

        case "Доступная среда": return list_pic[2];

        case "Дороги": return  list_pic[3];
        case "Отсутствуют пешеходные переходы": return list_pic[4];
    }
}



