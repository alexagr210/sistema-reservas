import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { ESPACIOS, ESTADOS, SEGUNDOS_CONFIRMACION } from "../logic/reservas";

const nombreDe = (id) => ESPACIOS.find((e) => e.id === id)?.nombre;

export default function MonitorReservas({ reservas, onConfirmar }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Monitoreo en tiempo real</h2>
      {reservas.length === 0 && (
        <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">
          Aún no hay reservas. Crea una desde el formulario.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reservas.map((r) => {
          const pendiente = r.estado === ESTADOS.PENDIENTE;
          const confirmada = r.estado === ESTADOS.CONFIRMADA;
          const color = pendiente
            ? "border-yellow-300 bg-yellow-50"
            : confirmada
            ? "border-red-300 bg-red-50"
            : "border-slate-200 bg-slate-100 opacity-70";
          return (
            <div key={r.id} className={`rounded-2xl border-2 p-4 ${color}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{nombreDe(r.espacioId)}</h3>
                  <p className="text-sm text-slate-500">{r.bloque}</p>
                </div>
                {pendiente && <Clock className="text-yellow-600" />}
                {confirmada && <CheckCircle2 className="text-red-600" />}
                {!pendiente && !confirmada && <XCircle className="text-slate-500" />}
              </div>
              <p className="mt-2 text-sm font-medium">{r.estado}</p>
              {pendiente && (
                <>
                  <div className="my-3 h-2 overflow-hidden rounded-full bg-yellow-200">
                    <div
                      className="h-full bg-yellow-500 transition-all duration-1000 ease-linear"
                      style={{ width: `${(r.restante / SEGUNDOS_CONFIRMACION) * 100}%` }}
                    />
                  </div>
                  <p className="mb-3 text-center text-2xl font-bold tabular-nums text-yellow-700">
                    {r.restante}s
                  </p>
                  <button
                    onClick={() => onConfirmar(r.id)}
                    className="w-full rounded-lg bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Confirmar Asistencia
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}