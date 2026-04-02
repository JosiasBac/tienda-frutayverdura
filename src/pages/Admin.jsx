import { useEffect, useState } from "react"
import { supabase } from "../supabase"

const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

export default function Admin() {
    const [autenticado, setAutenticado] = useState(false)
    const [inputPassword, setInputPassword] = useState("")
    const [errorPassword, setErrorPassword] = useState(false)
    const [pedidos, setPedidos] = useState([])
    const [cargando, setCargando] = useState(false)
    const [filtro, setFiltro] = useState("hoy")

    function handleLogin() {
        if (inputPassword === PASSWORD) {
            setAutenticado(true)
            cargarPedidos()
        } else {
            setErrorPassword(true)
        }
    }

    async function cargarPedidos() {
        setCargando(true)
        let query = supabase.from("pedidos").select("*").order("created_at", { ascending: false })

        if (filtro === "hoy") {
            const hoy = new Date()
            hoy.setHours(0, 0, 0, 0)
            query = query.gte("created_at", hoy.toISOString())
        }

        const { data, error } = await query
        if (!error) setPedidos(data)
        setCargando(false)
    }

    useEffect(() => {
        if (autenticado) cargarPedidos()
    }, [filtro, autenticado])

    if (!autenticado) {
        return (
            <main className="max-w-sm mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl font-bold mb-8">Panel del vendedor</h2>
                <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)] flex flex-col gap-4">
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={inputPassword}
                        onChange={e => { setInputPassword(e.target.value); setErrorPassword(false) }}
                        onKeyDown={e => e.key === "Enter" && handleLogin()}
                        className="w-full border border-zinc-200 rounded-full px-5 py-3 focus:outline-none focus:border-[#0d631b]"
                    />
                    {errorPassword && <p className="text-red-500 text-sm">Contraseña incorrecta</p>}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-[#0d631b] text-white font-bold py-4 rounded-full hover:scale-105 transition-transform"
                    >
                        Entrar
                    </button>
                </div>
            </main>
        )
    }

    const totalDia = pedidos.reduce((acc, p) => acc + p.total, 0)

    return (
        <main className="max-w-4xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Panel del vendedor</h2>
                <button
                    onClick={() => setAutenticado(false)}
                    className="text-zinc-500 font-bold hover:text-zinc-800"
                >
                    Cerrar sesión
                </button>
            </div>

            {/* Filtros */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={() => setFiltro("hoy")}
                    className={`px-6 py-2 rounded-full font-bold transition-colors ${filtro === "hoy" ? "bg-[#0d631b] text-white" : "bg-white text-zinc-600 border border-zinc-200"}`}
                >
                    Hoy
                </button>
                <button
                    onClick={() => setFiltro("todos")}
                    className={`px-6 py-2 rounded-full font-bold transition-colors ${filtro === "todos" ? "bg-[#0d631b] text-white" : "bg-white text-zinc-600 border border-zinc-200"}`}
                >
                    Todos
                </button>
                <button
                    onClick={cargarPedidos}
                    className="px-6 py-2 rounded-full font-bold bg-white text-zinc-600 border border-zinc-200 hover:border-[#0d631b] transition-colors"
                >
                    🔄 Actualizar
                </button>
            </div>

            {/* Resumen */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                    <p className="text-zinc-500 text-sm mb-1">Pedidos</p>
                    <p className="text-3xl font-bold">{pedidos.length}</p>
                </div>
                <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                    <p className="text-zinc-500 text-sm mb-1">Total recaudado</p>
                    <p className="text-3xl font-bold text-[#0d631b]">{totalDia.toFixed(2)}€</p>
                </div>
            </div>

            {/* Lista de pedidos */}
            {cargando ? (
                <p className="text-center text-zinc-500 py-10">Cargando pedidos...</p>
            ) : pedidos.length === 0 ? (
                <p className="text-center text-zinc-500 py-10">No hay pedidos todavía</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {pedidos.map(p => (
                        <div key={p.id} className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-lg">{p.nombre}</h4>
                                    {p.email && <p className="text-zinc-500 text-sm">{p.email}</p>}
                                    <p className="text-zinc-400 text-xs mt-1">{new Date(p.created_at).toLocaleString("es-ES")}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-[#0d631b] text-lg">{p.total.toFixed(2)}€</p>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${p.metodo_pago === "efectivo" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                    {p.metodo_pago === "efectivo" ? "💵 Efectivo" : "💳 Tarjeta"}
                  </span>
                                </div>
                            </div>
                            <div className="border-t border-zinc-100 pt-3 flex flex-col gap-1">
                                {p.productos.map((prod, i) => (
                                    <div key={i} className="flex justify-between text-sm text-zinc-600">
                                        <span>{prod.nombre} — {prod.kg}{prod.unidad}</span>
                                        <span className="font-bold">{(prod.precio * prod.kg).toFixed(2)}€</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}