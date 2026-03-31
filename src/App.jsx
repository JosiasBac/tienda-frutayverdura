function App() {
  return (
      <div className="bg-[#f9f9f8] text-[#191c1c]">

        {/* Banner superior */}
        <div className="bg-[#0d631b] text-white py-2 text-center text-sm font-bold">
          Recoja su pedido en menos de 20 minutos
        </div>

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <span className="text-2xl font-extrabold text-green-900">Pepito</span>
            <div className="flex gap-6 font-bold text-zinc-600">
              <button className="hover:text-[#0d631b]">Tienda</button>
              <button className="hover:text-[#0d631b]">Carrito (0)</button>
            </div>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-10">

          {/* Hero */}
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

             <a href="https://wa.me/684347441"
              className="inline-block bg-[#0d631b] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
              >
              Hacer pedido por Whatsapp
            </a>
      </div>
</section>

{/* Productos */}
  <h2 className="text-3xl font-bold mb-10 text-center">Nuestros Productos</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    <div className="bg-white p-5 rounded-[32px] shadow-[0_12px_40px_rgba(25,28,28,0.06)] group transition-all hover:-translate-y-2">
      <div className="rounded-[24px] overflow-hidden aspect-square mb-5 bg-zinc-100">
        <img
            src="https://images.unsplash.com/photo-1597362868123-a5861895ac30?q=60&w=800"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            alt="Tomates"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-xl">Tomates</h4>
        <span className="text-[#0d631b] font-bold">2.45€/Kg</span>
      </div>
      <button className="w-full bg-[#ffdcc6] text-[#311300] font-bold py-4 rounded-full hover:bg-orange-200 transition-colors">
        Añadir
      </button>
    </div>

    <div className="bg-white p-5 rounded-[32px] shadow-[0_12px_40px_rgba(25,28,28,0.06)] group transition-all hover:-translate-y-2">
      <div className="rounded-[24px] overflow-hidden aspect-square mb-5 bg-zinc-100">
        <img
            src="https://images.unsplash.com/photo-1518977676601-b53f02ac6d31?q=60&w=800"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
            alt="Patatas"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-xl">Patatas</h4>
        <span className="text-[#0d631b] font-bold">1.00€/Kg</span>
      </div>
      <button className="w-full bg-[#ffdcc6] text-[#311300] font-bold py-4 rounded-full hover:bg-orange-200 transition-colors">
        Añadir
      </button>
    </div>

  </div>
</main>

  {/* Footer */}
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