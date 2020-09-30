const { Schema, model } = require('mongoose');

const MensajeSchema = Schema({

    // Propiedades
    de: {
        // para el uid del usuario
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    para: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
}, {
    // Para utilizar la fecha de la BD de Mongoose
    timestamps: true
});

// Funcion para extraer datos que no necesitamos ver y almacenarlas en "object" cuando se llama el JSON
MensajeSchema.method('toJSON', function () {
    // Extracción de datos que no queremos ver en la petición POST
    const { __v, _id, ...object } = this.toObject();
    // el "object" regresara el "uid" y todas las propiedades a excepcion de las extraidas
    return object;
});

module.exports = model('Mensaje', MensajeSchema);