/*

path: /api/login

*/

const { Router, response } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Se crea en medio un midelware que se necesitan
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio perro !').not().isEmpty(),
    // Se manda llamar el middleware para validar campos
    validarCampos
], crearUsuario);

// post: apuntar al "/"
// validar email, password

// Se crea un middleware para validar el usuario y password
router.post('/', [
    check('email', 'El email es incorrecto.').isEmail(),
    check('password', 'El password es incorrecto.').not().isEmpty(),
    validarCampos
], login);

// validarJWT
router.get('/renew', validarJWT, renewToken);

module.exports = router;