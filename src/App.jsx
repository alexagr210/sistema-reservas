import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import EspacioCard from "./components/EspacioCard";
import ReservaForm from "./components/ReservaForm";
import MonitorReservas from "./components/MonitorReservas";
import {
  ESPACIOS,
  avanzarTiempo,
  confirmarReserva,
  crearReserva,
  estadoDeEspacio,
  hayConflicto,
} from "./logic/reservas";

export default function App() {
  const [reservas, setReservas] = useState([]);

  // Temporizador global: un tick por segundo
  useEffect(() => {
    const timer = setInterval(() => setReservas((prev) => avanzarTiempo(prev)), 1000);
    return () => clearInterval(timer);
  }, []);

  const reservar = (datos) => {
    if (hayConflicto(reservas, datos.espacioId, datos.bloque)) return false;
    setReservas((prev) => [crearReserva(datos), ...prev]);
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-8 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <CalendarCheck size={36} />
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">Sistema de Reservas</h1>
            <p className="text-sm text-indigo-100">
              Confirma tu asistencia o la reserva se cancelará automáticamente.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-semibold">Espacios y equipos</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {ESPACIOS.map((e) => (
              <EspacioCard key={e.id} espacio={e} estado={estadoDeEspacio(reservas, e.id)} />
            ))}
          </div>
        </section>

        <aside className="space-y-8">
          <ReservaForm onReservar={reservar} />
        </aside>

        <section className="lg:col-span-3">
          <MonitorReservas
            reservas={reservas}
            onConfirmar={(id) => setReservas((prev) => confirmarReserva(prev, id))}
          />
        </section>
      </main>
    </div>
  );
}