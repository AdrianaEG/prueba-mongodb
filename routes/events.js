const { Router } = require("express");
const { check } = require("express-validator");
const { isDate } = require("../helpers/isDate");
const {validarCampos} = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const router = Router();
const {validarJWT} = require('../middlewares/validar-jwt');
// /api/events

//Pasar por la validación del JWT
router.use(validarJWT);

//Obtener eventos
router.get(
    '/',
    getEventos)

//Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ], 
    crearEvento)

//Actualizar un evento
router.put('/:id', actualizarEvento)

//Borrar un  evento
router.delete('/:id', eliminarEvento)

module.exports = router;