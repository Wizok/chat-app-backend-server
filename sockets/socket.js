const { io } = require('../index');
const { comprobarJWT } = require('../helpers/jwt')
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');

    // Validación del JWT que está dentro del "headers"
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    // Verificar autentificación
    if (!valido) { return client.disconnect(); }
    // Cliente autenticado
    usuarioConectado(uid);


    // Ingresar al usuario en una sala en particular
    // sala global, clienteId
    client.join(uid);

    // Escuchar el mensaje personal
    client.on('mensaje-personal', async (payload) => {

        // TODO: Grabar mensaje
        await grabarMensaje(payload);
        console.log(payload);

        // Emitir el mensaje al destinatario
        io.to(payload.para).emit('mensaje-personal', payload);
    });


    client.on('disconnect', () => {
        usuarioDesconectado(uid);
    });






    // client.on('mensaje', ( payload ) => {
    //     console.log('Mensaje', payload);

    //     io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    // });


});
