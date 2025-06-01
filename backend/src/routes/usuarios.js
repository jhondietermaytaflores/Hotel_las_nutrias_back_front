import express from 'express'
import { listarUsuarios,
        crearUsuario,
        actualizarUsuario,obtenerUsuarioPorId,
        eliminarUsuario
 } from '../controllers/usuariosController.js'



const router = express.Router()
router.get('/', listarUsuarios)


//crud
router.post('/', crearUsuario)
router.put('/:id', actualizarUsuario)
router.get('/:id', obtenerUsuarioPorId)
router.delete('/:id', eliminarUsuario)




export default router
