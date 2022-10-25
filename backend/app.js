const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

let newData;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true); // If needed*!/
    next();
});

app.post('/', (req, res) => {
    newData = JSON.stringify(req.body);
    fs.appendFile('data.json', newData, err => {
        // error checking
        if(err) throw err;

        console.log("New data added");
    });
    newData = '\n'
    fs.appendFile('data.json', newData, err => {
        // error checking
        if(err) throw err;

        console.log("New data added");
    });
});

/*app.get('/', (req, res) => {

})*/


app.listen(3000, ()=> console.log("Server started"));


