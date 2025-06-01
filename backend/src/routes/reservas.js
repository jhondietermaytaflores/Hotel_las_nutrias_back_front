import express from 'express'
import { crearReserva,listarReservas ,obtenerReservaPorId ,actualizarReserva ,eliminarReserva , actualizarEstado} from '../controllers/reservasController.js'

const router = express.Router()

router.post('/', crearReserva)
router.get('/', listarReservas)

router.put('/:id', actualizarEstado)



router.get('/:id', obtenerReservaPorId)
router.put('/:id', actualizarReserva)
router.delete('/:id', eliminarReserva)

export default router
