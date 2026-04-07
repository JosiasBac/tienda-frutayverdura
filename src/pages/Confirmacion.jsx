import { useEffect } from "react"
import { Navigate, useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "../supabase"
import { useCarrito } from "../context/CarritoContext"

export default function Confirmacion() {
    const { state } = useLocation()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { vaciarCarrito } = useCarrito()

    const nombre = state?.nombre || searchParams.get("nombre") || ""
    const email = state?.email || searchParams.get("email") || ""
    const metodoPago = state?.metodoPago || searchParams.get("metodo") || ""
    const total = state?.total || parseFloat(searchParams.get("total") || "0")
    const horaRecogida = state?.horaRecogida || searchParams.get("hora") || ""

    useEffect(() => {
        if (metodoPago === "stripe") {
            const productosGuardados = localStorage.getItem("carrito_confirmado")
            const horaGuardada = localStorage.getItem("hora_recogida_confirmada")
            if (!productosGuardados) return
            const productos = JSON.parse(productosGuardados)
            localStorage.removeItem("carrito_confirmado")
            localStorage.removeItem("hora_recogida_confirmada")
            supabase.from("pedidos").insert({
                nombre,
                email: email || null,
                metodo_pago: "stripe",
                total,
                productos,
                estado: "pagado",
                hora_recogida: horaGuardada || horaRecogida
            }).then(() => {
                if (email) {
                    supabase.functions.invoke("enviar-correo", {
                        body: {
                            to: email,
                            nombre,
                            total,
                            metodoPago: "stripe",
                            horaRecogida: horaGuardada || horaRecogida,
                            productos,
                        },
                    }).catch((error) => console.error("No se pudo enviar correo:", error))
                }
                vaciarCarrito()
            })
        }
    }, [])

    if (!nombre) return <Navigate to="/" replace />

    return (
        <main className="max-w-xl mx-auto px-6 py-20 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold mb-4">¡Pedido confirmado!</h2>
            <p className="text-zinc-600 mb-2">Gracias, <span className="font-bold">{nombre}</span></p>
            {email && <p className="text-zinc-500 text-sm mb-2">Recibirás tu factura en {email}</p>}
            {horaRecogida && (
                <div className="bg-green-50 border border-green-200 rounded-2xl px-6 py-4 my-6 inline-block">
                    <p className="text-[#0d631b] font-bold text-lg">🕐 Recogida a las {horaRecogida}</p>
                    <p className="text-zinc-500 text-sm mt-1">Tu pedido estará listo a esa hora</p>
                </div>
            )}
            <p className="text-zinc-500 text-sm mb-4">
                {metodoPago === "efectivo" ? "💵 Pago en efectivo al recoger" : "💳 Pago con tarjeta completado"}
            </p>
            {total > 0 && <p className="text-2xl font-bold text-[#0d631b] mb-8">Total: {total.toFixed(2)}€</p>}
            <button
                onClick={() => navigate("/")}
                className="bg-[#0d631b] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
                Volver a la tienda
            </button>
        </main>
    )
}