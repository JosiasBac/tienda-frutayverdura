import { Resend } from "npm:resend@4.0.1"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get("RESEND_API_KEY")
    const fromEmail = Deno.env.get("RESEND_FROM_EMAIL")

    if (!apiKey || !fromEmail) {
      return new Response(JSON.stringify({ error: "Faltan RESEND_API_KEY o RESEND_FROM_EMAIL" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const { to, nombre, total, metodoPago, horaRecogida, productos } = await req.json()

    if (!to) {
      return new Response(JSON.stringify({ error: "Email de destino requerido" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const listaProductos = Array.isArray(productos)
      ? productos
          .map((p: any) => `<li>${p.nombre} - ${p.kg}${p.unidad} (${(p.precio * p.kg).toFixed(2)}EUR)</li>`)
          .join("")
      : ""

    const html = `
      <div style="font-family: Arial, sans-serif; color: #1f2937;">
        <h2>Pedido confirmado, ${nombre || "cliente"}!</h2>
        <p>Gracias por tu compra en The Digital Market.</p>
        <p><strong>Metodo de pago:</strong> ${metodoPago === "stripe" ? "Tarjeta" : "Efectivo"}</p>
        <p><strong>Hora de recogida:</strong> ${horaRecogida || "Sin especificar"}</p>
        <p><strong>Total:</strong> ${(Number(total) || 0).toFixed(2)}EUR</p>
        <h3>Resumen del pedido</h3>
        <ul>${listaProductos}</ul>
        <p>Si necesitas modificar algo, responde a este correo o contactanos por WhatsApp.</p>
      </div>
    `

    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to,
      subject: "Tu pedido ha sido confirmado",
      html,
    })

    if (error) {
      return new Response(JSON.stringify({ error: error.message || "Error enviando correo" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify({ ok: true, id: data?.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
