import { useEffect, useState } from 'react'
import { api } from '../../servicios/api'
import Swal from 'sweetalert2'
import { FaClipboardCheck, FaShippingFast, FaCheck, FaTimes } from 'react-icons/fa'

function PedidosAdmin() {
  const [pedidos, setPedidos] = useState([])

  const cargarPedidos = async () => {
    const { data } = await api.get('/pedidos')
    setPedidos(data)
  }

  const cambiarEstado = async (pedido, nuevoEstado) => {
    const confirm = await Swal.fire({
      title: `¿Marcar como "${nuevoEstado}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sí, confirmar',
    })

    if (confirm.isConfirmed) {
      await api.put(`/pedidos/${pedido.id_pedido}`, { estado: nuevoEstado })
      Swal.fire('Actualizado', 'Estado del pedido modificado', 'success')
      cargarPedidos()
    }
  }

  useEffect(() => {
    cargarPedidos()
  }, [])

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Pedidos</h2>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Productos</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id_pedido} className="border-t">
                <td className="p-3">{p.cliente_id}</td>
                <td>Bs {p.total}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                      p.estado === 'pendiente'
                        ? 'bg-yellow-500'
                        : p.estado === 'por entregar'
                        ? 'bg-blue-500'
                        : p.estado === 'entregado'
                        ? 'bg-green-600'
                        : 'bg-red-600'
                    }`}
                  >
                    {p.estado}
                  </span>
                </td>
                <td>
                  <ul className="list-disc list-inside text-sm">
                    {p.detalle_pedido?.map((d, i) => (
                      <li key={i}>
                        {d.productos?.nombre || 'Producto'} (x{d.cantidad})
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="text-center space-x-2">
                  {p.estado === 'pendiente' && (
                    <button
                      onClick={() => cambiarEstado(p, 'por entregar')}
                      className="text-blue-600 hover:text-blue-800"
                      title="Marcar por entregar"
                    >
                      <FaShippingFast />
                    </button>
                  )}
                  {p.estado === 'por entregar' && (
                    <button
                      onClick={() => cambiarEstado(p, 'entregado')}
                      className="text-green-600 hover:text-green-800"
                      title="Marcar entregado"
                    >
                      <FaCheck />
                    </button>
                  )}
                  {p.estado !== 'cancelado' && p.estado !== 'entregado' && (
                    <button
                      onClick={() => cambiarEstado(p, 'cancelado')}
                      className="text-red-600 hover:text-red-800"
                      title="Cancelar pedido"
                    >
                      <FaTimes />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PedidosAdmin
