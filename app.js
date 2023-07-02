require('dotenv').config({ path: `./envs/.env.${process.env.NODE_ENV}` });
const express = require('express');
const port = process.env.PORT || 9000;
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/home'));

const server = app.listen(port, function () {
    console.log('Example app listening on port 9000!');
});


process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});

