import { useRef, useState } from "preact/hooks";

const resenas = [
  {
    nombre: "María González",
    ocupacion: "Paciente",
    texto:
      "Excelente atención desde el primer momento. El optometrista fue muy detallado en el examen y me ayudó a encontrar los lentes perfectos para mi graduación. Totalmente recomendado.",
    estrellas: 5,
  },
  {
    nombre: "Carlos Ramírez",
    ocupacion: "Paciente",
    texto:
      "Llevaba meses buscando una óptica de confianza y por fin la encontré. Los precios son muy accesibles y la calidad de los armazones es excelente. Ya pedí mis lentes de sol también.",
    estrellas: 5,
  },
  {
    nombre: "Ana Martínez",
    ocupacion: "Paciente",
    texto:
      "Me atendieron con mucha paciencia al elegir mi armazón. Los lentes progresivos que me recomendaron son perfectos para el trabajo frente a la computadora. Muy satisfecha.",
    estrellas: 5,
  },
  {
    nombre: "Roberto Hernández",
    ocupacion: "Paciente",
    texto:
      "Fui sin cita y me atendieron muy bien. El examen fue completo y detallado, y los lentes quedaron listos antes de lo esperado. Sin duda regresaré.",
    estrellas: 5,
  },
  {
    nombre: "Sofía López",
    ocupacion: "Paciente",
    texto:
      "Gran variedad de modelos y marcas para todos los gustos. El personal es amable y te orienta muy bien para encontrar el armazón que más te favorece. Volveré sin duda.",
    estrellas: 5,
  },
  {
    nombre: "Jorge Pérez",
    ocupacion: "Paciente",
    texto:
      "Soy cliente desde hace varios años y siempre recibo el mismo trato amable y profesional. Sin duda el mejor lugar para cuidar la vista en la zona.",
    estrellas: 5,
  },
  {
    nombre: "Laura Sánchez",
    ocupacion: "Paciente",
    texto:
      "El examen de vista fue muy completo y me explicaron todo con detalle. Los lentes antirreflejantes que compré son de muy buena calidad. Ampliamente recomendada.",
    estrellas: 5,
  },
  {
    nombre: "Miguel Torres",
    ocupacion: "Paciente",
    texto:
      "Gran surtido de armazones para todos los presupuestos. Me ayudaron a elegir el estilo que mejor va con mi tipo de rostro. Excelente servicio y precio justo.",
    estrellas: 5,
  },
];

export default function ReviewsCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const getClosestIndex = () => {
    const el = containerRef.current;
    if (!el || el.children.length === 0) return 0;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((card, i) => {
      const dist = Math.abs((card as HTMLElement).offsetLeft - el.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    return closest;
  };

  const handleScroll = () => setCurrent(getClosestIndex());

  const scrollToCard = (index: number) => {
    const el = containerRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement | undefined;
    if (!card) return;
    el.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
  };

  const onMouseDown = (e: MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
    };
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!drag.current.active) return;
    e.preventDefault();
    const el = containerRef.current!;
    const x = e.pageX - el.offsetLeft;
    el.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.5;
  };

  const stopDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    scrollToCard(getClosestIndex());
  };

  return (
    <div class="relative">
      {/* Track */}
      <div
        ref={containerRef}
        role="region"
        aria-label="Reseñas de pacientes"
        class="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 select-none cursor-grab active:cursor-grabbing"
        onScroll={handleScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
      >
        {resenas.map((r, i) => (
          <article
            key={i}
            class="snap-start shrink-0 w-[85%] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-white/8"
          >
            <div>
              {/* Estrellas */}
              <div class="mb-6 flex gap-1" aria-label={`${r.estrellas} de 5 estrellas`}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg
                    key={j}
                    class={`h-5 w-5 fill-current ${j < r.estrellas ? "text-amber-400" : "text-white/20"}`}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Comilla decorativa */}
              <svg
                class="text-accent/30 mb-4 h-8 w-8"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

              <p class="leading-relaxed text-slate-300 italic">"{r.texto}"</p>
            </div>

            {/* Autor */}
            <div class="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
              <div class="bg-accent/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="text-accent h-5 w-5"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm font-bold text-white">{r.nombre}</p>
                <p class="text-xs text-slate-400">{r.ocupacion}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Navegación */}
      <div class="mt-8 flex items-center justify-center gap-6">
        <button
          onClick={() => scrollToCard(current - 1)}
          disabled={current === 0}
          aria-label="Reseña anterior"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-200 hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dots */}
        <div class="flex gap-2">
          {resenas.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Ir a reseña ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              class={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-accent"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollToCard(current + 1)}
          disabled={current === resenas.length - 1}
          aria-label="Siguiente reseña"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all duration-200 hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
        >
          <svg
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
