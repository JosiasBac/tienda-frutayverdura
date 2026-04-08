import { useState } from "react"
import { useCarrito } from "../context/CarritoContext"

export default function ProductCard({ nombre, precio, unidad, imagen }) {
    const { añadirProducto } = useCarrito()
    const [cantidad, setCantidad] = useState(0)
    const [mostrarInput, setMostrarInput] = useState(false)
    const [mensaje, setMensaje] = useState(false)
    const paso = unidad === "Kg" ? 0.5 : 1

    function handleAñadir() {
        if (!mostrarInput) {
            setMostrarInput(true)
            setCantidad(0)
            return
        }
        if (cantidad <= 0) return
        añadirProducto({ nombre, precio, unidad, imagen, kg: cantidad })
        setMostrarInput(false)
        setCantidad(0)
        setMensaje(true)
        setTimeout(() => setMensaje(false), 2000)
    }

    return (
        <div className="bg-white p-4 sm:p-5 rounded-[24px] sm:rounded-[32px] shadow-[0_12px_40px_rgba(25,28,28,0.06)] group transition-all hover:-translate-y-1 sm:hover:-translate-y-2">
            <div className="rounded-[24px] overflow-hidden aspect-square mb-5 bg-zinc-100">
                <img
                    src={imagen}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    alt={nombre}
                />
            </div>
            <div className="flex justify-between items-center gap-2 mb-4">
                <h4 className="font-bold text-lg sm:text-xl">{nombre}</h4>
                <span className="text-[#0d631b] font-bold text-sm sm:text-base whitespace-nowrap">{precio.toFixed(2)}€/{unidad}</span>
            </div>

            {mostrarInput && (
                <div className="flex items-center justify-center gap-3 mb-3">
                    <button
                        onClick={() => setCantidad(prev => Math.max(0, Number((prev - paso).toFixed(2))))}
                        className="w-9 h-9 rounded-full bg-zinc-100 font-bold hover:bg-zinc-200"
                    >
                        −
                    </button>
                    <span className="min-w-[110px] text-center font-bold border border-zinc-200 rounded-full px-4 py-2">
                        {cantidad}{unidad}
                    </span>
                    <button
                        onClick={() => setCantidad(prev => Number((prev + paso).toFixed(2)))}
                        className="w-9 h-9 rounded-full bg-zinc-100 font-bold hover:bg-zinc-200"
                    >
                        +
                    </button>
                </div>
            )}

            {mensaje && (
                <p className="text-center text-[#0d631b] font-bold text-sm mb-2">
                    ✓ Añadido al carrito
                </p>
            )}

            <button
                onClick={handleAñadir}
                disabled={mostrarInput && cantidad <= 0}
                className="w-full bg-[#ffdcc6] text-[#311300] font-bold py-3.5 sm:py-4 rounded-full hover:bg-orange-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {mostrarInput ? "✅ Confirmar" : "➕ Añadir"}
            </button>

            {mostrarInput && (
                <button
                    onClick={() => { setMostrarInput(false); setCantidad(0) }}
                    className="w-full mt-2 text-zinc-400 text-sm hover:text-zinc-600"
                >
                    Cancelar
                </button>
            )}
        </div>
    )
}