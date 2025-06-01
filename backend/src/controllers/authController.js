import { supabase } from '../config/supabase.js'
import dotenv from 'dotenv';
dotenv.config();


export const registrar = async (req, res) => {
  const { email, password, nombre, telefono } = req.body

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) return res.status(400).json({ error: error.message })

  const user_id = data.user?.id
  if (!user_id) return res.status(500).json({ error: 'Usuario no creado ' })

  // Crea en tabla usuarios personalizada
  await supabase.from('usuarios').insert([{
    nombre,
    correo: email,
    contrasena: password,
    telefono,
    id_rol: 3 // cliente
  }])

  res.json({ message: 'Usuario registrado correctamente' })
}

export const login = async (req, res) => {

  console.log("BODY RECIBIDO:", req.body)

  const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return res.status(401).json({ error: 'Credenciales inválidas' })

  const { data: usuarios } = await supabase.from('usuarios').select('*')
  const usuario = usuarios.find(u => u.correo === email)

  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })

  return res.json({
    token: data.session.access_token,
    usuario:{
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      telefono: usuario.telefono,
      id_rol: usuario.id_rol
    }
  })



  /* const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) return res.status(401).json({ error: 'Credenciales inválidas' })

  res.json({ token: data.session.access_token, user: data.user }) */
}
