import { useCarrito } from "../context/CarritoContext"
import { useNavigate } from "react-router-dom"

export default function Header() {
    const { totalItems, toggleCarrito } = useCarrito()
    const navigate = useNavigate()

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-3">
                <span
                    onClick={() => navigate("/")}
                    className="text-lg sm:text-2xl font-extrabold text-green-900 cursor-pointer truncate"
                >
                    The Digital Market
                </span>
                <div className="flex items-center gap-2 sm:gap-6 font-bold text-zinc-600">
                    <button onClick={() => navigate("/")} className="hover:text-[#0d631b] inline-flex items-center gap-1.5 px-2 py-1 rounded-full">
                        <span aria-hidden>🏪</span>
                        <span className="hidden sm:inline">Tienda</span>
                    </button>
                    <button
                        onClick={toggleCarrito}
                        className="hover:text-[#0d631b] relative inline-flex items-center gap-1.5 px-2 py-1 rounded-full"
                    >
                        <span aria-hidden>🛒</span>
                        <span className="hidden sm:inline">Carrito</span>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#0d631b] text-white text-[11px] leading-5 text-center">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </nav>
        </header>
    )
}