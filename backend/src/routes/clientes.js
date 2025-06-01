import express from 'express'
import { crearCliente, actualizarCliente, obtenerClientePorId, eliminarCliente,listarClientes ,buscarClientes} from '../controllers/clientesController.js'



const router = express.Router()
router.get('/buscar', buscarClientes) // <- Esta debe ir primero
router.get('/', listarClientes)

// CRUD
router.post('/', crearCliente)
router.put('/:id', actualizarCliente)
router.get('/:id', obtenerClientePorId)
router.delete('/:id', eliminarCliente)

export default router