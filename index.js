const express = require('express');

const app = express();
const serv = require('http').Server(app);
const httpPort = 8080;
console.log(`Localhost Server Started on Port: ${httpPort}`);

serv.listen(httpPort);
app.use('/envaid', express.static('envaid'));





const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}

for(var key in results){
	console.log(key, results[key]);
}