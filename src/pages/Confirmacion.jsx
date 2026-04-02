import { useLocation, useNavigate } from "react-router-dom"

export default function Confirmacion() {
    const { state } = useLocation()
    const navigate = useNavigate()

    if (!state) {
        navigate("/")
        return null
    }

    return (
        <main className="max-w-xl mx-auto px-6 py-20 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold mb-4">¡Pedido confirmado!</h2>
            <p className="text-zinc-600 mb-2">Gracias, <span className="font-bold">{state.nombre}</span></p>
            {state.email && <p className="text-zinc-500 text-sm mb-2">Te enviaremos la factura a {state.email}</p>}
            <p className="text-zinc-500 text-sm mb-8">
                {state.metodoPago === "efectivo" ? "Pago en efectivo al recoger" : "Pago con tarjeta completado"}
            </p>
            <p className="text-2xl font-bold text-[#0d631b] mb-8">Total: {state.total.toFixed(2)}€</p>
            <button
                onClick={() => navigate("/")}
                className="bg-[#0d631b] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
            >
                Volver a la tienda
            </button>
        </main>
    )
}