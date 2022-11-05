function addDataInFile(filename, data) {
    const fs = require('fs');
    fs.appendFileSync(filename, data + '\n');
}


const express = require('express');
const app = express();
const bodyParser = require("body-parser");

var num_req = 0;
let infoStr;
let newData;
let date = new Date();

//method use(before connect)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed*/
    next();
});

app.post('/', (req, res) => {
    newData = JSON.stringify(req.body);
    addDataInFile('data.json', newData);
    //log
    infoStr = "New data added at " + date.toLocaleDateString() + ' ' + date.getHours()+ ':' + date.getMinutes() + ':' + date.getSeconds() + '\n';
    addDataInFile('server.log', infoStr);
});

app.get('/', (req, res) => {
    let jsonData = require('./data.json');
    console.log(jsonData);
    res.send(jsonData);
});

app.listen(3000, ()=> {
    console.log("Server started");
});

module.exports = { addDataInFile
};
