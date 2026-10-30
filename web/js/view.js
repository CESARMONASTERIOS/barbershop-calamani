(function (global) {
"use strict";

const React = global.React;
const h = React.createElement;
const F = React.Fragment;
const M = global.BarberShopModel;
const {TEAM, SERV, BARB, SUC, PHASE1, DD, SOON, CLS, REL, UW, UH, DFD, clip, wrap, hh, bn, wa, msgNeg} = M;

function Uml() {
  const position = (clase) => [25 + clase[1] * 200, 25 + clase[2] * 190];
  const center = (clase) => {
    const [x, y] = position(clase);
    return [x + UW / 2, y + UH(clase) / 2];
  };

  return h(
    "div",
    { className: "uml" },
    h(
      "svg",
      { viewBox: "0 0 1000 770" },
      h(
        "defs",
        null,
        h(
          "marker",
          {
            id: "tri",
            markerWidth: 14,
            markerHeight: 14,
            refX: 12,
            refY: 7,
            orient: "auto",
          },
          h("path", {
            d: "M1,1 L12,7 L1,13 z",
            fill: "#1a1612",
            stroke: "#e9b44c",
            strokeWidth: 2,
          }),
        ),
      ),
      REL.map((relation, index) => {
        const source = CLS[relation[0]];
        const target = CLS[relation[1]];
        const sourceCenter = center(source);
        const targetCenter = center(target);
        const dx = targetCenter[0] - sourceCenter[0];
        const dy = targetCenter[1] - sourceCenter[1];
        const sourcePoint = clip(
          sourceCenter[0],
          sourceCenter[1],
          UW / 2,
          UH(source) / 2,
          dx,
          dy,
        );
        const targetPoint = clip(
          targetCenter[0],
          targetCenter[1],
          UW / 2,
          UH(target) / 2,
          -dx,
          -dy,
        );
        const normalX = -sourcePoint[3];
        const normalY = sourcePoint[2];
        const multiplicity = (text, x, y) =>
          h(
            "text",
            {
              x: x + normalX * 11,
              y: y + normalY * 11 + 4,
              fontSize: 13,
              fontWeight: 800,
              textAnchor: "middle",
              style: { fill: "#e9b44c" },
            },
            text,
          );

        return h(
          "g",
          { key: index },
          h("line", {
            x1: sourcePoint[0],
            y1: sourcePoint[1],
            x2: targetPoint[0],
            y2: targetPoint[1],
            stroke: "#e9b44c",
            strokeWidth: 2,
            markerEnd: relation[4] === "g" ? "url(#tri)" : undefined,
          }),
          relation[2] &&
            multiplicity(
              relation[2],
              sourcePoint[0] + sourcePoint[2] * 16,
              sourcePoint[1] + sourcePoint[3] * 16,
            ),
          relation[3] &&
            multiplicity(
              relation[3],
              targetPoint[0] + targetPoint[2] * 16,
              targetPoint[1] + targetPoint[3] * 16,
            ),
          relation[4] &&
            relation[4] !== "g" &&
            h(
              "text",
              {
                x: (sourcePoint[0] + targetPoint[0]) / 2,
                y: (sourcePoint[1] + targetPoint[1]) / 2 - 5,
                fontSize: 11,
                fontStyle: "italic",
                textAnchor: "middle",
                style: {
                  fill: "var(--tx)",
                  stroke: "var(--sf)",
                  strokeWidth: 4,
                  paintOrder: "stroke",
                },
              },
              relation[4],
            ),
        );
      }),
      CLS.map((clase) => {
        const [x, y] = position(clase);
        const attributeHeight = 24 + clase[4].length * 14 + 6;

        return h(
          "g",
          { key: clase[0] },
          h("rect", {
            x,
            y,
            width: UW,
            height: UH(clase),
            rx: 8,
            fill: "#1a1612",
            stroke: clase[3],
            strokeWidth: 2,
          }),
          h("path", {
            d: `M${x},${y + 24} v-16 a8,8 0 0 1 8,-8 h${UW - 16} a8,8 0 0 1 8,8 v16 z`,
            fill: clase[3],
          }),
          h(
            "text",
            {
              x: x + UW / 2,
              y: y + 17,
              textAnchor: "middle",
              fill: "#fff",
              fontWeight: 800,
              fontSize: 13,
            },
            clase[0],
          ),
          clase[4].map((attribute, index) =>
            h(
              "text",
              {
                key: attribute,
                x: x + 8,
                y: y + 38 + index * 14,
                fill: "#f4ede0",
                fontSize: 11,
              },
              `- ${attribute}`,
            ),
          ),
          h("line", {
            x1: x,
            x2: x + UW,
            y1: y + attributeHeight,
            y2: y + attributeHeight,
            stroke: clase[3],
          }),
          clase[5].map((method, index) =>
            h(
              "text",
              {
                key: method,
                x: x + 8,
                y: y + attributeHeight + 14 + index * 14,
                fill: "#cfc4b0",
                fontSize: 11,
              },
              `+ ${method}`,
            ),
          ),
        );
      }),
    ),
    h(
      "p",
      {
        className: "lead",
        style: { margin: "6px 0 0", fontSize: 13 },
      },
      "17 clases con atributos y métodos. Multiplicidades: 1, 0..1, *. El triángulo indica herencia (Barbero es un Empleado). Desliza horizontalmente en el celular.",
    ),
  );
}

function Dfd() {
  const [selectedModel, setSelectedModel] = React.useState("amb");
  const diagram = DFD[selectedModel];
  const size = (node) => {
    if (node[0] === "p") {
      return selectedModel === "amb" ? [95, 60] : [78, 44];
    }

    return node[0] === "s" ? [68, 17] : [64, 22];
  };

  return h(
    F,
    null,
    h(
      "div",
      { className: "tabs" },
      Object.keys(DFD).map((key) =>
        h(
          "button",
          {
            key,
            className: selectedModel === key ? "on" : "",
            onClick: () => setSelectedModel(key),
          },
          DFD[key].t,
        ),
      ),
    ),
    h("p", { className: "lead" }, diagram.d),
    h(
      "div",
      { className: "uml" },
      h(
        "svg",
        {
          viewBox: `0 0 920 ${diagram.h}`,
          style: { minWidth: 820 },
        },
        h(
          "defs",
          null,
          h(
            "marker",
            {
              id: "ar",
              viewBox: "0 0 10 10",
              markerWidth: 8,
              markerHeight: 8,
              refX: 9,
              refY: 5,
              orient: "auto",
            },
            h("path", {
              d: "M0,0 L10,5 L0,10 z",
              style: { fill: "var(--tx)" },
            }),
          ),
        ),
        diagram.f.map((flow, index) => {
          const source = diagram.n[flow[0]];
          const target = diagram.n[flow[1]];
          const sourceSize = size(source);
          const targetSize = size(target);
          const dx = target[2] - source[2];
          const dy = target[3] - source[3];
          const length = Math.hypot(dx, dy) || 1;
          const curve = flow[3];
          const controlX =
            (source[2] + target[2]) / 2 - (dy / length) * curve * 2;
          const controlY =
            (source[3] + target[3]) / 2 + (dx / length) * curve * 2;
          const sourcePoint = clip(
            source[2],
            source[3],
            sourceSize[0],
            sourceSize[1],
            controlX - source[2],
            controlY - source[3],
            source[0] === "p",
          );
          const targetPoint = clip(
            target[2],
            target[3],
            targetSize[0],
            targetSize[1],
            controlX - target[2],
            controlY - target[3],
            target[0] === "p",
          );
          const labelX =
            0.25 * sourcePoint[0] + 0.5 * controlX + 0.25 * targetPoint[0];
          const labelY =
            0.25 * sourcePoint[1] + 0.5 * controlY + 0.25 * targetPoint[1];

          return h(
            "g",
            { key: index },
            h("path", {
              d: `M${sourcePoint[0]},${sourcePoint[1]} Q${controlX},${controlY} ${targetPoint[0]},${targetPoint[1]}`,
              fill: "none",
              strokeWidth: 1.8,
              markerEnd: "url(#ar)",
              style: { stroke: "var(--tx)" },
            }),
            h(
              "text",
              {
                x: labelX,
                y: labelY - 4,
                textAnchor: "middle",
                fontSize: 11,
                fontWeight: 700,
                style: {
                  fill: "var(--tx)",
                  stroke: "var(--sf)",
                  strokeWidth: 4,
                  paintOrder: "stroke",
                },
              },
              flow[2],
            ),
          );
        }),
        diagram.n.map((node, index) => {
          const [width, height] = size(node);
          const x = node[2];
          const y = node[3];

          if (node[0] === "e") {
            return h(
              "g",
              { key: index },
              h("rect", {
                x: x - width,
                y: y - height,
                width: width * 2,
                height: height * 2,
                rx: 4,
                fill: "#1d4ed8",
              }),
              h(
                "text",
                {
                  x,
                  y: y + 4,
                  textAnchor: "middle",
                  fontSize: 12,
                  fontWeight: 800,
                  fill: "#fff",
                },
                node[1],
              ),
            );
          }

          if (node[0] === "s") {
            return h(
              "g",
              { key: index },
              h("rect", {
                x: x - width,
                y: y - height,
                width: width * 2,
                height: height * 2,
                strokeWidth: 2,
                style: { fill: "var(--bg)", stroke: "#e9b44c" },
              }),
              h("line", {
                x1: x - width + 16,
                x2: x - width + 16,
                y1: y - height,
                y2: y + height,
                strokeWidth: 2,
                style: { stroke: "#e9b44c" },
              }),
              h(
                "text",
                {
                  x: x + 8,
                  y: y + 4,
                  textAnchor: "middle",
                  fontSize: 11,
                  fontWeight: 800,
                  style: { fill: "var(--tx)" },
                },
                node[1],
              ),
            );
          }

          const labelLines = wrap(node[1]);

          return h(
            "g",
            { key: index },
            h("ellipse", {
              cx: x,
              cy: y,
              rx: width,
              ry: height,
              fill: "#e9b44c",
              stroke: "#8a5d12",
              strokeWidth: 2,
            }),
            h(
              "text",
              {
                x,
                y:
                  y -
                  (selectedModel === "amb"
                    ? 28
                    : labelLines.length > 1
                      ? 13
                      : 11),
                textAnchor: "middle",
                fontSize: 11,
                fontWeight: 800,
                fill: "#7a1f1f",
              },
              node[4],
            ),
            labelLines.map((line, lineIndex) =>
              h(
                "text",
                {
                  key: lineIndex,
                  x,
                  y:
                    y +
                    (labelLines.length > 1
                      ? (selectedModel === "amb" ? 4 : 3) +
                        lineIndex * (selectedModel === "amb" ? 20 : 13)
                      : 5),
                  textAnchor: "middle",
                  fontSize: selectedModel === "amb" ? 18 : 12,
                  fontWeight: 800,
                  fill: "#17130e",
                },
                line,
              ),
            ),
          );
        }),
      ),
    ),
    h(
      "p",
      {
        className: "lead",
        style: { margin: "6px 0 0", fontSize: 13 },
      },
      "🟦 Entidad externa · 🟡 Proceso · ▭ Almacén de datos · → Flujo de datos",
    ),
  );
}

function BookingView({
  f,
  set,
  er,
  hoy,
  bs,
  b,
  s,
  trab,
  slots,
  bad,
  msg,
  enviar,
  citas,
  cambiar,
}) {
  const labelField = (key, text, element) =>
    h(
      "label",
      { className: er[key] ? "bad" : "" },
      text,
      element,
      er[key] && h("span", { className: "fe" }, er[key]),
    );

  return h(
    "form",
    { onSubmit: enviar, noValidate: true },
    labelField(
      "nombre",
      "Nombre completo",
      h("input", {
        value: f.nombre,
        maxLength: 60,
        onChange: (event) => set("nombre", event.target.value),
        placeholder: "Ej. Juan Pérez",
      }),
    ),
    labelField(
      "ci",
      "Cédula de identidad",
      h("input", {
        inputMode: "numeric",
        maxLength: 9,
        value: f.ci,
        onChange: (event) =>
          set("ci", event.target.value.replace(/\D/g, "")),
        placeholder: "Solo números",
      }),
    ),
    labelField(
      "tel",
      "Celular / WhatsApp (+591)",
      h("input", {
        inputMode: "numeric",
        maxLength: 8,
        value: f.tel,
        onChange: (event) =>
          set("tel", event.target.value.replace(/\D/g, "")),
        placeholder: "Ej. 71234567",
      }),
    ),
    labelField(
      "suc",
      "Sucursal",
      h(
        "select",
        {
          value: f.suc,
          onChange: (event) => set("suc", event.target.value),
        },
        SUC.map(([name]) => h("option", { key: name }, name)),
      ),
    ),
    labelField(
      "serv",
      "Servicio",
      h(
        "select",
        {
          value: f.serv,
          onChange: (event) => set("serv", event.target.value),
        },
        SERV.map((service) =>
          h("option", { key: service[1] }, service[1]),
        ),
      ),
    ),
    labelField(
      "barb",
      "Barbero",
      h(
        "select",
        {
          value: f.barb,
          onChange: (event) => set("barb", event.target.value),
        },
        h("option", { value: "" }, "Elige…"),
        bs.map((barber) =>
          h(
            "option",
            { key: barber[0], value: barber[0] },
            `${barber[1]} · ${barber[3]}`,
          ),
        ),
      ),
    ),
    labelField(
      "fecha",
      "Fecha",
      h("input", {
        type: "date",
        min: hoy,
        value: f.fecha,
        onChange: (event) => set("fecha", event.target.value),
      }),
    ),
    b &&
      !trab &&
      f.fecha &&
      h(
        "div",
        { className: "err" },
        `${b[1]} no atiende ese día (${b[3]}). Elige otra fecha u otro barbero.`,
      ),
    b &&
      trab &&
      h(
        "div",
        { className: "slots" },
        slots.map((time) =>
          h(
            "button",
            {
              type: "button",
              key: time,
              disabled: bad(time),
              className: f.hora === time ? "on" : "",
              onClick: () => set("hora", time),
            },
            hh(time),
          ),
        ),
        er.hora &&
          h(
            "span",
            { className: "fe", style: { width: "100%" } },
            er.hora,
          ),
      ),
    h(
      "div",
      { className: "lead", style: { gridColumn: "1/-1", margin: 0 } },
      `Precio: Bs ${s[2]} · Duración aprox. ${s[3]} min. Te escribiremos por WhatsApp desde +591 76243108 para confirmar tu asistencia. Si no llegas a tu hora pierdes el adelanto.`,
    ),
    msg &&
      h(
        "div",
        { className: "ok" },
        `✅ ¡Cita reservada! Código ${msg.id} — ${msg.nombre}, ${msg.fecha} a las ${hh(msg.hora)} con ${bn(msg.barb)}.`,
        h(
          "div",
          { className: "sms" },
          h(
            "small",
            null,
            `💬 WhatsApp de +591 76243108 a +591 ${msg.tel} · ${
              msg.wa === "enviado" ? "✔ enviado" : "⏳ pendiente de envío"
            }`,
          ),
          h("p", null, msgNeg(msg)),
        ),
        msg.wa !== "enviado" &&
          h(
            "p",
            { style: { fontSize: 13, margin: "8px 0 0" } },
            "El envío automático necesita el servidor de WhatsApp (carpeta server). Mientras tanto, el administrador puede enviarlo desde el panel de abajo.",
          ),
      ),
    h(
      "button",
      {
        className: "btn",
        type: "submit",
        style: { gridColumn: "1/-1" },
      },
      "💈 Sacar cita",
    ),
    citas.length > 0 &&
      h(
        "div",
        { style: { gridColumn: "1/-1" } },
        h(
          "h3",
          { style: { fontSize: 20, margin: "8px 0" } },
          "Citas agendadas (panel del administrador)",
        ),
        h(
          "p",
          { className: "lead", style: { fontSize: 13, margin: "0 0 8px" } },
          "“Pedir confirmación” abre WhatsApp con el chat del cliente y el mensaje listo. Para que salga desde +591 76243108, ábrelo en el WhatsApp de ese número.",
        ),
        citas
          .slice()
          .reverse()
          .map((cita) =>
            h(
              "div",
              { className: "cita", key: cita.id },
              h(
                "div",
                null,
                h("b", null, `${cita.id} · ${cita.nombre}`),
                h("br"),
                h(
                  "small",
                  null,
                  `${cita.fecha} ${hh(cita.hora)} · ${cita.suc} · ${bn(cita.barb)} · +591 ${cita.tel}`,
                ),
              ),
              h(
                "span",
                { className: `pill st-${cita.estado}` },
                cita.estado,
              ),
              h(
                "div",
                { className: "acts" },
                cita.estado !== "cancelada" &&
                  h(
                    "a",
                    {
                      className: "mini",
                      target: "_blank",
                      rel: "noopener",
                      href: wa(`591${cita.tel}`, msgNeg(cita)),
                    },
                    "📲 Pedir confirmación",
                  ),
                cita.estado === "pendiente" &&
                  h(
                    "button",
                    {
                      type: "button",
                      className: "mini",
                      onClick: () => cambiar(cita.id, "confirmada"),
                    },
                    "✅ Confirmada",
                  ),
                cita.estado !== "cancelada" &&
                  h(
                    "button",
                    {
                      type: "button",
                      className: "mini",
                      onClick: () => cambiar(cita.id, "cancelada"),
                    },
                    "❌ Cancelar",
                  ),
              ),
            ),
          ),
      ),
  );
}

function Sec({ id, eb, t, lead, children }) {
  return h(
    "section",
    { id },
    h("div", { className: "eyebrow" }, eb),
    h("h2", null, t),
    lead && h("p", { className: "lead" }, lead),
    children,
  );
}

function AppView({ BookingController }) {
  const nav = [
    ["fase1", "Fase I"],
    ["servicios", "Servicios"],
    ["equipo", "Equipo"],
    ["sucursales", "Sucursales"],
    ["reservar", "Sacar cita"],
    ["modelos", "Modelos DFD"],
    ["fase2", "Fase II"],
    ["fase3", "Fase III"],
  ];
  const stats = [
    ["1", "Sucursal"],
    ["10", "Barberos"],
    ["9–21 h", "Horario"],
    ["21", "Tablas BD"],
  ];

  return h(
    F,
    null,
    h(
      "header",
      { className: "hero" },
      h("div", { className: "pole" }),
      h(
        "div",
        { className: "uni" },
        "Universidad Mayor de San Andrés · Carrera de Informática",
      ),
      h("span", { className: "tag" }, "Análisis y Diseño de Sistemas"),
      h("h1", null, "BarberShop Calamani"),
      h(
        "p",
        null,
        "Sistema de gestión integral y reservas para BarberShop Calamani: citas, inventario, comisiones y reportes en una sola plataforma.",
      ),
      h("a", { className: "btn", href: "#reservar" }, "💈 Sacar cita"),
      h("a", { className: "btn o", href: "#fase1" }, "Ver proyecto"),
      h(
        "div",
        { className: "team" },
        TEAM.map((nombre) => h("span", { key: nombre }, nombre)),
      ),
    ),
    h(
      "nav",
      null,
      nav.map(([id, label]) =>
        h("a", { key: id, href: `#${id}` }, label),
      ),
    ),
    h(
      "main",
      null,
      h(
        "div",
        { className: "stats" },
        stats.map(([value, label]) =>
          h(
            "div",
            { className: "stat", key: label },
            h("b", null, value),
            label,
          ),
        ),
      ),
      h(
        Sec,
        {
          id: "fase1",
          eb: "Fase I",
          t: "Generalidades y marco teórico",
          lead: "El diagnóstico del negocio y la propuesta.",
        },
        h(
          "div",
          { className: "grid" },
          PHASE1.map(([title, content], index) =>
            h(
              "div",
              {
                className: `card${index === 3 ? " wide" : ""}`,
                key: title,
              },
              h("div", { className: "n" }, index + 1),
              h("h3", null, title),
              Array.isArray(content)
                ? h(
                    "ul",
                    null,
                    content.map((item) => h("li", { key: item }, item)),
                  )
                : h("p", null, content),
            ),
          ),
        ),
      ),
      h(
        Sec,
        {
          id: "servicios",
          eb: "Servicios y precios",
          t: "Nuestros estilos",
          lead: "Precios referenciales de ejemplo; se reemplazan por los reales de la barbería.",
        },
        h(
          "div",
          { className: "grid" },
          SERV.map(([icon, name, price, duration, description]) =>
            h(
              "div",
              { className: "card", key: name },
              h("div", { className: "ico" }, icon),
              h("h3", null, name),
              h("p", null, description),
              h("div", { className: "price" }, `Bs ${price}`),
              h("span", { className: "pill" }, `⏱ ${duration} min`),
            ),
          ),
        ),
      ),
      h(
        Sec,
        {
          id: "equipo",
          eb: "Nuestro equipo",
          t: "Barberos y horarios",
          lead: "Datos de ejemplo del equipo.",
        },
        h(
          "div",
          { className: "grid" },
          BARB.map(([id, name, location, days, start, end, specialties]) =>
            h(
              "div",
              { className: "card", key: id },
              h("div", { className: "av" }, name[0]),
              h("h3", null, name),
              h("p", null, `📍 ${location}`),
              h(
                "p",
                null,
                `🕘 ${days}, ${String(start).padStart(2, "0")}:00–${String(end).padStart(2, "0")}:00`,
              ),
              specialties.map((specialty) =>
                h("span", { className: "pill", key: specialty }, specialty),
              ),
            ),
          ),
        ),
      ),
      h(
        Sec,
        {
          id: "sucursales",
          eb: "Dónde estamos",
          t: "Sucursal",
          lead: "Atención todos los días de 09:00 a 21:00.",
        },
        h(
          "div",
          { className: "grid" },
          h(
            "div",
            { className: "card" },
            h("div", { className: "map" }, "📍"),
            h("h3", null, SUC[0][0]),
            h("p", null, SUC[0][1]),
            h("p", null, "🕘 09:00 – 21:00"),
            h(
              "a",
              {
                className: "btn",
                href: "#reservar",
                style: { padding: "9px 20px", fontSize: 14 },
              },
              "Reservar aquí",
            ),
          ),
          h(
            "div",
            {
              className: "card",
              style: { opacity: 0.75, borderStyle: "dashed" },
            },
            h("div", { className: "map" }, "🚧"),
            h("h3", null, "Próximamente"),
            h("p", null, "Otra sucursal muy pronto. ¡Estate atento!"),
            h("span", { className: "pill" }, "En preparación"),
          ),
        ),
      ),
      h(
        Sec,
        {
          id: "reservar",
          eb: "Reservas en línea",
          t: "Saca tu cita",
          lead: "Completa tus datos, elige barbero y horario.",
        },
        h(BookingController),
      ),
      h(
        Sec,
        {
          id: "modelos",
          eb: "Fase II · Análisis estructurado",
          t: "Modelo ambiental y de comportamiento",
          lead: "Modelo ambiental y, aparte, el modelo de comportamiento (DFD niveles 0, 1, 2 y 3).",
        },
        h(Dfd),
      ),
      h(
        Sec,
        {
          id: "fase2",
          eb: "Fase II",
          t: "Análisis y diseño estructurado",
          lead: "Diccionario de datos: toca una tabla para ver sus campos.",
        },
        DD.map((table) =>
          h(
            "details",
            { key: table.n },
            h(
              "summary",
              null,
              `🗂 ${table.n} · ${table.f.length} campos`,
            ),
            h(
              "div",
              { className: "sc" },
              h(
                "table",
                null,
                h(
                  "thead",
                  null,
                  h(
                    "tr",
                    null,
                    ["Campo", "Tipo", "Clave"].map((heading) =>
                      h("th", { key: heading }, heading),
                    ),
                  ),
                ),
                h(
                  "tbody",
                  null,
                  table.f.map(([field, type, key]) =>
                    h(
                      "tr",
                      { key: field },
                      h("td", null, field),
                      h("td", null, type),
                      h("td", { className: "k" }, key || ""),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
        h(
          "div",
          { className: "grid", style: { marginTop: 20 } },
          SOON.filter(
            (item) => item[2] === "Fase II" || item[2] === "Fase I",
          ).map((item) =>
            h(
              "div",
              {
                className: "soon",
                key: item[1],
                style: { background: item[3] },
              },
              h("div", { className: "ico" }, item[0]),
              h("b", null, item[1]),
              h("small", null, `${item[2]} · pendiente`),
            ),
          ),
        ),
      ),
      h(
        Sec,
        {
          id: "fase3",
          eb: "Fase III",
          t: "Análisis y diseño orientado a objetos",
          lead: "Diagrama de clases UML completo del sistema.",
        },
        h(Uml),
        h(
          "div",
          { className: "grid", style: { marginTop: 20 } },
          SOON.filter((item) => item[2] === "Fase III").map((item) =>
            h(
              "div",
              {
                className: "soon",
                key: item[1],
                style: { background: item[3] },
              },
              h("div", { className: "ico" }, item[0]),
              h("b", null, item[1]),
              h("small", null, "Pendiente"),
            ),
          ),
        ),
      ),
    ),
    h(
      "footer",
      null,
      "BarberShop Calamani · Publicación incremental · Entrega y defensa: 08-12-2026",
    ),
  );
}

global.BarberShopView = {BookingView, AppView};
})(window);
