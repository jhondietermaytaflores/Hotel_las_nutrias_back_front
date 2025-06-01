import { supabase } from '../config/supabase.js'

export const crearReserva = async (req, res) => {
  const { cliente_id, habitacion_id, fecha_entrada, fecha_salida, observaciones } = req.body

  const { data, error } = await supabase
    .from('reservas')
    .insert([{
      cliente_id,
      habitacion_id,
      fecha_entrada,
      fecha_salida,
      estado: 'reservado',
      observaciones
    }])

  if (error) return res.status(400).json({ error: error.message })

  // Marcar habitación como ocupada
  await supabase
    .from('habitaciones')
    .update({ estado: 'ocupada' })
    .eq('id_habitacion', habitacion_id)

  // al final de crearReserva
  await supabase.from('notificaciones').insert([{
    usuario_id: req.usuario.id, // ← quien reservó (requieres auth middleware)
    reserva_id: reservaInsertada.id,
    mensaje: `Reserva realizada para el cliente ${cliente_nombre} en habitación #${numero_habitacion}`,
  }])


  res.json({ message: 'Reserva creada correctamente', reserva: data })
}

export const listarReservas = async (req, res) => {
  const { data, error } = await supabase.from('reservas').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}


export const actualizarEstado = async (req, res) => {
  const { id } = req.params
  const { estado } = req.body

  const { error } = await supabase.from('reservas').update({ estado }).eq('id', id)
  if (error) return res.status(400).json({ error: error.message })
  res.json({ mensaje: 'Reserva actualizada' })
}

//seg

export const obtenerReservaPorId = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('reservas').select('*').eq('id_reserva', id).single()
  if (error) return res.status(404).json({ error: 'Reserva no encontrada' })
  res.json(data)
}
export const actualizarReserva = async (req, res) => {
  const { id } = req.params
  const { cliente_id, habitacion_id, fecha_entrada, fecha_salida, observaciones } = req.body

  const { data, error } = await supabase
    .from('reservas')
    .update({
      cliente_id,
      habitacion_id,
      fecha_entrada,
      fecha_salida,
      observaciones
    })
    .eq('id_reserva', id)

  if (error) return res.status(400).json({ error: error.message })

  // Actualizar estado de la habitación si se cambió
  if (habitacion_id) {
    await supabase
      .from('habitaciones')
      .update({ estado: 'ocupada' })
      .eq('id_habitacion', habitacion_id)
  }

  res.json({ message: 'Reserva actualizada correctamente', reserva: data })
}
export const eliminarReserva = async (req, res) => {
  const { id } = req.params
  const { error } = await supabase.from('reservas').delete().eq('id_reserva', id)
  if (error) return res.status(400).json({ error: error.message })

  // Marcar habitación como libre
  await supabase
    .from('habitaciones')
    .update({ estado: 'libre' })
    .eq('id_habitacion', id)

  res.json({ message: 'Reserva eliminada correctamente' })
}




/* export const crearReserva = async (req, res) => {
  const { data, error } = await supabase.from('reservas').insert([req.body])
  if (error) return res.status(400).json({ error: error.message })

  await supabase.from('habitaciones').update({ estado: 'ocupada' }).eq('id_habitacion', req.body.habitacion_id)

  res.json(data)
} */