import { useState } from "react";
import { ESPACIOS, BLOQUES } from "../logic/reservas";

export default function ReservaForm({ onReservar }) {
  const [espacioId, setEspacioId] = useState(ESPACIOS[0].id);
  const [bloque, setBloque] = useState(BLOQUES[0]);
  const [error, setError] = useState("");

  const enviar = () => {
    const ok = onReservar({ espacioId, bloque });
    setError(ok ? "" : "Ese espacio ya está reservado en ese bloque.");
  };

  const campo = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:border-indigo-500 focus:outline-none";

  return (
    <div className="rounded-2xl bg-white p-5 shadow">
      <h2 className="mb-4 text-xl font-semibold">Reserva rápida</h2>
      <label className="mb-1 block text-sm font-medium" htmlFor="espacio">Espacio o equipo</label>
      <select id="espacio" className={`${campo} mb-3`} value={espacioId} onChange={(e) => setEspacioId(e.target.value)}>
        {ESPACIOS.map((e) => (
          <option key={e.id} value={e.id}>{e.nombre}</option>
        ))}
      </select>
      <label className="mb-1 block text-sm font-medium" htmlFor="bloque">Bloque de tiempo</label>
      <select id="bloque" className={`${campo} mb-4`} value={bloque} onChange={(e) => setBloque(e.target.value)}>
        {BLOQUES.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>
      {error && <p className="mb-3 text-sm text-red-600">{error}</p>}
      <button
        onClick={enviar}
        className="w-full rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700"
      >
        Generar reserva
      </button>
    </div>
  );
}