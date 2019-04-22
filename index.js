// import express from 'express'; // ES2015 Module Impoty
const express = require('express'); // Common JS module import

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send("It's alive!");
});

// GET /hubs => return a list of hubs in JSON format
server.get('/hubs', (req, res) => {
    db.hubs
        .find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(err => {
            //handle error
            res.json({ error: err, message: "Something broke"})
        });
});

server.post('/hubs', (req, res) => {
    // one way to get data from the client is in the request's body
    // axios.post(url, data) => the data shows up as the body on the server
    const hubInformation = req.body;
    console.log('request body: ', hubInformation);

    db.hubs
        .add(hubInformation)
        .then(hub => {
            res.status(201).json(hub)
        }).catch(err => {
            //handle error
            res.status(500).json({ error: err, message: "Error adding the hub"})
        });
})

server.delete('/hubs/:id', (req, res) => {
    const hubId = req.params.id
    db.hubs
        .remove(hubId)
        .then(deleted => {
            //res.status(200).json(deleted);
            res.status(204).end(); // sends back a response to the client without sending any data
        })
        .catch(err => {
            res.status(500).json({error: err, message: "Error deleting the hub"})
        });
});

server.listen (5000, () => {
    console.log('\n*** API running on port 5000 ***\n');
});

//install express with yarn add express or npm i express
//run it with yarn server