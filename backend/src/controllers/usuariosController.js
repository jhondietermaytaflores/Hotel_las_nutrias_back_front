import { supabase } from '../config/supabase.js'

export const listarUsuarios = async (req, res) => {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*, roles(nombre_rol)')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}



//crud
export const crearUsuario = async (req, res) => {
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

  const { error } = await supabase.from('usuarios').delete().eq('id_usuario', id)
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
