import express from 'express'
/* import { crearHabitacion, asignarHabitacion, listarDisponibles } from '../controllers/habitacionController.js' */


import { obtenerTodas, crear, actualizar, eliminar , obtenerHabitacionesDisponibles ,listarHabitaciones } from '../controllers/habitacionesController.js'

const router = express.Router()

router.get('/', listarHabitaciones)

router.get('/todas', obtenerTodas)
router.post('/', crear)
router.put('/:id', actualizar)
router.delete('/:id', eliminar)

router.get('/disponibles', obtenerHabitacionesDisponibles)

export default router




/* const router = express.Router()

router.post('/', crearHabitacion)
router.get('/disponibles', listarDisponibles)
router.post('/asignar', asignarHabitacion)

export default router */
