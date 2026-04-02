import { useCarrito } from "../context/CarritoContext"

export default function ProductCard({ nombre, precio, unidad, imagen }) {
    const { añadirProducto } = useCarrito()

    return (
        <div className="bg-white p-5 rounded-[32px] shadow-[0_12px_40px_rgba(25,28,28,0.06)] group transition-all hover:-translate-y-2">
            <div className="rounded-[24px] overflow-hidden aspect-square mb-5 bg-zinc-100">
                <img
                    src={imagen}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    alt={nombre}
                />
            </div>
            <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-xl">{nombre}</h4>
                <span className="text-[#0d631b] font-bold">{precio.toFixed(2)}€/{unidad}</span>
            </div>
            <button
                onClick={() => añadirProducto({ nombre, precio, unidad, imagen })}
                className="w-full bg-[#ffdcc6] text-[#311300] font-bold py-4 rounded-full hover:bg-orange-200 transition-colors"
            >
                Añadir
            </button>
        </div>
    )
}