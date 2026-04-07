import { useCarrito } from "../context/CarritoContext"
import { useNavigate } from "react-router-dom"

export default function Carrito() {
    const { carrito, cambiarKg, eliminarProducto, totalPrecio } = useCarrito()
    const navigate = useNavigate()

    if (carrito.length === 0) {
        return (
            <main className="max-w-3xl mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
                <button
                    onClick={() => navigate("/")}
                    className="bg-[#0d631b] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
                >
                    Volver a la tienda
                </button>
            </main>
        )
    }

    return (
        <main className="max-w-3xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold mb-10">Tu carrito</h2>

            <div className="flex flex-col gap-4 mb-10">
                {carrito.map(p => (
                    <div key={p.nombre} className="bg-white rounded-[24px] p-4 sm:p-5 shadow-[0_12px_40px_rgba(25,28,28,0.06)] flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
                        <img src={p.imagen} alt={p.nombre} className="w-16 h-16 sm:w-20 sm:h-20 rounded-[16px] object-cover shrink-0" />
                        <div className="flex-1 min-w-[140px]">
                            <h4 className="font-bold text-lg truncate">{p.nombre}</h4>
                            <span className="text-zinc-500 text-sm">{p.precio.toFixed(2)}€/{p.unidad}</span>
                        </div>
                        <div className="flex items-center gap-2 order-3 sm:order-none w-full sm:w-auto justify-start sm:justify-center">
                            <button
                                onClick={() => cambiarKg(p.nombre, p.kg - 0.5)}
                                className="w-8 h-8 rounded-full bg-zinc-100 font-bold hover:bg-zinc-200"
                            >−</button>
                            <span className="font-bold w-12 text-center">{p.kg}{p.unidad}</span>
                            <button
                                onClick={() => cambiarKg(p.nombre, p.kg + 0.5)}
                                className="w-8 h-8 rounded-full bg-zinc-100 font-bold hover:bg-zinc-200"
                            >+</button>
                        </div>
                        <div className="text-right ml-auto order-2 sm:order-none min-w-[78px]">
                            <p className="font-bold text-[#0d631b]">{(p.precio * p.kg).toFixed(2)}€</p>
                        </div>
                        <button
                            onClick={() => eliminarProducto(p.nombre)}
                            className="text-zinc-400 hover:text-red-500 text-xl ml-1 sm:ml-2 order-2 sm:order-none"
                        >✕</button>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span className="text-[#0d631b]">{totalPrecio.toFixed(2)}€</span>
                </div>
                <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-[#0d631b] text-white font-bold py-4 rounded-full hover:scale-105 transition-transform"
                >
                    Proceder al pago
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="w-full mt-3 text-zinc-500 font-bold py-3 rounded-full hover:text-zinc-800 transition-colors"
                >
                    Seguir comprando
                </button>
            </div>
        </main>
    )
}