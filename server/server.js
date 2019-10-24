const express = require('express');

let app = express();

app.get('/', (req, res) => {
    let message = process.env.CUSTOM_MSG || "Hello Rio, a Node.js app is running."
    
    res.send(`:::: INFO :::: \n ${JSON.stringify(process.env)}\n ::::::: \n ${message}`);
});

module.exports = app;
