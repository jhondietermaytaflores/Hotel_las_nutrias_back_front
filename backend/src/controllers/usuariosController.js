import { supabase } from '../config/supabase.js'
import bcrypt from 'bcrypt'
import { enviarCredenciales } from '../services/emailService.js'


export const listarUsuarios = async (req, res) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*, roles(nombre_rol)')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}



//crud

export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasena, telefono, id_rol } = req.body

    // Validación básica
    if (!nombre || !correo || !telefono || !id_rol) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    // Contraseña por defecto si no viene
    /* const passwordFinal = contrasena?.trim() ? contrasena : '${telefono}nutrias' */
    const passwordFinal = contrasena?.trim() ? contrasena : `${telefono}nutrias`

    const hashed = await bcrypt.hash(passwordFinal, 10)

    const { data, error } = await supabase.from('usuarios').insert([{
      nombre,
      correo,
      telefono,
      contrasena: hashed,
      id_rol
    }]).select('id').single()

    if (error) {
      console.error('❌ Error al crear usuario:', error)
      return res.status(500).json({ error: 'No se pudo crear el usuario' })
    }

    // Enviar correo
    try {
      console.log('📧 Enviando correo...')
      await enviarCredenciales(correo, nombre, passwordFinal, 'empleado')
      console.log(`📩 Email enviado a ${correo}`)
    } catch (e) {
      console.error('⚠️ Error al enviar correo:', e.message)
    }

    res.json({ mensaje: 'Empleado creado correctamente', usuario: data })
  } catch (err) {
    console.error('💥 Error inesperado:', err)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export const actualizarUsuario = async (req, res) => {
  const { id } = req.params
  const { nombre, correo, contrasena, telefono, id_rol } = req.body

  const { data, error } = await supabase.from('usuarios').update({
    nombre,
    correo,
    contrasena,
    telefono,
    id_rol
  }).eq('id_usuario', id)

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

export const eliminarUsuario = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('usuarios')
    .delete()
    .eq('id', id) // 👈 CAMBIADO: era 'id_usuario'

  if (error) return res.status(400).json({ error: error.message })

  res.json({ mensaje: 'Usuario eliminado' })
}

export const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params

  const { data, error } = await supabase
    .from('usuarios')
    .select('*, roles(nombre_rol)')
    .eq('id_usuario', id)
    .single()

  if (error) return res.status(404).json({ error: 'Usuario no encontrado' })
  res.json(data)
}



//ya funcionaba pero no enviaba correo
/* export const crearUsuario = async (req, res) => {
  const { nombre, correo, contrasena, telefono, id_rol } = req.body

  const { data, error } = await supabase.from('usuarios').insert([{
    nombre,
    correo,
    contrasena,
    telefono,
    id_rol 
  }])

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
} */
