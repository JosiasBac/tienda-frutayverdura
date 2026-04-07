import Stripe from "https://esm.sh/stripe@14.21.0"

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
})

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    })
  }

  try {
    const { carrito, total, nombre, email, horaRecogida } = await req.json()

    const lineItems = carrito.map((p: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: `${p.nombre} (${p.kg}${p.unidad})`,
        },
        unit_amount: Math.round(p.precio * p.kg * 100),
      },
      quantity: 1,
    }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/confirmacion?metodo=stripe&nombre=${encodeURIComponent(nombre)}&email=${encodeURIComponent(email || "")}&total=${total}&hora=${encodeURIComponent(horaRecogida || "")}`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
      customer_email: email || undefined,
      metadata: {
        nombre,
        productos: JSON.stringify(carrito),
        total: total.toString(),
      },
    })

    return new Response(JSON.stringify({ url: session.url }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
  }
})