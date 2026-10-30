(function (global) {
  "use strict";

  const React = global.React;
  const h = React.createElement;
  const M = global.BarberShopModel;
  const { BookingView, AppView } = global.BarberShopView;

  function BookingController() {
    const hoy = M.ymd(new Date());
    const [form, setForm] = React.useState({
      nombre: "",
      ci: "",
      tel: "",
      suc: M.SUC[0][0],
      barb: "",
      serv: "Corte moderno",
      fecha: hoy,
      hora: "",
    });
    const [citas, setCitas] = React.useState(M.loadCitas);
    const [mensaje, setMensaje] = React.useState(null);
    const [errores, setErrores] = React.useState({});

    const guardarCitas = (nuevasCitas) => {
      setCitas(nuevasCitas);
      M.saveCitas(nuevasCitas);
    };

    const cambiarEstadoCita = (id, estado) => {
      guardarCitas(
        citas.map((cita) =>
          cita.id === id ? { ...cita, estado } : cita,
        ),
      );
    };

    const cambiarCampo = (campo, valor) => {
      setErrores((actuales) => ({ ...actuales, [campo]: undefined }));
      setForm((actual) => ({
        ...actual,
        [campo]: valor,
        ...(campo === "suc" ? { barb: "", hora: "" } : {}),
        ...(["barb", "fecha", "serv"].includes(campo) ? { hora: "" } : {}),
      }));
    };

    const barberosSucursal = M.BARB.filter(
      (barbero) => barbero[2] === form.suc,
    );
    const barberoSeleccionado = M.BARB.find(
      (barbero) => String(barbero[0]) === form.barb,
    );
    const servicioSeleccionado = M.SERV.find(
      (servicio) => servicio[1] === form.serv,
    );
    const duracionHoras = Math.ceil(servicioSeleccionado[3] / 60);
    const barberoTrabaja =
      barberoSeleccionado &&
      form.fecha &&
      M.trabaja(barberoSeleccionado[3], form.fecha);
    const horaActual = new Date().getHours();
    const horarios = [];

    if (barberoSeleccionado && barberoTrabaja) {
      for (
        let hora = barberoSeleccionado[4];
        hora + duracionHoras <= barberoSeleccionado[5];
        hora++
      ) {
        horarios.push(hora);
      }
    }

    const horarioOcupado = (hora) =>
      citas.some(
        (cita) =>
          cita.barb === form.barb &&
          cita.fecha === form.fecha &&
          cita.estado !== "cancelada" &&
          hora < cita.hora + Math.ceil(cita.dur / 60) &&
          cita.hora < hora + duracionHoras,
      ) || (form.fecha === hoy && hora <= horaActual);

    const enviarReserva = async (event) => {
      event.preventDefault();
      setMensaje(null);

      const nuevosErrores = M.validar(
        form,
        citas,
        barberoSeleccionado,
      );
      setErrores(nuevosErrores);

      if (Object.keys(nuevosErrores).length > 0) {
        return;
      }

      const cita = {
        ...form,
        nombre: form.nombre.trim().replace(/\s+/g, " "),
        id: `BC-${Math.floor(1000 + Math.random() * 9000)}`,
        estado: "pendiente",
        dur: servicioSeleccionado[3],
        wa: "pendiente",
      };

      if (M.API) {
        try {
          const response = await fetch(`${M.API}/api/reservas`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...cita,
              barbero: M.bn(cita.barb),
            }),
          });
          cita.wa = response.ok ? "enviado" : "error";
        } catch (error) {
          console.error("No se pudo enviar la reserva al servidor.", error);
          cita.wa = "error";
        }
      }

      guardarCitas([...citas, cita]);
      setMensaje(cita);
      setForm((actual) => ({ ...actual, hora: "" }));
    };

    return h(BookingView, {
      f: form,
      set: cambiarCampo,
      er: errores,
      hoy,
      bs: barberosSucursal,
      b: barberoSeleccionado,
      s: servicioSeleccionado,
      trab: barberoTrabaja,
      slots: horarios,
      bad: horarioOcupado,
      msg: mensaje,
      enviar: enviarReserva,
      citas,
      cambiar: cambiarEstadoCita,
    });
  }

  function start() {
    const root = document.getElementById("root");

    if (!root) {
      throw new Error(
        "No se encontró el elemento #root para montar la aplicación.",
      );
    }

    global.ReactDOM.createRoot(root).render(
      h(AppView, { BookingController }),
    );
  }

  start();
})(window);
