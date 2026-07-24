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
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function verificarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setCarregando(false);
    }

    verificarSessao();
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
      rota: "/admin/agendamentos",
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

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070705] text-white">
        Verificando acesso...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#070705] text-white">

      {/* Fundo escuro */}
      {menuAberto && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMenuAberto(false)}
        />
      )}

      {/* Menu lateral */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-[#C2994B]/20 bg-[#111] transition-transform duration-300 lg:static lg:translate-x-0 ${
          menuAberto ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-[#C2994B]/20 p-6">
          <h1 className="text-xl font-bold text-[#C2994B]">
            Barber Dev
          </h1>

          <p className="text-xs text-gray-400">
            Painel Administrativo
          </p>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {menu.map((item) => {
            const ativo = pathname === item.rota;

            return (
              <Link
                key={item.rota}
                href={item.rota}
                onClick={() => setMenuAberto(false)}
                className={`block rounded-lg px-4 py-3 transition ${
                  ativo
                    ? "bg-[#C2994B] font-semibold text-black"
                    : "text-gray-300 hover:bg-[#222]"
                }`}
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

      {/* Área principal */}
      <main className="flex-1">

        <header className="flex h-16 items-center justify-between border-b border-[#C2994B]/20 bg-[#111] px-4 lg:px-8">

          {/* Botão hambúrguer */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="rounded-md border border-[#C2994B] px-3 py-2 text-[#C2994B] lg:hidden"
          >
            ☰
          </button>

          <h2 className="font-semibold text-white">
            Sistema de Agendamento
          </h2>

          <span className="text-sm text-gray-400">
            Administrador
          </span>

        </header>

        <section className="p-4 lg:p-8">
          {children}
        </section>

      </main>

    </div>
  );
}}