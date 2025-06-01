import { useEffect, useState } from 'react'
import { api } from '../../servicios/api'
import Swal from 'sweetalert2'
import { FaTrash } from 'react-icons/fa'

function UsuariosClientesAdmin() {
    const [clientes, setClientes] = useState([])

    const cargarClientes = async () => {
        const { data } = await api.get('/usuarios')
        const soloClientes = data.filter(u => u.id_rol === 3)
        setClientes(soloClientes)
    }

    const eliminar = async (id) => {
        const confirm = await Swal.fire({
            title: '¿Eliminar cliente?',
            icon: 'warning',
            showCancelButton: true,
        })
        if (confirm.isConfirmed) {
            await api.delete(`/usuarios/${id}`)
            cargarClientes()
            Swal.fire('Eliminado', '', 'success')
        }
    }

    useEffect(() => {
        cargarClientes()
    }, [])

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Clientes registrados</h2>
            <div className="bg-white shadow rounded overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2 text-left">Nombre</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(c => (
                            <tr key={c.id} className="border-t">
                                <td className="p-2">{c.nombre}</td>
                                <td>{c.correo}</td>
                                <td>{c.telefono}</td>
                                <td className="text-center">
                                    <button onClick={() => eliminar(c.id)} className="text-red-600"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsuariosClientesAdmin
