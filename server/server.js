const express = require('express');

let app = express();

app.get('/', (req, res) => {
    res.send('Hello Riooooo');
});

module.exports = app;
