const express = require('express');
const path = require('path');
require('dotenv').config();


// En Index se manda llamar todo lo que se está solicitando ejecutar al iniciar el servidor
// Configuraciones Iniciales


// DB Config
require('./database/config').dbConnection();


// App de Express
const app = express();

// Lectura y parseo del Body (Petición http) para revisar al usuario antes del socket
app.use(express.json());

// Mis Rutas
app.use('/api/login', require('./routes/auth'));


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));



server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});


