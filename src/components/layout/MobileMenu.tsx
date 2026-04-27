import { useState } from "preact/hooks";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#mision", label: "Misión" },
  { href: "#sucursales", label: "Sucursales" },
  { href: "#contacto", label: "Contacto" },
];

const whatsappUrl =
  "https://wa.me/529511398701?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20cita";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 text-primary rounded-lg hover:bg-slate-100 transition-colors"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-lg py-4 px-6 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-700 hover:text-primary font-medium py-3 border-b border-slate-50 transition-colors"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 bg-[#25D366] hover:bg-[#1ebe59] text-white text-center py-3 rounded-full font-semibold transition-colors"
            onClick={() => setOpen(false)}
          >
            Agendar cita
          </a>
        </div>
      )}
    </div>
  );
}
