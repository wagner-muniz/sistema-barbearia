import { ArrowUp, MessageCircle } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-3 right-3 z-50 flex flex-col gap-2 sm:bottom-4 sm:right-4 sm:gap-3">
      <a
        href="https://wa.me/5511999999999"
        target="_blank"
        rel="noreferrer"
        aria-label="Falar pelo WhatsApp"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition duration-300 hover:scale-105 sm:h-14 sm:w-14"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </a>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Voltar ao topo"
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C2994B]/20 bg-[#111] text-[#C2994B] shadow-lg transition duration-300 hover:scale-105 sm:h-14 sm:w-14"
      >
        <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </div>
  );
}
