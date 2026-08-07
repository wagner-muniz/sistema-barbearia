"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!ativo) return;

      if (!session) {
        router.replace("/login");
      }
    }

    verificarSessao();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.replace("/login");
        }
      }
    );

    return () => {
      ativo = false;
      subscription.unsubscribe();
    };
  }, [router]);

  async function sair() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Erro ao sair:", error);
      alert("Erro ao sair da conta");
      return;
    }

    router.push("/login");
    router.refresh();
  }

  const menu = [
    {
      nome: "📊 Dashboard",
      rota: "/admin",
    },
    {
      nome: "🗓️ Agendamentos",
      rota: "/admin/agendamento",
    },
    {
      nome: "✂️ Serviços",
      rota: "/admin/servico",
    },
    {
      nome: "👥 Clientes",
      rota: "/admin/clientes",
    },
    {
      nome: "🚫 Datas Bloqueadas",
      rota: "/admin/bloqueios",
    },
    {
      nome: "📈 Relatórios",
      rota: "/admin/relatorios",
    },
  ];

  return (
    <div className="relative flex min-h-screen overflow-x-hidden bg-[#070705] text-white">
      {menuAberto ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMenuAberto(false)}
          aria-label="Fechar menu"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-[#C2994B]/20 bg-[#111] shadow-2xl shadow-black/40 transition-transform duration-300 lg:static lg:w-64 lg:translate-x-0 lg:shadow-none ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#C2994B]/20 p-6">
          <div>
            <h1 className="text-xl font-bold text-[#C2994B]">Barber Dev</h1>
            <p className="text-xs text-gray-400">Painel Administrativo</p>
          </div>
          <button
            type="button"
            className="rounded-lg border border-[#C2994B]/20 bg-[#111] p-2 text-white hover:bg-[#222] lg:hidden"
            onClick={() => setMenuAberto(false)}
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {menu.map((item) => {
            const ativo = pathname === item.rota;

            return (
              <Link
                key={item.rota}
                href={item.rota}
                className={`block rounded-lg px-4 py-3 transition ${
                  ativo
                    ? "bg-[#C2994B] font-semibold text-black"
                    : "text-gray-300 hover:bg-[#222]"
                }`}
                onClick={() => setMenuAberto(false)}
              >
                {item.nome}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#C2994B]/20 p-4">
          <button
            type="button"
            onClick={sair}
            className="w-full rounded-lg bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 min-w-0 overflow-x-hidden lg:ml-0">
        <header className="flex h-16 items-center justify-between border-b border-[#C2994B]/20 bg-[#111] px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C2994B]/20 bg-[#111] text-white transition hover:bg-[#222] lg:hidden"
              onClick={() => setMenuAberto(true)}
              aria-label="Abrir menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 bg-white" />
                <span className="block h-0.5 w-5 bg-white" />
                <span className="block h-0.5 w-5 bg-white" />
              </div>
            </button>
            <h2 className="font-semibold text-white">Sistema de Agendamento</h2>
          </div>

          <span className="text-sm text-gray-400">Administrador</span>
        </header>

        <section className="min-w-0 overflow-x-auto p-4 sm:p-6 lg:p-8">{children}</section>
      </main>
    </div>
  );
}