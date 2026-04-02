
import ProductCard from "../components/ProductCard"

const productos = [
    { nombre: "Tomates", precio: 2.45, unidad: "Kg", imagen: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=60&w=800" },
    { nombre: "Patatas", precio: 1.00, unidad: "Kg", imagen: "https://images.unsplash.com/photo-1508313880080-c4bef0730395?q=60&w=800" },
    { nombre: "Naranjas", precio: 1.80, unidad: "Kg", imagen: "https://images.unsplash.com/photo-1547514701-42782101795e?q=60&w=800" },
    { nombre: "Lechugas", precio: 0.90, unidad: "ud", imagen: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=60&w=800" },
    { nombre: "Fresas", precio: 3.20, unidad: "Kg", imagen: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=60&w=800" },
    { nombre: "Pimientos", precio: 2.10, unidad: "Kg", imagen: "https://images.unsplash.com/photo-1525607551316-4a8e16d1f9ba?q=60&w=800" },
    { nombre: "Plátanos", precio: 1.60, unidad: "Kg", imagen: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=60&w=800" },
    { nombre: "Zanahorias", precio: 1.20, unidad: "Kg", imagen: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=60&w=800" },
]

export default function Tienda() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-10">

            <section className="relative rounded-[40px] overflow-hidden bg-zinc-900 min-h-[450px] flex items-center mb-16">
                <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    alt="Fondo"
                />
                <div className="relative z-10 p-12 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        La mejor selección de fruta y verduras
                    </h1>
                    <a
                    href="https://wa.me/684347441?text=Hola! Quiero hacer un pedido"
                    className="inline-block bg-[#0d631b] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
                    >
                    Hacer pedido por Whatsapp
                </a>
            </div>
        </section>

    <h2 className="text-3xl font-bold mb-10 text-center">Nuestros Productos</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {productos.map(p => (
            <ProductCard key={p.nombre} {...p} />
        ))}
    </div>
</main>
)
}