import { supabase } from '../config/supabase.js'

export const buscarClientes = async (req, res) => {
    const { q } = req.query
    const { data, error } = await supabase
        .from('clientes')
        .select('id_cliente, nombres, apellidos, correo,*')
        
        .or(`nombres.ilike.%${q}%,apellidos.ilike.%${q}%,ci.ilike.%${q}%`)
        //.ilike('nombres', `%${q}%,apellidos.ilike.%${q}%,ci.ilike.%${q}%`) // búsqueda parcial
    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
}

export const crearCliente = async (req, res) => {
    const { nombres, apellidos, ci, telefono, correo } = req.body
    const { data, error } = await supabase
        .from('clientes')
        .insert([{ nombres, apellidos, ci, telefono, correo }])
        .select()
        .single()
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
}
export const listarClientes = async (req, res) => {
    const { data, error } = await supabase.from('clientes').select('*')
    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
}
export const obtenerClientePorId = async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase.from('clientes').select('*').eq('id_cliente', id).single()
    if (error) return res.status(404).json({ error: 'Cliente no encontrado' })
    res.json(data)
}
export const actualizarCliente = async (req, res) => {
    const { id } = req.params
    const { nombres, apellidos, ci, telefono, correo } = req.body
    const { data, error } = await supabase
        .from('clientes')
        .update({ nombres, apellidos, ci, telefono, correo })
        .eq('id_cliente', id)
        .select()
        .single()
    if (error) return res.status(400).json({ error: error.message })
    res.json(data)
}
export const eliminarCliente = async (req, res) => {
    const { id } = req.params
    const { error } = await supabase.from('clientes').delete().eq('id_cliente', id)
    if (error) return res.status(400).json({ error: error.message })
    res.json({ mensaje: 'Cliente eliminado' })
}

export const obtenerClientesPorReserva = async (req, res) => {
    const { id } = req.params
    const { data, error } = await supabase
        .from('reservas')
        .select('clientes(id_cliente, nombres, apellidos, correo)')
        .eq('id_reserva', id)
        .single()
    
    if (error) return res.status(404).json({ error: 'Reserva no encontrada' })
    
    if (!data.clientes) return res.status(404).json({ error: 'Cliente no encontrado para esta reserva' })
    
    res.json(data.clientes)
}