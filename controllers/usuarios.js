const { response } = require('express');
const Usuario = require('../models/usuario');


const getUsuarios = async (req, res = response) => {

    // Punto inicial o Paginaciones de usuarios en caso de existir mas de 20
    const desde = Number(req.query.desde) || 0;

    // Obtener la lista de usuarios y ordenarlos en orden descendente
    // Si se le quita el "-" a online sera de la manera contraria ascendente
    const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online')
        .limit(20);

    // { ok: true, msg: 'getUsuario }
    res.json({
        ok: true,
        usuarios
    })

}

module.exports = {
    getUsuarios
}