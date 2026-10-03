export const ESTADOS = {
  PENDIENTE: "Pendiente de Confirmación",
  CONFIRMADA: "Confirmada",
  CANCELADA: "Cancelada por Inactividad",
};

export const SEGUNDOS_CONFIRMACION = 15;

export const ESPACIOS = [
  { id: 1, nombre: "Sala de Estudio A", tipo: "sala" },
  { id: 2, nombre: "Sala de Estudio B", tipo: "sala" },
  { id: 3, nombre: "Laboratorio de Sistemas", tipo: "laboratorio" },
  { id: 4, nombre: "Laboratorio de Redes", tipo: "laboratorio" },
  { id: 5, nombre: "Proyector Epson #1", tipo: "proyector" },
  { id: 6, nombre: "Proyector BenQ #2", tipo: "proyector" },
];

export const BLOQUES = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
];

export function crearReserva({ espacioId, bloque }) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    espacioId: Number(espacioId),
    bloque,
    estado: ESTADOS.PENDIENTE,
    restante: SEGUNDOS_CONFIRMACION,
  };
}

// Se ejecuta cada segundo: descuenta tiempo y cancela al llegar a 0.
export function avanzarTiempo(reservas) {
  return reservas.map((r) => {
    if (r.estado !== ESTADOS.PENDIENTE) return r;
    const restante = r.restante - 1;
    return restante <= 0
      ? { ...r, restante: 0, estado: ESTADOS.CANCELADA }
      : { ...r, restante };
  });
}

export function confirmarReserva(reservas, id) {
  return reservas.map((r) =>
    r.id === id && r.estado === ESTADOS.PENDIENTE
      ? { ...r, estado: ESTADOS.CONFIRMADA }
      : r
  );
}

const estaActiva = (r) => r.estado !== ESTADOS.CANCELADA;

export function hayConflicto(reservas, espacioId, bloque) {
  return reservas.some(
    (r) => r.espacioId === Number(espacioId) && r.bloque === bloque && estaActiva(r)
  );
}

// Estado visual del espacio: Ocupado > Pendiente > Disponible
export function estadoDeEspacio(reservas, espacioId) {
  const activas = reservas.filter((r) => r.espacioId === espacioId && estaActiva(r));
  if (activas.some((r) => r.estado === ESTADOS.CONFIRMADA)) return "ocupado";
  if (activas.some((r) => r.estado === ESTADOS.PENDIENTE)) return "pendiente";
  return "disponible";
}