import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe, Users, Phone } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070705] text-white">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-6 lg:px-12">
        <header className="flex h-24 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C2994B]/40 bg-[#1A1918]/80 text-[#C2994B] shadow-[0_0_0_1px_rgba(194,153,75,0.18)]">
              <span className="font-bold">B</span>
            </div>
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C2994B]">Barbers-Dev</p>
            </div>
          </div>

          <div className="flex items-center pt-1 gap-4 text-[#C2994B]">
            <a href="https://www.instagram.com/SeuBarbeiro" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-[#C2994B]/20 bg-white/5 px-3 py-2 text-sm text-[#C2994B] transition hover:bg-[#C2994B]/10" aria-label="Instagram">
              <Users className="h-4 w-4" />
              Instagram
            </a>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="flex items-center gap-2 rounded-full border border-[#C2994B]/20 bg-white/5 px-3 py-2 text-sm text-[#C2994B] transition hover:bg-[#C2994B]/10" aria-label="WhatsApp">
              <Phone className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </header>

        <main className="flex-1 grid items-center gap-16 lg:grid-cols-[1fr_1fr]">          
          <section className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-white/10 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-[#C2994B]" />
              <span>Barbearia premium em São Paulo</span>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] text-white sm:text-6xl">
                Cuidar do seu visual é nossa <span className="text-[#C2994B]">missão</span>.
              </h1>
              <p className="max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                Agende o corte perfeito toda vez no salão que entende seu estilo, com barbearia profissional e atendimento exclusivo.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/agendamento"
                className="inline-flex items-center justify-center rounded-full bg-[#C2994B] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#B58C44]"
              >
                Agendar agora
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#C2994B] hover:text-[#C2994B]"
              >
                Fale conosco
              </a>
            </div>

            {/* <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_25px_80px_-45px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.25em] text-[#C2994B]">Review</p>
                <p className="mt-4 text-lg font-semibold text-white">João Silva</p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  “Profissionalismo e cuidado em cada detalhe. Atendimento de primeira e resultado impecável.”
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#111010] p-6 shadow-[0_25px_80px_-45px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.25em] text-[#C2994B]">Oferta</p>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/60">Bundle mensal</p>
                    <p className="text-3xl font-semibold text-white">R$95</p>
                  </div>
                  <span className="rounded-2xl bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
                    Mais vendido
                  </span>
                </div>
              </div>
            </div> */}
          </section>

          <section className="relative flex min-h-[560px] items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#141412] via-[#1f1f1c] to-[#141412] p-6 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.9)]">
            {/* <div className="absolute -left-8 top-10 hidden rounded-full border border-[#C2994B]/20 bg-[#C2994B]/10 p-4 text-[#C2994B] sm:flex">
              <div className="text-xs uppercase tracking-[0.3em] text-[#C2994B]">Mais procurado</div>
            </div> */}
            <section className="flex items-center justify-center">
              <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f0f0d] shadow-2xl">
                <Image
                  src="/barber.png"
                  alt="Barbeiro cortando cabelo"
                  width={700}
                  height={850}
                  className="h-[680px] w-full object-cover object-top"
                  priority
                />
              </div>
            </section>
            {/* <div className="pointer-events-none absolute bottom-10 left-10 hidden w-72 rounded-3xl border border-white/10 bg-black/70 p-5 text-white shadow-xl backdrop-blur-lg sm:block">
              <p className="text-sm uppercase tracking-[0.28em] text-[#C2994B]">Depoimento</p>
              <p className="mt-3 text-sm leading-6 text-white/80">
                “O estilo ficou exatamente como pedi. Ambiente top e equipe muito atenciosa.”
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60">Ricardo, 2 meses atrás</p>
            </div> */}
          </section>
        </main>
      </div>
    </div>
  );
}
