import { useState } from "react"
import { useCarrito } from "../context/CarritoContext"
import { Navigate, useNavigate } from "react-router-dom"
import { supabase } from "../supabase"

export default function Checkout() {
    const { carrito, totalPrecio, vaciarCarrito } = useCarrito()
    const navigate = useNavigate()

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [metodoPago, setMetodoPago] = useState("")
    const [errores, setErrores] = useState({})
    const [paso, setPaso] = useState(1)
    const [cargando, setCargando] = useState(false)
    const [horaRecogida, setHoraRecogida] = useState("")

    function validar() {
        const e = {}
        if (!nombre.trim()) e.nombre = "El nombre es obligatorio"
        if (!metodoPago) e.metodoPago = "Selecciona un método de pago"
        if (!horaRecogida) e.horaRecogida = "La hora de recogida es obligatoria"
        if (metodoPago === "stripe") {
            if (!email.trim()) e.email = "El email es obligatorio para pago con tarjeta"
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "El email no es válido"
        }
        setErrores(e)
        return Object.keys(e).length === 0
    }

    function handleContinuar() {
        if (!validar()) return
        setPaso(2)
    }

    async function guardarPedido(metodo) {
        const { error } = await supabase.from("pedidos").insert({
            nombre,
            email: email || null,
            metodo_pago: metodo,
            total: totalPrecio,
            productos: carrito,
            estado: metodo === "efectivo" ? "pendiente" : "pagado",
            hora_recogida: horaRecogida
        })
        if (error) {
            console.error("Error guardando pedido:", error)
            return false
        }
        return true
    }

    async function handleEfectivo() {
        setCargando(true)
        const ok = await guardarPedido("efectivo")
        setCargando(false)
        if (!ok) {
            alert("Hubo un error al guardar el pedido, inténtalo de nuevo")
            return
        }
        vaciarCarrito()
        navigate("/confirmacion", { state: { nombre, email, metodoPago: "efectivo", total: totalPrecio } })
    }

    async function handleStripe() {
        setCargando(true)
        try {
            const response = await fetch(
                "https://niuikeniimuzyxqsafgk.supabase.co/functions/v1/crear-pago",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pdWlrZW5paW11enl4cXNhZmdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUxMTk0OTksImV4cCI6MjA5MDY5NTQ5OX0.DdxJd73brzD9wYXC_DVtHlayemW747WRxmrn64d7AyE`,
                    },
                    body: JSON.stringify({ carrito, total: totalPrecio, nombre, email, horaRecogida }),
                }
            )
            const data = await response.json()
            if (data.url) {
                localStorage.setItem("carrito_confirmado", JSON.stringify(carrito))
                localStorage.setItem("hora_recogida_confirmada", horaRecogida)
                window.location.href = data.url
            } else {
                alert("Error al crear el pago: " + data.error)
            }
        } catch (error) {
            alert("Error de conexión: " + error.message)
        }
        setCargando(false)
    }

    if (carrito.length === 0) return <Navigate to="/" replace />

    return (
        <main className="max-w-2xl mx-auto px-6 py-10">
            <h2 className="text-3xl font-bold mb-8">Finalizar pedido</h2>

            {/* Resumen */}
            <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)] mb-6">
                <h3 className="font-bold text-lg mb-4">Resumen del pedido</h3>
                {carrito.map(p => (
                    <div key={p.nombre} className="flex justify-between text-sm py-2 border-b border-zinc-100 last:border-0">
                        <span>{p.nombre} — {p.kg}{p.unidad}</span>
                        <span className="font-bold">{(p.precio * p.kg).toFixed(2)}€</span>
                    </div>
                ))}
                <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span className="text-[#0d631b]">{totalPrecio.toFixed(2)}€</span>
                </div>
            </div>

            {paso === 1 && (
                <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)] flex flex-col gap-4">
                    <h3 className="font-bold text-lg">Tus datos</h3>

                    <div>
                        <label className="text-sm font-bold text-zinc-600 mb-1 block">Nombre *</label>
                        <input
                            type="text"
                            placeholder="Tu nombre completo"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="w-full border border-zinc-200 rounded-full px-5 py-3 focus:outline-none focus:border-[#0d631b]"
                        />
                        {errores.nombre && <p className="text-red-500 text-sm mt-1 ml-2">{errores.nombre}</p>}
                    </div>

                    <div>
                        <label className="text-sm font-bold text-zinc-600 mb-1 block">Email <span className="text-zinc-400 font-normal">(opcional, para recibir factura)</span></label>
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full border border-zinc-200 rounded-full px-5 py-3 focus:outline-none focus:border-[#0d631b]"
                        />
                        {errores.email && <p className="text-red-500 text-sm mt-1 ml-2">{errores.email}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-bold text-zinc-600 mb-1 block">Hora de recogida *</label>
                        <input
                            type="time"
                            value={horaRecogida}
                            onChange={e => setHoraRecogida(e.target.value)}
                            className="w-full border border-zinc-200 rounded-full px-5 py-3 focus:outline-none focus:border-[#0d631b]"
                        />
                        {errores.horaRecogida && <p className="text-red-500 text-sm mt-1 ml-2">{errores.horaRecogida}</p>}
                    </div>
                    <div>
                        <label className="text-sm font-bold text-zinc-600 mb-2 block">Método de pago *</label>
                        <div className="flex flex-col gap-3">
                            <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${metodoPago === "stripe" ? "border-[#0d631b] bg-green-50" : "border-zinc-200"}`}>
                                <input type="radio" name="pago" value="stripe" onChange={() => setMetodoPago("stripe")} className="accent-[#0d631b]" />
                                <span className="font-bold">💳 Pagar con tarjeta (Stripe)</span>
                            </label>
                            <label className={`flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-colors ${metodoPago === "efectivo" ? "border-[#0d631b] bg-green-50" : "border-zinc-200"}`}>
                                <input type="radio" name="pago" value="efectivo" onChange={() => setMetodoPago("efectivo")} className="accent-[#0d631b]" />
                                <span className="font-bold">💵 Pagar en efectivo al recoger</span>
                            </label>
                        </div>
                        {errores.metodoPago && <p className="text-red-500 text-sm mt-1 ml-2">{errores.metodoPago}</p>}
                    </div>

                    <button
                        onClick={handleContinuar}
                        className="w-full bg-[#0d631b] text-white font-bold py-4 rounded-full hover:scale-105 transition-transform mt-2"
                    >
                        Continuar
                    </button>
                </div>
            )}

            {paso === 2 && (
                <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)] flex flex-col gap-4">
                    <h3 className="font-bold text-lg">Confirmar pedido</h3>
                    <p className="text-zinc-600">Nombre: <span className="font-bold">{nombre}</span></p>
                    {email && <p className="text-zinc-600">Email: <span className="font-bold">{email}</span></p>}
                    <p className="text-zinc-600">Pago: <span className="font-bold">{metodoPago === "stripe" ? "💳 Tarjeta" : "💵 Efectivo"}</span></p>

                    {metodoPago === "stripe" ? (
                        <button
                            onClick={handleStripe}
                            disabled={cargando}
                            className="w-full bg-[#0d631b] text-white font-bold py-4 rounded-full hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
                        >
                            {cargando ? "Conectando con Stripe..." : `Pagar ${totalPrecio.toFixed(2)}€ con tarjeta`}
                        </button>
                    ) : (
                        <button
                            onClick={handleEfectivo}
                            disabled={cargando}
                            className="w-full bg-[#0d631b] text-white font-bold py-4 rounded-full hover:scale-105 transition-transform disabled:opacity-60"
                        >
                            {cargando ? "Guardando pedido..." : "Confirmar pedido en efectivo"}
                        </button>
                    )}

                    <button
                        onClick={() => setPaso(1)}
                        className="w-full text-zinc-500 font-bold py-3 rounded-full hover:text-zinc-800 transition-colors"
                    >
                        Volver atrás
                    </button>
                </div>
            )}
        </main>
    )
}