
const { validationResult } = require('express-validator');

const validarCampos = (req, res, next) => {

    // Se crea el objeto de validator
    const errores = validationResult(req);

    // Se revisa si viene el nombre del usuario
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    next();
}

module.exports = {
    validarCampos
}