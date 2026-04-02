import { useEffect, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "../supabase"
import { useCarrito } from "../context/CarritoContext"

export default function Confirmacion() {
    const { state } = useLocation()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { vaciarCarrito } = useCarrito()
    const [guardado, setGuardado] = useState(false)

    const nombre = state?.nombre || searchParams.get("nombre") || ""
    const email = state?.email || searchParams.get("email") || ""
    const metodoPago = state?.metodoPago || searchParams.get("metodo") || ""
    const total = state?.total || parseFloat(searchParams.get("total") || "0")

    useEffect(() => {
        if (metodoPago === "stripe") {
            const productosGuardados = localStorage.getItem("carrito_confirmado")
            if (!productosGuardados) return
            const productos = JSON.parse(productosGuardados)
            localStorage.removeItem("carrito_confirmado")
            supabase.from("pedidos").insert({
                nombre,
                email: email || null,
                metodo_pago: "stripe",
                total,
                productos,
                estado: "pagado"
            }).then(() => {
                vaciarCarrito()
            })
        }
    }, [])

    if (!nombre) {
        navigate("/")
        return null
    }

    return (
        <main className="max-w-xl mx-auto px-6 py-20 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold mb-4">¡Pedido confirmado!</h2>
            <p className="text-zinc-600 mb-2">Gracias, <span className="font-bold">{nombre}</span></p>
            {email && <p className="text-zinc-500 text-sm mb-2">Te enviaremos la factura a {email}</p>}
            <p className="text-zinc-500 text-sm mb-8">
                {metodoPago === "efectivo" ? "Pago en efectivo al recoger" : "Pago con tarjeta completado"}
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