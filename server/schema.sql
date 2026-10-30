CREATE TABLE cliente (
  id_cliente SERIAL PRIMARY KEY,
  nombre     VARCHAR(100) NOT NULL,
  ci         VARCHAR(9)   NOT NULL UNIQUE,
  telefono   CHAR(8)      NOT NULL
);
CREATE TABLE cita_reserva (
  id_reserva SERIAL PRIMARY KEY,
  codigo     VARCHAR(10) NOT NULL UNIQUE,
  id_cliente INT NOT NULL REFERENCES cliente(id_cliente),
  id_barbero INT NOT NULL,
  servicio   VARCHAR(100) NOT NULL,
  fecha      DATE NOT NULL,
  hora       TIME NOT NULL,
  estado     VARCHAR(30) NOT NULL DEFAULT 'pendiente'
);
CREATE TABLE notificacion_whatsapp (
  id        SERIAL PRIMARY KEY,
  codigo    VARCHAR(10) NOT NULL REFERENCES cita_reserva(codigo),
  estado    VARCHAR(20) NOT NULL,           -- enviado | error
  enviado_en TIMESTAMP NOT NULL DEFAULT now()
);
