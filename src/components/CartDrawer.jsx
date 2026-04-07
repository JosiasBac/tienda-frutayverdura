import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCarrito } from "../context/CarritoContext"

export default function CartDrawer() {
    const { carrito, cambiarKg, eliminarProducto, totalPrecio, carritoAbierto, cerrarCarrito } = useCarrito()
    const navigate = useNavigate()

    useEffect(() => {
        if (carritoAbierto) document.body.style.overflow = "hidden"
        else document.body.style.overflow = ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [carritoAbierto])

    return (
        <>
            <div
                onClick={cerrarCarrito}
                className={`fixed inset-0 bg-black/35 z-40 transition-opacity ${carritoAbierto ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />
            <aside className={`fixed top-0 right-0 h-full w-full sm:w-[430px] bg-white z-50 shadow-2xl transition-transform duration-300 ${carritoAbierto ? "translate-x-0" : "translate-x-full"}`}>
                <div className="h-full flex flex-col">
                    <div className="px-5 sm:px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
                        <h3 className="font-bold text-xl">Tu carrito</h3>
                        <button onClick={cerrarCarrito} className="text-zinc-500 hover:text-zinc-800 text-2xl leading-none">×</button>
                    </div>

                    <div className="flex-1 overflow-auto px-4 sm:px-6 py-4 space-y-3">
                        {carrito.length === 0 ? (
                            <p className="text-zinc-500 text-center py-10">Tu carrito esta vacio</p>
                        ) : (
                            carrito.map(p => (
                                <div key={p.nombre} className="bg-zinc-50 rounded-2xl p-3.5 flex flex-wrap gap-3">
                                    <img src={p.imagen} alt={p.nombre} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                                    <div className="flex-1 min-w-[140px]">
                                        <h4 className="font-bold truncate">{p.nombre}</h4>
                                        <p className="text-sm text-zinc-500">{p.precio.toFixed(2)}€/{p.unidad}</p>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="font-bold text-[#0d631b]">{(p.precio * p.kg).toFixed(2)}€</p>
                                        <button onClick={() => eliminarProducto(p.nombre)} className="text-xs text-zinc-400 hover:text-red-500">Eliminar</button>
                                    </div>
                                    <div className="w-full flex items-center gap-2">
                                        <button onClick={() => cambiarKg(p.nombre, p.kg - 0.5)} className="w-8 h-8 rounded-full bg-white border border-zinc-200 font-bold">−</button>
                                        <span className="font-bold w-16 text-center">{p.kg}{p.unidad}</span>
                                        <button onClick={() => cambiarKg(p.nombre, p.kg + 0.5)} className="w-8 h-8 rounded-full bg-white border border-zinc-200 font-bold">+</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="border-t border-zinc-100 p-4 sm:p-6">
                        <div className="flex justify-between text-lg font-bold mb-4">
                            <span>Total</span>
                            <span className="text-[#0d631b]">{totalPrecio.toFixed(2)}€</span>
                        </div>
                        <button
                            disabled={carrito.length === 0}
                            onClick={() => {
                                cerrarCarrito()
                                navigate("/checkout")
                            }}
                            className="w-full bg-[#0d631b] text-white font-bold py-3.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Ir a checkout
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
