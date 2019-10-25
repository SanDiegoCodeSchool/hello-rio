const express = require('express');
const morgan = require('morgan');

let app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {  
    res.send(`Release ${process.env.APP_VERSION} \n The secret message is: \n ${process.env.CUSTOM_MSG}`);
});

module.exports = app;
