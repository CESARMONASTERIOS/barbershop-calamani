(function (global) {
"use strict";

const TEAM = [
  "Apaza Choque Ronald",
  "Yanique Quispe Israel",
  "Ticona Monasterios César Diego",
  "Velasco Ramos Misael Albert",
];
const SERV = [
  ["✂️", "Corte moderno", 40, 40, "Fade, degradado y estilos actuales."],
  ["💈", "Corte clásico", 35, 35, "Tijera y navaja, estilo tradicional."],
  ["🧔", "Perfilado de barba", 25, 20, "Diseño y perfilado con navaja."],
  ["🪒", "Cejas y frente", 15, 15, "Perfilado de cejas y línea frontal."],
  ["🧖", "Limpieza facial", 50, 30, "Exfoliante y limpieza profunda."],
  ["🎨", "Color (tinte)", 120, 90, "Tintes y decoloración."],
  ["🌀", "Ondulación", 150, 100, "Rizos y ondas permanentes."],
  ["💬", "Asesoramiento", 20, 15, "Recomendación de estilo personalizada."],
];
const BARB = [
  [1, "Marco A.", "Alto Lima 1ª Sección", "Lun–Dom", 9, 21, ["Fade", "Clásico"]],
  [2, "Diego R.", "Alto Lima 1ª Sección", "Vie–Dom", 9, 21, ["Color", "Ondulación"]],
  [3, "Luis M.", "Alto Lima 1ª Sección", "Lun–Vie", 9, 15, ["Barba", "Cejas"]],
  [4, "Kevin T.", "Alto Lima 1ª Sección", "Lun–Sáb", 12, 21, ["Moderno", "Fade"]],
  [5, "Brayan C.", "Alto Lima 1ª Sección", "Sáb–Dom", 9, 21, ["Ondulación", "Color"]],
  [6, "Jhon P.", "Alto Lima 1ª Sección", "Lun–Vie", 9, 21, ["Facial", "Clásico"]],
];
const SUC = [
  [
    "Alto Lima 1ª Sección",
    "Zona Alto Lima 1ª Sección, cerca de la Plaza Ballivián, ciudad de El Alto, La Paz",
  ],
];
const PHASE1 = [
  [
    "Introducción",
    "Plataforma web que reemplaza WhatsApp, papel y hojas de cálculo en la sucursal de BarberShop Calamani (Alto Lima 1ª Sección, El Alto), con barberos formados en la academia de su fundador, Víctor Manolo Calle Sánchez.",
  ],
  [
    "Antecedentes",
    "Citas e inventarios se gestionaban con herramientas genéricas, y la empresa suma capacitaciones y seminarios con marcas como OLEUNBEATY que el software comercial estándar no cubre.",
  ],
  [
    "Planteamiento del problema",
    [
      "Finanzas: comisiones manuales (35%, 40% y 50%) con errores.",
      "Operación: sin citas previas hay tiempos muertos.",
      "Activos: sin alertas de stock ni caducidad.",
    ],
  ],
  [
    "Formulación del problema",
    "¿De qué manera un sistema de información web centralizado optimizará la gestión administrativa, operativa y financiera de las sucursales de “BarberShop Calamani”?",
  ],
  [
    "Objetivo general",
    "Desarrollar un sistema web que centralice y automatice la gestión operativa, el inventario y las finanzas, reduciendo errores humanos y optimizando la capacidad instalada.",
  ],
  [
    "Objetivos específicos",
    [
      "Levantar requerimientos funcionales y no funcionales.",
      "Módulo de citas automatizado.",
      "Inventario con alertas de stock y caducidad.",
      "Motor de comisiones automático.",
      "Pruebas de calidad y usabilidad.",
    ],
  ],
  [
    "Método e instrumentos",
    [
      "Descriptivo: observación y entrevista.",
      "Analítico: definición de módulos.",
      "Bibliográfico y documental.",
      "Entrevista estructurada de 10 áreas.",
    ],
  ],
  [
    "Justificación",
    [
      "Técnica: plataforma integrada y robusta.",
      "Económica: sin errores de liquidación ni productos vencidos.",
      "Operativa: menos tiempos muertos.",
    ],
  ],
  [
    "Alcances y límites",
    [
      "Citas en tiempo real, inventario, finanzas y capacitaciones.",
      "Solo la sucursal Alto Lima 1ª Sección (otra próximamente).",
      "Sin facturación electrónica en esta fase.",
    ],
  ],
];
const DD = `USUARIO|idUsuario:INT:PK,nombreUsuario:VARCHAR,password:VARCHAR,correoElectronico:VARCHAR
EMPLEADO|idEmpleado:INT:PK,idUsuario:INT:FK,nombre:VARCHAR,ci:VARCHAR,teléfono:VARCHAR,dirección:VARCHAR,fechaNacimiento:DATE,foto:VARCHAR,horario:VARCHAR,estado:VARCHAR,rol:VARCHAR
BARBERO|idBarbero:INT:PK,idEmpleado:INT:FK,especialidad:VARCHAR,comisionBase:DECIMAL,idSucursal:INT:FK
CLIENTE|idCliente:INT:PK,idUsuario:INT:FK,nombre:VARCHAR,teléfono:VARCHAR,ci:VARCHAR,fechaNacimiento:DATE,oficio:VARCHAR,puntosGanados:INT
SERVICIO|idServicio:INT:PK,nombre:VARCHAR,descripción:TEXT,precio:DECIMAL,duracionAproximada:INT,comisionBarbero:DECIMAL
ATENCION_SERVICIO|idAtencion:INT:PK/FK,idServicio:INT:PK/FK,comisionBarbero:DECIMAL
CITA_RESERVA|idReserva:INT:PK,idCliente:INT:FK,idBarbero:INT:FK,fecha:DATE,hora:TIME,estado:VARCHAR,detalles:TEXT,montoTotalAdelantado:DECIMAL
CITA_RESERVA_SERVICIO|idCita:INT:PK/FK,idServicio:INT:PK/FK,montoAdelanto:DECIMAL
ATENCION|idAtencion:INT:PK,idCita:INT:FK,idBarbero:INT:FK,fecha:DATE,hora:TIME,montoTotal:DECIMAL,valoración:INT,idCliente:INT:FK
ADELANTO|idAdelanto:INT:PK,idCita:INT:FK,monto:DECIMAL,fechaPago:DATE,estadoPago:VARCHAR,referenciaQR:VARCHAR
SUCURSAL|idSucursal:INT:PK,ubicación:VARCHAR,telefono:VARCHAR,horarioApertura:TIME,horarioCierre:TIME,idEmpleado:INT:FK
ASISTENCIA|idAsistencia:INT:PK,idEmpleado:INT:FK,fecha:DATE,horaEntrada:TIME,horaSalida:TIME
CAPACITACION|idCapacitacion:INT:PK,fecha:DATE,hora:TIME,tematica:VARCHAR,lugar:VARCHAR,tipo:VARCHAR,instructorProfesor:VARCHAR
EMPLEADO_CAPACITACION|idEmpleado:INT:PK/FK,idCapacitacion:INT:PK/FK
PRODUCTO|idProducto:INT:PK,nombre:VARCHAR,descripción:TEXT,precioUnitarioVenta:DECIMAL,imagen:VARCHAR
INVENTARIO|idInventario:INT:PK,idProducto:INT:FK,idSucursal:INT:FK,stockActual:INT,stockMinimo:INT
MARCA_PROVEEDOR|idProveedor:INT:PK,razonSocial:VARCHAR,telefono:VARCHAR,gmail:VARCHAR
PRODUCTO_PROVEEDOR|idProducto:INT:PK/FK,idProveedor:INT:PK/FK,precioUnitario:DECIMAL
OFERTA|idOferta:INT:PK,nombre:VARCHAR,descripción:TEXT,fechaIni:DATE,fechaFin:DATE,idEmpleado:INT:FK,idAtencion:INT:FK
COMBO|idCombo:INT:PK,idOferta:INT:FK,precioCombo:DECIMAL
COMBO_SERVICIO|idCombo:INT:PK/FK,idServicio:INT:PK/FK
PROMOCION|idPromocion:INT:PK,idOferta:INT:FK,porcentajeDescuento:DECIMAL`
  .split("\n")
  .map((line) => {
    const [name, fields] = line.split("|");
    return {
      n: name,
      f: fields.split(",").map((field) => field.split(":")),
    };
  });
const SOON = [
  ["🌳", "Árbol de problemas", "Fase I", "#b45309"],
  ["📅", "Planificación (Gantt)", "Fase I", "#0f766e"],
  ["📋", "Especificación de procesos", "Fase II", "#7c3aed"],
  ["👥", "Requerimientos y actores", "Fase III", "#be123c"],
  ["🎯", "Casos de uso", "Fase III", "#c2410c"],
  ["🔁", "Diagrama de secuencia", "Fase III", "#0e7490"],
  ["🗄️", "Modelo entidad-relación", "Fase III", "#15803d"],
  ["📱", "Diseño de interfaz", "Fase III", "#a21caf"],
  ["🎤", "Anexo: entrevista", "Fase III", "#475569"],
];
const CLS = [
  [
    "Asistencia",
    0,
    0,
    "#475569",
    ["idAsistencia", "fecha", "horaEntrada", "horaSalida"],
    ["registrarEntrada()", "registrarSalida()"],
  ],
  [
    "Capacitacion",
    1,
    0,
    "#0e7490",
    ["idCapacitacion", "fecha", "tematica", "lugar"],
    ["programar()", "registrarAsistentes()"],
  ],
  [
    "Oferta",
    3,
    0,
    "#be123c",
    ["idOferta", "nombre", "fechaIni", "fechaFin"],
    ["crear()", "vigente()"],
  ],
  ["Promocion", 4, 0, "#c2410c", ["idPromocion", "porcentajeDescuento"], ["aplicar()"]],
  [
    "Empleado",
    1,
    1,
    "#b8801f",
    ["idEmpleado", "nombre", "ci", "horario", "rol"],
    ["registrar()", "cambiarEstado()"],
  ],
  [
    "Usuario",
    2,
    1,
    "#6d28d9",
    ["idUsuario", "nombreUsuario", "password", "correo"],
    ["iniciarSesion()", "cerrarSesion()"],
  ],
  [
    "Cliente",
    3,
    1,
    "#1d4ed8",
    ["idCliente", "nombre", "ci", "telefono", "puntosGanados"],
    ["registrar()", "acumularPuntos()"],
  ],
  ["Combo", 4, 1, "#a21caf", ["idCombo", "precioCombo"], ["calcularPrecio()"]],
  [
    "Sucursal",
    0,
    2,
    "#15803d",
    ["idSucursal", "ubicacion", "horarioApertura", "horarioCierre"],
    ["consultarAgenda()"],
  ],
  [
    "Barbero",
    1,
    2,
    "#d97706",
    ["idBarbero", "especialidad", "comisionBase"],
    ["calcularComision()", "verAgenda()"],
  ],
  [
    "Reserva",
    3,
    2,
    "#d62839",
    ["idReserva", "fecha", "hora", "estado", "montoAdelantado"],
    ["agendar()", "cancelar()", "confirmar()"],
  ],
  [
    "Servicio",
    4,
    2,
    "#0f766e",
    ["idServicio", "nombre", "precio", "duracion"],
    ["calcularPrecio()"],
  ],
  [
    "Inventario",
    0,
    3,
    "#4d7c0f",
    ["idInventario", "stockActual", "stockMinimo"],
    ["alertarStock()", "actualizar()"],
  ],
  ["Producto", 1, 3, "#047857", ["idProducto", "nombre", "precioVenta"], ["registrar()"]],
  [
    "Proveedor",
    2,
    3,
    "#92400e",
    ["idProveedor", "razonSocial", "telefono", "gmail"],
    ["solicitarReposicion()"],
  ],
  [
    "Adelanto",
    3,
    3,
    "#be185d",
    ["idAdelanto", "monto", "fechaPago", "estadoPago", "referenciaQR"],
    ["registrarPago()"],
  ],
  [
    "Atencion",
    4,
    3,
    "#1e40af",
    ["idAtencion", "fecha", "montoTotal", "valoracion"],
    ["registrar()", "cobrar()"],
  ],
];
const REL = [
  [4, 0, "1", "*", ""],
  [4, 1, "*", "*", "asiste"],
  [5, 4, "1", "0..1", ""],
  [5, 6, "1", "0..1", ""],
  [9, 4, "", "", "g"],
  [9, 8, "*", "1", "trabaja en"],
  [9, 10, "1", "*", ""],
  [6, 10, "1", "*", ""],
  [10, 11, "*", "*", "contiene"],
  [10, 15, "1", "*", ""],
  [10, 16, "1", "0..1", ""],
  [16, 11, "*", "*", "realiza"],
  [2, 4, "*", "1", "gestiona"],
  [2, 7, "1", "*", ""],
  [2, 3, "1", "*", ""],
  [7, 11, "*", "*", "contiene"],
  [8, 12, "1", "*", ""],
  [13, 12, "1", "*", ""],
  [13, 14, "*", "*", "provee"],
];
const UW = 150;
const UH = (clase) => 24 + clase[4].length * 14 + 6 + clase[5].length * 14 + 6;

function clip(cx, cy, width, height, dx, dy, ellipse) {
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const distance = ellipse
    ? 1 / Math.hypot(ux / width, uy / height)
    : Math.min(
        width / (Math.abs(ux) || 1e-9),
        height / (Math.abs(uy) || 1e-9),
      );

  return [cx + ux * distance, cy + uy * distance, ux, uy];
}

const DFD={
 amb:{t:"Modelo ambiental",h:540,d:"Modelo ambiental (diagrama de contexto): el sistema como un único proceso rodeado de sus entidades externas. WhatsApp Business (+591 76243108) es el canal de confirmación con el cliente.",
  n:[["e","Cliente",90,100],["e","Barbero",90,420],["e","Administrador",830,100],["e","Proveedor / Marca",830,420],["e","WhatsApp Business",460,490],["p","BarberShop Calamani",460,260,"0"]],
  f:[[0,5,"Solicitud de cita y datos",22],[5,0,"Comprobante de cita",22],[1,5,"Asistencia, servicios hechos",22],[5,1,"Agenda y comisiones",22],
     [2,5,"Altas, ofertas, personal",22],[5,2,"Reportes y alertas",22],[3,5,"Productos y seminarios",22],[5,3,"Pedidos de reposición",22],
     [5,4,"Solicitud de confirmación",22],[4,5,"Respuesta SÍ / NO",22]]},
 n0:{t:"Nivel 0",h:560,d:"Comportamiento · Nivel 0: los cinco procesos principales con sus almacenes de datos y entidades externas.",
  n:[["e","Cliente",70,110],["e","Barbero",70,400],["e","Administrador",850,230],["e","Proveedor",850,450],
     ["p","Gestionar citas",260,110,"1"],["p","Registrar atención y cobro",260,260,"2"],["p","Administrar personal",260,430,"4"],
     ["s","D1 Citas",470,110],["s","D2 Atenciones",470,260],["s","D4 Empleados",470,430],
     ["p","Generar reportes",670,260,"5"],["p","Controlar inventario",670,400,"3"],["s","D3 Inventario",670,520],["e","WhatsApp Business",640,30]],
  f:[[0,4,"Solicitud y datos",20],[4,0,"Comprobante de cita",20],[0,5,"Pago de adelanto",0],[1,5,"Servicios realizados",20],[5,1,"Comisión semanal",20],
     [4,7,"Cita",0],[7,5,"Cita a atender",0],[5,8,"Atención",0],[8,10,"Ingresos y servicios",0],[10,2,"Reportes",0],
     [1,6,"Asistencia",0],[6,9,"Registro",0],[2,11,"Stock mínimo",0],[11,12,"Movimientos",0],[11,3,"Pedido",20],[3,11,"Productos",20],
     [4,13,"Solicitud de confirmación",20],[13,4,"Respuesta SÍ / NO",20]]},
 n1:{t:"Nivel 1",h:520,d:"Nivel 1: explosión del proceso 1 «Gestionar citas» (1.1 a 1.5), con la confirmación de asistencia por WhatsApp.",
  n:[["e","Cliente",70,260],["e","WhatsApp Business",850,90],["p","Consultar disponibilidad",290,90,"1.1"],["p","Registrar reserva",290,260,"1.2"],
     ["p","Gestionar adelanto",290,430,"1.3"],["p","Notificar por WhatsApp",730,260,"1.4"],["s","D7 Agenda",560,90],["s","D5 Clientes",560,175],
     ["s","D1 Citas",560,260],["s","D6 Adelantos",560,430],["p","Registrar confirmación",840,430,"1.5"]],
  f:[[0,2,"Fecha y servicio",22],[2,0,"Horarios libres",22],[6,2,"Horarios ocupados",0],[2,3,"Horario elegido",0],[0,3,"Datos personales",0],
     [3,7,"Cliente",0],[3,8,"Cita pendiente",0],[0,4,"Pago QR / efectivo",0],[4,9,"Adelanto",0],[4,5,"Pago confirmado",0],
     [8,5,"Datos de la cita",0],[7,5,"Teléfono",0],[5,1,"Mensaje: cita agendada",0],[1,10,"Respuesta SÍ / NO",0],[10,8,"Estado de la cita",0]]},
 n2:{t:"Nivel 2",h:440,d:"Nivel 2: explosión del proceso 1.2 «Registrar reserva» (validar datos, verificar disponibilidad y guardar).",
  n:[["e","Cliente",70,220],["p","Validar datos",270,220,"1.2.1"],["p","Verificar disponibilidad",500,220,"1.2.2"],["p","Guardar reserva",720,220,"1.2.3"],
     ["s","D7 Agenda",500,70],["s","D5 Clientes",840,90],["s","D1 Citas",840,360]],
  f:[[0,1,"Datos y horario",22],[1,0,"Errores de validación",22],[1,2,"Datos válidos",0],[4,2,"Horarios ocupados",0],[2,3,"Horario libre",0],
     [3,5,"Cliente",0],[3,6,"Cita pendiente",0],[3,4,"Horario bloqueado",0]]},
 n3:{t:"Nivel 3",h:460,d:"Nivel 3: explosión del proceso 1.2.2 «Verificar disponibilidad» (día y turno, cruces con otras citas, bloqueos).",
  n:[["e","Proceso 1.2.1",70,230],["p","Verificar día y turno",260,230,"1.2.2.1"],["p","Comparar con citas",480,230,"1.2.2.2"],["p","Verificar bloqueos",690,230,"1.2.2.3"],
     ["s","D4 Empleados",260,80],["s","D1 Citas",480,380],["s","D7 Agenda",690,80],["e","Proceso 1.2.3",856,230]],
  f:[[0,1,"Datos válidos",22],[1,0,"Barbero no atiende",22],[4,1,"Horario del barbero",0],[1,2,"Barbero disponible",0],[5,2,"Citas del barbero",0],
     [2,3,"Horarios sin cruces",0],[6,3,"Descansos, capacitaciones",0],[3,7,"Horario libre",0]]}};
function wrap(text) {
  const words = text.split(" ");
  if (words.length < 2) return [text];

  let splitIndex = 1;
  let smallestDifference = Infinity;

  for (let index = 1; index < words.length; index++) {
    const difference = Math.abs(
      words.slice(0, index).join(" ").length -
        words.slice(index).join(" ").length,
    );
    if (difference < smallestDifference) {
      smallestDifference = difference;
      splitIndex = index;
    }
  }

  return [
    words.slice(0, splitIndex).join(" "),
    words.slice(splitIndex).join(" "),
  ];
}

const API = "";
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
const NEG = "59176243108";

const ymd = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const trabaja = (dias, fecha) => {
  const dayIndex = (new Date(`${fecha}T12:00:00`).getDay() + 6) % 7;
  const [startDay, endDay] = dias
    .split("–")
    .map((day) => DIAS.indexOf(day));

  return startDay <= endDay
    ? dayIndex >= startDay && dayIndex <= endDay
    : dayIndex >= startDay || dayIndex <= endDay;
};

const wa = (number, text) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
const hh = (time) => `${String(time).padStart(2, "0")}:00`;
const bn = (id) => BARB.find((barber) => String(barber[0]) === String(id))[1];
const msgNeg = (cita) =>
  `Hola ${cita.nombre}, su cita fue agendada ✅ en BarberShop Calamani 💈: ${cita.fecha} a las ${hh(cita.hora)} con ${bn(cita.barb)} (código ${cita.id}). Dirección: Alto Lima 1ª Sección, cerca de la Plaza Ballivián, El Alto. Responda SÍ para confirmar su asistencia o NO para cancelar.`;

function validar(form, citas, barbero) {
  const errors = {};
  const today = new Date();
  const todayString = ymd(today);
  const maximumDate = ymd(new Date(today.getTime() + 60 * 864e5));
  const fullName = form.nombre.trim().replace(/\s+/g, " ");

  if (
    !/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ.' ]{3,60}$/.test(fullName) ||
    fullName.split(" ").length < 2
  ) {
    errors.nombre = "Escribe nombre y apellido (solo letras).";
  }

  if (!/^\d{6,9}$/.test(form.ci)) {
    errors.ci = "El CI debe tener entre 6 y 9 números.";
  }

  if (!/^[67]\d{7}$/.test(form.tel)) {
    errors.tel = "Celular boliviano: 8 dígitos que empiecen con 6 o 7.";
  }

  if (!form.barb) {
    errors.barb = "Elige un barbero.";
  }

  if (!form.fecha || form.fecha < todayString) {
    errors.fecha = "Elige hoy o una fecha futura.";
  } else if (form.fecha > maximumDate) {
    errors.fecha = "Solo se reserva hasta con 60 días de anticipación.";
  } else if (barbero && !trabaja(barbero[3], form.fecha)) {
    errors.fecha = `${barbero[1]} no atiende ese día (${barbero[3]}).`;
  }

  if (barbero && form.hora === "") {
    errors.hora = "Elige un horario.";
  } else if (
    barbero &&
    form.fecha === todayString &&
    form.hora <= today.getHours()
  ) {
    errors.hora = "Ese horario ya pasó.";
  }

  const activeAppointments = citas.filter(
    (cita) =>
      cita.ci === form.ci &&
      cita.estado !== "cancelada" &&
      cita.fecha >= todayString,
  );

  if (
    !errors.hora &&
    activeAppointments.some(
      (cita) => cita.fecha === form.fecha && cita.hora === form.hora,
    )
  ) {
    errors.hora = "Ya tienes una cita en ese horario.";
  } else if (!errors.ci && activeAppointments.length >= 3) {
    errors.ci = "Máximo 3 citas activas por CI.";
  }

  return errors;
}

function loadCitas() {
  try {
    return JSON.parse(localStorage.getItem("rc_citas") || "[]");
  } catch (error) {
    console.error("No se pudieron cargar las citas guardadas.", error);
    return [];
  }
}

function saveCitas(citas) {
  try {
    localStorage.setItem("rc_citas", JSON.stringify(citas));
  } catch (error) {
    console.error("No se pudieron guardar las citas en este navegador.", error);
  }
}

global.BarberShopModel = {
  TEAM, SERV, BARB, SUC, PHASE1, DD, SOON, CLS, REL, UW, UH,
  DFD, API, DIAS, NEG, ymd, trabaja, wa, hh, bn, msgNeg, validar,
  clip, wrap, loadCitas, saveCitas
};
})(window);
