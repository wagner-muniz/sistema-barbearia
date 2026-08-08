"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Menu,
  Phone,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { FloatingActions } from "@/components/landing/FloatingActions";
import { SectionCard } from "@/components/landing/SectionCard";
import { SectionTitle } from "@/components/landing/SectionTitle";

const servicos = [
  {
    title: "Corte Clássico",
    description: "Estilo refinado com acabamento impecável para quem valoriza presença e cuidado.",
    icon: <Scissors className="h-6 w-6" />,
  },
  {
    title: "Barba Premium",
    description: "Modelagem precisa com acabamento profissional e atenção aos detalhes.",
    icon: <Sparkles className="h-6 w-6" />,
  },
  {
    title: "Tratamento Facial",
    description: "Cuidado premium para pele, hidratação e acabamento impecável.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
];

const avaliacoes = [
  { nome: "João Vitor", texto: "Atendimento impecável, ambiente elegante e resultado que eu amo." },
  { nome: "Marcos Tavares", texto: "Sempre saio com um visual impecável e com a sensação de cuidado total." },
  { nome: "Luan Pereira", texto: "Profissionalismo, precisão e um espaço muito confortável para relaxar." },
];

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070705] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-3 py-3 sm:px-6 lg:px-12 lg:py-0">
        <header className="sticky top-2 z-40 mt-1 rounded-[1.1rem] border border-[#C2994B]/20 bg-[#111]/90 px-3 py-3 backdrop-blur-sm sm:top-0 sm:mt-2 sm:rounded-full sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C2994B]/40 bg-[#1A1918]/80 text-[#C2994B] shadow-[0_0_0_1px_rgba(194,153,75,0.18)]">
                <span className="font-bold">B</span>
              </div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C2994B]">Barbers-Dev</p>
            </div>

            <nav className="hidden items-center gap-3 text-sm text-[#C2994B] sm:flex">
              <a href="#servicos" className="rounded-full px-3 py-2 transition hover:bg-[#C2994B]/10">Serviços</a>
              <a href="#equipe" className="rounded-full px-3 py-2 transition hover:bg-[#C2994B]/10">Equipe</a>
              <a href="#galeria" className="rounded-full px-3 py-2 transition hover:bg-[#C2994B]/10">Galeria</a>
              <a href="#avaliacoes" className="rounded-full px-3 py-2 transition hover:bg-[#C2994B]/10">Avaliações</a>
              <a href="#contato" className="rounded-full px-3 py-2 transition hover:bg-[#C2994B]/10">Contato</a>
            </nav>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C2994B]/20 bg-white/5 text-[#C2994B] transition duration-300 hover:bg-[#C2994B]/10 sm:hidden"
              onClick={() => setMenuAberto((valor) => !valor)}
              aria-label="Abrir menu"
              aria-expanded={menuAberto}
            >
              {menuAberto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <div className={`overflow-hidden transition-all duration-300 sm:hidden ${menuAberto ? "mt-4 max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="flex flex-col gap-2 rounded-2xl border border-[#C2994B]/20 bg-[#111] p-3 text-sm text-[#C2994B]">
              <a href="#servicos" onClick={() => setMenuAberto(false)} className="rounded-xl px-3 py-2 transition hover:bg-[#C2994B]/10">Serviços</a>
              <a href="#equipe" onClick={() => setMenuAberto(false)} className="rounded-xl px-3 py-2 transition hover:bg-[#C2994B]/10">Equipe</a> 
              <a href="#avaliacoes" onClick={() => setMenuAberto(false)} className="rounded-xl px-3 py-2 transition hover:bg-[#C2994B]/10">Avaliações</a>
              <a href="#contato" onClick={() => setMenuAberto(false)} className="rounded-xl px-3 py-2 transition hover:bg-[#C2994B]/10">Contato</a>
              <a href="https://wa.me/77981001595" target="_blank" rel="noreferrer" onClick={() => setMenuAberto(false)} className="rounded-xl px-3 py-2 transition hover:bg-[#C2994B]/10">WhatsApp</a>
            </div>
          </div>
        </header>

        <main id="top" className="flex-1">
          <section className="grid items-start gap-8 pt-12 sm:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pt-20">
            <div className="max-w-2xl space-y-6 text-center sm:space-y-8 sm:text-left">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-white/10 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-[#C2994B]" />
                <span>Barbearia premium em Vitória da Conquista</span>
              </div>

              <div className="space-y-5">
                <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-[1.05] text-white sm:mx-0 sm:text-5xl lg:text-6xl">
                  Cuidar do seu visual é nossa <span className="text-[#C2994B]">missão</span>.
                </h1>
                <p className="mx-auto max-w-xl text-base leading-8 text-white/75 sm:mx-0 sm:text-lg">
                  Agende o corte perfeito toda vez, com ambiente elegante, equipe especializada e atendimento premium.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/agendamento" className="inline-flex w-full items-center justify-center rounded-full bg-[#C2994B] px-6 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#B58C44] sm:w-auto">
                  Agendar agora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a href="#contato" className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#C2994B] hover:text-[#C2994B] sm:w-auto">
                  Fale conosco
                </a>
              </div>
            </div>

            <div className="relative flex min-h-[280px] items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#141412] via-[#1f1f1c] to-[#141412] p-3 shadow-[0_50px_120px_-60px_rgba(0,0,0,0.9)] sm:min-h-[420px] sm:rounded-[2rem] sm:p-6 lg:min-h-[560px]">
              <div className="w-full overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#0f0f0d] shadow-2xl sm:rounded-[2rem]">
                <Image src="/barber.png" alt="Barbeiro cortando cabelo em ambiente premium" width={700} height={850} className="h-[280px] w-full object-cover object-top sm:h-[480px] lg:h-[680px]" priority />
              </div>
            </div>
          </section>

          <section id="servicos" className="scroll-mt-24 py-8 sm:py-10 lg:py-14">
            <SectionTitle eyebrow="Serviços" title="Estilo, cuidado e presença em cada detalhe" description="Oferecemos uma experiência completa para quem busca identidade, acabamento refinado e um atendimento exclusivo." />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {servicos.map((servico) => (
                <SectionCard key={servico.title} title={servico.title} description={servico.description} icon={servico.icon} accent={servico.title === "Corte Clássico"} />
              ))}
            </div>
          </section>

          {/* <section id="equipe" className="scroll-mt-24 py-8 sm:py-10 lg:py-14">
            <SectionTitle eyebrow="Equipe" title="Profissionais que entendem de estilo" description="Nossa equipe combina técnica, atenção e sensibilidade para entregar o visual ideal para cada cliente." />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {equipe.map((membro) => (
                <div key={membro.nome} className="rounded-[1.75rem] border border-white/10 bg-[#111] p-4 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)] transition duration-300 hover:-translate-y-1">
                  <div className="overflow-hidden rounded-[1.25rem]">
                    <Image src={membro.imagem} alt={membro.nome} width={500} height={600} className="h-72 w-full object-cover object-top" />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-white">{membro.nome}</h3>
                    <p className="mt-2 text-sm text-[#C2994B]">{membro.especialidade}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="galeria" className="scroll-mt-24 py-8 sm:py-10 lg:py-14">
            <SectionTitle eyebrow="Galeria" title="Resultados que destacam seu estilo" description="Nossa galeria reúne cortes modernos, barbas bem feitas e um visual que combina personalidade e sofisticação." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {galerias.map((item, index) => (
                <div key={item.titulo} className="group overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111] transition duration-300 hover:-translate-y-1">
                  <div className="overflow-hidden">
                    <Image src={item.imagem} alt={item.titulo} width={500} height={600} className="h-56 w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-medium text-[#C2994B]">{item.titulo}</p>
                    <p className="mt-2 text-sm text-white/70">{index + 1}º destaque da semana</p>
                  </div>
                </div>
              ))}
            </div>
          </section> */}

          <section id="avaliacoes" className="scroll-mt-24 py-8 sm:py-10 lg:py-14">
            <SectionTitle eyebrow="Avaliações" title="Clientes que voltam por excelência" description="Nossa reputação é construída com confiança, atendimento acolhedor e resultados que superam expectativas." />
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {avaliacoes.map((avaliacao) => (
                <div key={avaliacao.nome} className="rounded-[1.5rem] border border-white/10 bg-[#111] p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)]">
                  <div className="flex gap-1 text-[#C2994B]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${avaliacao.nome}-${index}`} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-white/75">“{avaliacao.texto}”</p>
                  <p className="mt-5 font-semibold text-white">{avaliacao.nome}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="py-8 sm:py-10 lg:py-14">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="rounded-[1.75rem] border border-[#C2994B]/20 bg-[#111] p-6 sm:p-8">
                <div className="flex items-center gap-3 text-[#C2994B]">
                  <Clock3 className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold text-white">Horário de funcionamento</h2>
                </div>
                <div className="mt-6 space-y-3 text-sm text-white/75">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f0f0d] px-4 py-3">
                    <span>Segunda a Sexta</span>
                    <span className="font-semibold text-white">09:00 – 19:00</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f0f0d] px-4 py-3">
                    <span>Sábado</span>
                    <span className="font-semibold text-white">09:00 – 17:00</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#0f0f0d] px-4 py-3">
                    <span>Domingo</span>
                    <span className="font-semibold text-white">Fechado</span>
                  </div>
                </div>
              </div>

              <div id="contato" className="scroll-mt-24 rounded-[1.75rem] border border-[#C2994B]/20 bg-[#111] p-6 sm:p-8">
                <div className="flex items-center gap-3 text-[#C2994B]">
                  <MapPin className="h-6 w-6" />
                  <h2 className="text-2xl font-semibold text-white">Localização e contato</h2>
                </div>
                <div className="mt-6 overflow-hidden rounded-[1.25rem] border border-white/10">
                  <iframe title="Localização da Barbearia" src="https://www.google.com/maps?q=Vitória%20da%20Conquista&z=14&output=embed" className="h-64 w-full min-w-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <a href="https://maps.google.com/?q=Vitória+da+Conquista" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full bg-[#C2994B] px-5 py-3 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-[#B58C44]">Como chegar</a>
                  <a href="mailto:contato@barberdev.com" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#C2994B] hover:text-[#C2994B]">contato@barberdev.com</a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-6 border-t border-white/10 py-8 sm:py-10" id="contato">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#C2994B]/40 bg-[#1A1918]/80 text-[#C2994B] shadow-[0_0_0_1px_rgba(194,153,75,0.18)]">
                  <span className="font-bold">B</span>
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#C2994B]">Barbers-Dev</p>
              </div>
              <p className="mt-4 text-sm leading-7 text-white/70">Uma experiência premium para quem busca estilo, presença e cuidado profissional.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:min-w-[420px]">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C2994B]">Contato</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> (77) 9 8100-1595</li>
                  <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Vitória da Conquista, BA</li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C2994B]">Redes</h3>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li><a href="https://www.instagram.com/wagnermuniz__" target="_blank" rel="noreferrer" className="transition hover:text-[#C2994B]">Instagram</a></li>
                  <li><a href="https://wa.me/77981001595" target="_blank" rel="noreferrer" className="transition hover:text-[#C2994B]">WhatsApp</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <FloatingActions />
    </div>
  );
}
