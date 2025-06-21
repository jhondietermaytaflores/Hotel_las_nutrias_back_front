import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import pedidoRoutes from './routes/pedidos.js'
import reservaRoutes from './routes/reservas.js'
import habitacionRoutes from './routes/habitaciones.js'
// Importando las nuevas rutas
import usuariosRoutes from './routes/usuarios.js'
import productosRoutes from './routes/productos.js'
import inventarioRoutes from './routes/inventario.js'
import tiposInventarioRoutes from './routes/tiposInventario.js'

import inventarioHabitacionRoutes from './routes/inventarioHabitacion.js'
import inventarioSectorRoutes from './routes/inventarioSector.js'

import rolesRoutes from './routes/roles.js'



import clientesRoutes from './routes/clientes.js'

import tiposTareaRoutes from './routes/tiposTarea.js'
import asignacionesRoutes from './routes/asignaciones.js'







dotenv.config()

const app = express()

//app.use(cors())
app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],  
}));

app.use(express.json())

// rutas
app.use('/api/auth', authRoutes)
app.use('/api/habitaciones', habitacionRoutes)
app.use('/api/pedidos', pedidoRoutes)
app.use('/api/reservas', reservaRoutes)

app.use('/api/usuarios', usuariosRoutes)
app.use('/api/productos', productosRoutes) 

app.use('/api/inventario', inventarioRoutes)
app.use('/api/tipos-inventario', tiposInventarioRoutes)

app.use('/api/inventario-habitacion', inventarioHabitacionRoutes)
app.use('/api/inventario-sector', inventarioSectorRoutes)

app.use('/api/clientes', clientesRoutes)

app.use('/api/roles', rolesRoutes)

app.use('/api/tipos_tarea', tiposTareaRoutes)
app.use('/api/asignaciones', asignacionesRoutes)


app.use(usuariosRoutes)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
