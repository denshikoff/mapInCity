import fetch from 'node-fetch';
/*async function getAPI(url) {
    const response = await  fetch(url);

    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
}

getAPI(api_url);


function hideloader() {
    document.getElementById('loading').style.display = 'none';
}*/

/*const f = require("./fetch");*/
const api_url = "https://api.reformagkh.ru/json-rpc";
const response = fetch(api_url);

let data = response.json();
addDataInFile('jkh.json', data);

