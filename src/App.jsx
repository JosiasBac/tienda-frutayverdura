import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Tienda from "./pages/Tienda"
import Carrito from "./pages/Carrito"
import Checkout from "./pages/Checkout"
import Admin from "./pages/Admin"
import Confirmacion from "./pages/Confirmacion"
import CartDrawer from "./components/CartDrawer"

function App() {
    return (
        <div className="bg-[#f9f9f8] text-[#191c1c] min-h-screen">
            <div className="bg-[#0d631b] text-white py-2 text-center text-sm font-bold">
                Recoja su pedido en menos de 20 minutos
            </div>
            <Header />
            <Routes>
                <Route path="/" element={<Tienda />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/confirmacion" element={<Confirmacion />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            <CartDrawer />
            <footer className="bg-zinc-100 py-16 px-6 mt-20">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-2xl font-bold text-green-900">The Digital Market</span>
                    <p className="text-zinc-500 mt-4">© 2026 Directo de la huerta a tu mesa.</p>
                </div>
            </footer>
        </div>
    )
}

export default App