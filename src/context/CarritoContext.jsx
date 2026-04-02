import { createContext, useContext, useState, useEffect } from "react"

const CarritoContext = createContext()

export function CarritoProvider({ children }) {
    const [carrito, setCarrito] = useState(() => {
        const guardado = localStorage.getItem("carrito")
        return guardado ? JSON.parse(guardado) : []
    })

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }, [carrito])

    function añadirProducto(producto) {
        setCarrito(prev => {
            const existe = prev.find(p => p.nombre === producto.nombre)
            if (existe) {
                return prev.map(p =>
                    p.nombre === producto.nombre ? { ...p, kg: p.kg + 1 } : p
                )
            }
            return [...prev, { ...producto, kg: 1 }]
        })
    }

    function cambiarKg(nombre, cantidad) {
        setCarrito(prev =>
            prev.map(p => p.nombre === nombre ? { ...p, kg: Math.max(0.5, cantidad) } : p)
        )
    }

    function eliminarProducto(nombre) {
        setCarrito(prev => prev.filter(p => p.nombre !== nombre))
    }

    function vaciarCarrito() {
        setCarrito([])
    }

    const totalItems = carrito.reduce((acc, p) => acc + p.kg, 0)
    const totalPrecio = carrito.reduce((acc, p) => acc + p.precio * p.kg, 0)

    return (
        <CarritoContext.Provider value={{ carrito, añadirProducto, cambiarKg, eliminarProducto, vaciarCarrito, totalItems, totalPrecio }}>
            {children}
        </CarritoContext.Provider>
    )
}

export function useCarrito() {
    return useContext(CarritoContext)
}