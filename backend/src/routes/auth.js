import express from 'express'
import { login, registrar } from '../controllers/authController.js'

const router = express.Router()

router.post('/login', login)
router.post('/registro', registrar)


export default router

/* router.post('/login', (req, res) => {
  console.log('Ruta de login alcanzada');  // Esto debería aparecer en la consola del servidor
  login(req, res);
}); */
