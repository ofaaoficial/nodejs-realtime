const express = require('express');
const path = require('path');
const socket = require('socket.io');
const http = require('http');
const app = express();

/**
 * Configuration socket IO
 */
const server = http.createServer(app);
const io = socket(server);
require('./config/socketIO')(io);

app.set('port', process.env.PORT || 3000);

app.use(express.static( path.join(__dirname, 'public') ));

server.listen(app.get('port'), () => {
    console.log(`Server run at http://localhost:${app.get('port')}`);
});