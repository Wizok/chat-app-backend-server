const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    // Propiedades
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    online: {
        type: Boolean,
        default: false
    }

});

// Funcion para extraer datos que no necesitamos ver y almacenarlas en "object" cuando se llama el JSON
UsuarioSchema.method('toJSON', function () {
    // Extracción de datos que no queremos ver en la petición POST
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    // el "object" regresara el "uid" y todas las propiedades a excepcion de las extraidas
    return object;
});

module.exports = model('Usuario', UsuarioSchema);