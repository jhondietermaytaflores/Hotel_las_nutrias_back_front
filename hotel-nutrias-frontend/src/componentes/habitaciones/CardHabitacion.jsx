function CardHabitacion({ habitacion, onReservar }) {
    return (
        <div className={`rounded-lg shadow border overflow-hidden ${habitacion.estado !== 'libre' ? 'opacity-60' : ''}`}>
            <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                <span className="font-semibold">Hab. #{habitacion.numero}</span>
                <span className="text-xs capitalize">{habitacion.estado}</span>
            </div>
            <div className="p-4 space-y-2 text-sm text-gray-700">
                <p><strong>Descripción:</strong> {habitacion.descripcion}</p>
                <p><strong>Precio:</strong> Bs {habitacion.precio}</p>
                <p><strong>Piso:</strong> {habitacion.pisos?.nombre_piso}</p>
                <p><strong>Categoría:</strong> {habitacion.categorias_habitacion?.nombre_categoria}</p>
            </div>
            <div className="p-4">
                {habitacion.estado === 'libre' && (
                    <button
                        onClick={() => onReservar(habitacion)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                    >
                        Reservar
                    </button>
                )}
            </div>
        </div>
    )
}

export default CardHabitacion
