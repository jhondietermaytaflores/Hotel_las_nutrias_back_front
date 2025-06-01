import { supabase } from '../config/supabase.js'


export const crearPedido = async (req, res) => {
  const { usuario_id, cliente_id, productos, metodo_pago, tipo_comprobante } = req.body

  const total = productos.reduce((acc, p) => acc + p.precio_unitario * p.cantidad, 0)

  const { data: pedido, error: errPedido } = await supabase
    .from('pedidos')
    .insert([{
      usuario_id,
      cliente_id,
      total,
      estado: 'pendiente',
      metodo_pago,
      tipo_comprobante
    }])
    .select()
    .single()

  if (errPedido) return res.status(400).json({ error: errPedido.message })

  const detalles = productos.map(p => ({
    pedido_id: pedido.id_pedido,
    producto_id: p.producto_id,
    cantidad: p.cantidad,
    precio_unitario: p.precio_unitario
  }))

  const { error: errDetalle } = await supabase.from('detalle_pedido').insert(detalles)

  if (errDetalle) return res.status(400).json({ error: errDetalle.message })

  res.json({ message: 'Pedido registrado', pedido })
}
/* 
export const listarPedidos = async (req, res) => {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      detalle_pedido(
        cantidad,
        precio_unitario,
        producto_id,
        productos (
          nombre,
          imagen_url
        )
      )
    `)

  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}
 */

export const listarPedidos = async (req, res) => {
  const { data, error } = await supabase.from('pedidos').select('*')
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

//seg

export const obtenerPedidoPorId = async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      detalle_pedido(
        cantidad,
        precio_unitario,
        producto_id,
        productos (
          nombre,
          imagen_url
        )
      )
    `)
    .eq('id_pedido', id)
    .single()

  if (error) return res.status(404).json({ error: 'Pedido no encontrado' })
  res.json(data)
}
export const actualizarPedido = async (req, res) => {
  const { id } = req.params
  const { estado, metodo_pago, tipo_comprobante } = req.body

  const { data, error } = await supabase
    .from('pedidos')
    .update({ estado, metodo_pago, tipo_comprobante })
    .eq('id_pedido', id)
    .select()
    .single()

  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

export const eliminarPedido = async (req, res) => {
  const { id } = req.params

  const { error } = await supabase
    .from('pedidos')
    .delete()
    .eq('id_pedido', id)

  if (error) return res.status(400).json({ error: error.message })
  res.json({ message: 'Pedido eliminado' })
}


export const actualizarEstadoPedido = async (req, res) => {
  const { id } = req.params
  const { estado } = req.body

  const { error } = await supabase.from('pedidos').update({ estado }).eq('id_pedido', id)
  if (error) return res.status(400).json({ error: error.message })
  res.json({ mensaje: 'Estado actualizado' })
}






/* export const listarPedidos = async (req, res) => {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`*, detalle_pedido(*, productos(nombre, imagen_url))`)
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
} */

/* export const crearPedido = async (req, res) => {
  const { usuario_id, cliente_id, productos, metodo_pago, tipo_comprobante } = req.body

  const total = productos.reduce((acc, p) => acc + p.precio_unitario * p.cantidad, 0)

  const { data: pedido, error: errPedido } = await supabase.from('pedidos').insert([{
    usuario_id, cliente_id, total, estado: 'pendiente', metodo_pago, tipo_comprobante
  }]).select().single()

  if (errPedido) return res.status(400).json({ error: errPedido.message })

  const detalles = productos.map(p => ({
    pedido_id: pedido.id_pedido,
    producto_id: p.producto_id,
    cantidad: p.cantidad,
    precio_unitario: p.precio_unitario
  }))
  await supabase.from('detalle_pedido').insert(detalles)

  res.json({ mensaje: 'Pedido registrado', pedido })
} */