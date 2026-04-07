
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

            <section className="relative rounded-[24px] sm:rounded-[40px] overflow-hidden bg-zinc-900 min-h-[320px] sm:min-h-[450px] flex items-center mb-10 sm:mb-16">
                <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    alt="Fondo"
                />
                <div className="relative z-10 p-6 sm:p-12 max-w-2xl">
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                        La mejor selección de fruta y verduras
                    </h1>
                    <a
                    href="https://wa.me/684347441?text=Hola! Quiero hacer un pedido"
                    className="inline-block bg-[#0d631b] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:scale-105 transition-transform"
                    >
                    📲 Hacer pedido por WhatsApp
                </a>
            </div>
        </section>

            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">Nuestros Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8">
                {productos.map(p => (
                    <ProductCard key={p.nombre} {...p} />
                ))}
            </div>

            <section className="mt-14 sm:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <article className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                    <p className="text-sm font-bold text-[#0d631b] mb-2">🌱 Temporada y origen</p>
                    <h3 className="text-xl font-bold mb-2">Producto fresco cada semana</h3>
                    <p className="text-zinc-600 text-sm leading-6">
                        Trabajamos con productos de temporada para ofrecer mejor sabor, precio justo y rotación diaria.
                        Priorizamos fruta y verdura local siempre que está disponible.
                    </p>
                </article>
                <article className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                    <p className="text-sm font-bold text-[#0d631b] mb-2">🧺 Como funciona</p>
                    <h3 className="text-xl font-bold mb-2">Compra en 3 pasos</h3>
                    <p className="text-zinc-600 text-sm leading-6">
                        Elige productos, selecciona hora de recogida y paga online o en tienda.
                        Recibirás tu pedido preparado para recoger de forma rapida y comoda.
                    </p>
                </article>
                <article className="bg-white rounded-[24px] p-6 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                    <p className="text-sm font-bold text-[#0d631b] mb-2">✅ Confianza</p>
                    <h3 className="text-xl font-bold mb-2">Calidad y atencion cercana</h3>
                    <p className="text-zinc-600 text-sm leading-6">
                        Revisamos el genero antes de preparar el pedido y te atendemos por WhatsApp para cualquier duda
                        o cambio de ultima hora.
                    </p>
                </article>
            </section>

            <section className="mt-8 sm:mt-10 bg-white rounded-[24px] p-6 sm:p-8 shadow-[0_12px_40px_rgba(25,28,28,0.06)]">
                <h3 className="text-xl sm:text-2xl font-bold mb-3">Recogida y contacto</h3>
                <p className="text-zinc-600 leading-7">
                    Horario de recogida: lunes a sabado, de 8:00 a 14:00. Si necesitas un horario especial, escribenos y
                    buscamos la mejor opcion para ti.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                    <a
                        href="https://wa.me/684347441?text=Hola! Quiero consultar un pedido"
                        className="inline-block bg-[#0d631b] text-white px-6 py-3 rounded-full font-bold"
                    >
                        💬 Contactar por WhatsApp
                    </a>
                    <a href="tel:+34684347441" className="inline-block bg-zinc-100 text-zinc-700 px-6 py-3 rounded-full font-bold">
                        📞 Llamar ahora
                    </a>
                </div>
            </section>
</main>
)
}