"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

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

  return (
    <div className="flex min-h-screen bg-[#070705] text-white">

      {/* MENU LATERAL */}
      <aside className="flex w-64 flex-col border-r border-[#C2994B]/20 bg-[#111]">

        {/* LOGO */}
        <div className="border-b border-[#C2994B]/20 p-6">
          <h1 className="text-xl font-bold text-[#C2994B]">
            Barber Dev
          </h1>

          <p className="text-xs text-gray-400">
            Painel Administrativo
          </p>
        </div>

        {/* MENU */}
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
              >
                {item.nome}
              </Link>
            );
          })}

        </nav>

        {/* BOTÃO SAIR */}
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

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1">

        <header className="flex h-16 items-center justify-between border-b border-[#C2994B]/20 bg-[#111] px-8">

          <h2 className="font-semibold text-white">
            Sistema de Agendamento
          </h2>

          <span className="text-sm text-gray-400">
            Administrador
          </span>

        </header>

        <section className="p-8">
          {children}
        </section>

      </main>

    </div>
  );
}