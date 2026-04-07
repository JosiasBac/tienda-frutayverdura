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
    const [busqueda, setBusqueda] = useState("")

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

    async function exportarExcel() {
        if (pedidosFiltrados.length === 0) return
        const XLSX = await import("xlsx")

        const filas = pedidosFiltrados.map(p => ({
            Fecha: new Date(p.created_at).toLocaleString("es-ES"),
            Cliente: p.nombre,
            Email: p.email || "",
            MetodoPago: p.metodo_pago,
            Estado: p.estado || "",
            HoraRecogida: p.hora_recogida || "",
            TotalEUR: Number(p.total?.toFixed?.(2) || p.total || 0),
            Productos: Array.isArray(p.productos)
                ? p.productos.map(prod => `${prod.nombre} (${prod.kg}${prod.unidad})`).join(", ")
                : "",
        }))

        const hoja = XLSX.utils.json_to_sheet(filas)
        const libro = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(libro, hoja, "Ventas")

        const fecha = new Date().toISOString().slice(0, 10)
        XLSX.writeFile(libro, `ventas-${fecha}.xlsx`)
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

    const pedidosFiltrados = pedidos.filter(p => {
        if (!busqueda.trim()) return true
        const q = busqueda.toLowerCase()
        const cliente = (p.nombre || "").toLowerCase()
        const correo = (p.email || "").toLowerCase()
        const productos = Array.isArray(p.productos)
            ? p.productos.map(prod => prod.nombre?.toLowerCase?.() || "").join(" ")
            : ""
        return cliente.includes(q) || correo.includes(q) || productos.includes(q)
    })

    const totalDia = pedidosFiltrados.reduce((acc, p) => acc + p.total, 0)

    return (
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold">Panel del vendedor</h2>
                <button
                    onClick={() => setAutenticado(false)}
                    className="text-zinc-500 font-bold hover:text-zinc-800"
                >
                    Cerrar sesión
                </button>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-3 mb-4">
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
                <button
                    onClick={exportarExcel}
                    disabled={pedidosFiltrados.length === 0}
                    className="px-6 py-2 rounded-full font-bold bg-white text-zinc-600 border border-zinc-200 hover:border-[#0d631b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    📥 Exportar Excel
                </button>
            </div>
            <div className="mb-6">
                <input
                    type="text"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    placeholder="Buscar por cliente, email o producto..."
                    className="w-full border border-zinc-200 rounded-full px-5 py-3 focus:outline-none focus:border-[#0d631b]"
                />
            </div>

            {/* Resumen */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                    <p className="text-zinc-500 text-sm mb-1">Pedidos</p>
                    <p className="text-3xl font-bold">{pedidosFiltrados.length}</p>
                </div>
                <div className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                    <p className="text-zinc-500 text-sm mb-1">Total recaudado</p>
                    <p className="text-3xl font-bold text-[#0d631b]">{totalDia.toFixed(2)}€</p>
                </div>
            </div>

            {/* Lista de pedidos */}
            {cargando ? (
                <p className="text-center text-zinc-500 py-10">Cargando pedidos...</p>
            ) : pedidosFiltrados.length === 0 ? (
                <p className="text-center text-zinc-500 py-10">No hay pedidos todavía</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {pedidosFiltrados.map(p => (
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
                                {p.hora_recogida && (
                                    <p className="text-[#0d631b] font-bold text-sm mb-2">🕐 Recogida a las {p.hora_recogida}</p>
                                )}
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