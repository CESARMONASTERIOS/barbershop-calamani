/**
 * API de BarberShop (Calamani): guarda la reserva en PostgreSQL y envía por WhatsApp
 * (desde el número +591 76243108) el mensaje "cita agendada" al celular del cliente.
 *
 * Requisitos: número registrado en WhatsApp Business Platform (Meta) y una plantilla
 * aprobada llamada "cita_agendada" (idioma es) con este cuerpo:
 *   Hola {{1}}, su cita fue agendada en BarberShop Calamani: {{2}} a las {{3}} con {{4}}.
 *   Código {{5}}. Responda SÍ para confirmar su asistencia o NO para cancelar.
 */
import "dotenv/config";
import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
app.use(cors());
app.use(express.json());
const db = new Pool({ connectionString: process.env.DATABASE_URL });
const GRAPH = `https://graph.facebook.com/v20.0/${process.env.WA_PHONE_NUMBER_ID}/messages`;

async function enviarWhatsApp(tel: string, v: string[]): Promise<boolean> {
  const r = await fetch(GRAPH, {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.WA_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: `591${tel}`,
      type: "template",
      template: { name: "cita_agendada", language: { code: "es" },
        components: [{ type: "body", parameters: v.map((text) => ({ type: "text", text })) }] },
    }),
  });
  return r.ok;
}

app.post("/api/reservas", async (req, res) => {
  const { id, nombre, ci, tel, fecha, hora, barb, barbero, serv } = req.body;
  if (!/^[67]\d{7}$/.test(tel) || !/^\d{6,9}$/.test(ci) || !nombre || !fecha || hora === undefined)
    return res.status(400).json({ error: "Datos inválidos" });
  try {
    const cli = await db.query(
      `INSERT INTO cliente(nombre, ci, telefono) VALUES($1,$2,$3)
       ON CONFLICT (ci) DO UPDATE SET telefono = EXCLUDED.telefono RETURNING id_cliente`, [nombre, ci, tel]);
    await db.query(
      `INSERT INTO cita_reserva(codigo, id_cliente, id_barbero, servicio, fecha, hora)
       VALUES($1,$2,$3,$4,$5,$6)`, [id, cli.rows[0].id_cliente, barb, serv, fecha, `${hora}:00`]);
    const hh = `${String(hora).padStart(2, "0")}:00`;
    const ok = await enviarWhatsApp(tel, [nombre, fecha, hh, barbero, id]);
    await db.query("INSERT INTO notificacion_whatsapp(codigo, estado) VALUES($1,$2)", [id, ok ? "enviado" : "error"]);
    res.status(ok ? 201 : 202).json({ ok });
  } catch (e) {
    res.status(500).json({ error: "No se pudo guardar la reserva" });
  }
});

// Verificación del webhook (Meta)
app.get("/webhook", (req, res) =>
  req.query["hub.verify_token"] === process.env.WA_VERIFY_TOKEN
    ? res.send(req.query["hub.challenge"]) : res.sendStatus(403));

// Respuestas del cliente: SÍ confirma, NO cancela
app.post("/webhook", async (req, res) => {
  const m = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
  const txt = (m?.text?.body ?? "").trim().toUpperCase();
  if (m && (txt === "SÍ" || txt === "SI" || txt === "NO")) {
    await db.query(
      `UPDATE cita_reserva SET estado = $1
       WHERE estado = 'pendiente' AND id_cliente IN (SELECT id_cliente FROM cliente WHERE telefono = $2)`,
      [txt === "NO" ? "cancelada" : "confirmada", String(m.from).slice(3)]);
  }
  res.sendStatus(200);
});

app.listen(Number(process.env.PORT ?? 3000));
