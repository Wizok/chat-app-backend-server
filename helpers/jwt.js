const jwt = require('jsonwebtoken');

const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h'
        }, (err, token) => {

            if (err) {
                // No se pudo crear el Token
                reject('No se pudo generar el JWT');
            } else {

                // Obtenemos el TOKEN !
                resolve(token);

            }

        })

    });

}

// Validación de Token 
const comprobarJWT = (token = '') => {

    try {

        // Validar el Token y regresar el dato del uId del usuario

        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        return [true, uid];

    } catch (error) {

        return [false, null];
    }

}

module.exports = {
    generarJWT,
    comprobarJWT
}