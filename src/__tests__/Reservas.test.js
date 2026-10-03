import { render, screen } from "@testing-library/react";
import App from "../App";
import {
  crearReserva,
  avanzarTiempo,
  ESTADOS,
  SEGUNDOS_CONFIRMACION,
} from "../logic/reservas";

describe("Sistema de Reservas", () => {
  test("el componente principal se renderiza correctamente", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Sistema de Reservas/i })
    ).toBeInTheDocument();
  });

  test("una nueva reserva se inicializa en 'Pendiente de Confirmación'", () => {
    const reserva = crearReserva({ espacioId: 1, bloque: "08:00 - 10:00" });
    expect(reserva.estado).toBe(ESTADOS.PENDIENTE);
    expect(reserva.restante).toBe(SEGUNDOS_CONFIRMACION);
  });

  test("la reserva se cancela por inactividad al llegar el contador a cero", () => {
    let reservas = [crearReserva({ espacioId: 1, bloque: "08:00 - 10:00" })];
    for (let i = 0; i < SEGUNDOS_CONFIRMACION; i++) {
      reservas = avanzarTiempo(reservas);
    }
    expect(reservas[0].estado).toBe(ESTADOS.CANCELADA);
  });
});