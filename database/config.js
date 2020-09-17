const mongoose = require('mongoose');

// Funcion que realizara la conección
const dbConnection = async () => {


    try {

        // Conección a la BD
        await mongoose.connect(process.env.DB_CNN, {
            // Configuraciones recomendadas de mongose
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });

        // Confirmar que se conecto a la BD
        console.log('DB On Line !');

    } catch (error) {

        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }

}

module.exports = {
    dbConnection
}