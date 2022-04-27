const http = require('http');
const port = 3000;
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const route = require('./src/routes/');

const app = express();

app.set('port', port);

mongoose.connect("mongodb://localhost:27017/users-db?retryWrites=true&w=majority", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database!');
    }).catch(() => {
        console.log('connection failed');
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/user', route.user);

const server = http.createServer(app);

server.listen(port);