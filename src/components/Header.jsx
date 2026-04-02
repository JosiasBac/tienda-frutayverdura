import { useCarrito } from "../context/CarritoContext"
import { useNavigate } from "react-router-dom"

export default function Header() {
    const { totalItems } = useCarrito()
    const navigate = useNavigate()

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
            <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span
            onClick={() => navigate("/")}
            className="text-2xl font-extrabold text-green-900 cursor-pointer"
        >
          The Digital Market
        </span>
                <div className="flex gap-6 font-bold text-zinc-600">
                    <button onClick={() => navigate("/")} className="hover:text-[#0d631b]">Tienda</button>
                    <button
                        onClick={() => navigate("/carrito")}
                        className="hover:text-[#0d631b] relative"
                    >
                        Carrito
                    </button>
                </div>
            </nav>
        </header>
    )
}