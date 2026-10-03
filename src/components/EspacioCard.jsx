import { Monitor, Projector, DoorOpen } from "lucide-react";

const ICONOS = { sala: DoorOpen, laboratorio: Monitor, proyector: Projector };

const ESTILOS = {
  disponible: { texto: "Disponible", clase: "border-green-300 bg-green-50", badge: "bg-green-500" },
  ocupado: { texto: "Ocupado", clase: "border-red-300 bg-red-50", badge: "bg-red-500" },
  pendiente: { texto: "Pendiente de confirmación", clase: "border-yellow-300 bg-yellow-50", badge: "bg-yellow-500" },
};

export default function EspacioCard({ espacio, estado }) {
  const Icono = ICONOS[espacio.tipo];
  const s = ESTILOS[estado];
  return (
    <div className={`rounded-2xl border-2 p-5 shadow-sm transition hover:shadow-md ${s.clase}`}>
      <div className="mb-3 flex items-center justify-between">
        <Icono className="text-slate-600" size={28} />
        <span className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white ${s.badge}`}>
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          {s.texto}
        </span>
      </div>
      <h3 className="font-semibold">{espacio.nombre}</h3>
      <p className="text-sm capitalize text-slate-500">{espacio.tipo}</p>
    </div>
  );
}