import { useState } from "react"
import { useCarrito } from "../context/CarritoContext"

export default function ProductCard({ nombre, precio, unidad, imagen }) {
    const { añadirProducto } = useCarrito()
    const [cantidad, setCantidad] = useState("")
    const [mostrarInput, setMostrarInput] = useState(false)
    const [mensaje, setMensaje] = useState(false)

    function handleAñadir() {
        if (!mostrarInput) {
            setMostrarInput(true)
            return
        }
        const num = parseFloat(cantidad)
        if (!num || num <= 0) return
        añadirProducto({ nombre, precio, unidad, imagen, kg: num })
        setMostrarInput(false)
        setCantidad("")
        setMensaje(true)
        setTimeout(() => setMensaje(false), 2000)
    }

    return (
        <div className="bg-white p-5 rounded-[32px] shadow-[0_12px_40px_rgba(25,28,28,0.06)] group transition-all hover:-translate-y-2">
            <div className="rounded-[24px] overflow-hidden aspect-square mb-5 bg-zinc-100">
                <img
                    src={imagen}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    alt={nombre}
                />
            </div>
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-xl">{nombre}</h4>
                <span className="text-[#0d631b] font-bold">{precio.toFixed(2)}€/{unidad}</span>
            </div>

            {mostrarInput && (
                <input
                    type="number"
                    min="0.5"
                    step={unidad === "Kg" ? "0.5" : "1"}
                    placeholder={unidad === "Kg" ? "Kilos (ej: 1.5)" : "Unidades (ej: 2)"}
                    value={cantidad}
                    onChange={e => setCantidad(e.target.value)}
                    className="w-full border border-zinc-200 rounded-full px-4 py-2 mb-3 text-center focus:outline-none focus:border-[#0d631b]"
                />
            )}

            {mensaje && (
                <p className="text-center text-[#0d631b] font-bold text-sm mb-2">
                    ✓ Añadido al carrito
                </p>
            )}

            <button
                onClick={handleAñadir}
                className="w-full bg-[#ffdcc6] text-[#311300] font-bold py-4 rounded-full hover:bg-orange-200 transition-colors"
            >
                {mostrarInput ? "Confirmar" : "Añadir"}
            </button>

            {mostrarInput && (
                <button
                    onClick={() => { setMostrarInput(false); setCantidad("") }}
                    className="w-full mt-2 text-zinc-400 text-sm hover:text-zinc-600"
                >
                    Cancelar
                </button>
            )}
        </div>
    )
}