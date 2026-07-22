"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [totalServicos, setTotalServicos] = useState(0);
  const [totalAgendamentos, setTotalAgendamentos] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [proximoHorario, setProximoHorario] = useState("--");
  

  useEffect(() => {
    carregarDados();
  }, []);

    async function carregarDados() {
  const { count: servicos } = await supabase
    .from("servicos")
    .select("*", { count: "exact", head: true });

  const { count: agendamentos } = await supabase
    .from("agendamentos")
    .select("*", { count: "exact", head: true });

  const { data: clientes } = await supabase
    .from("agendamentos")
    .select("nome");

  const clientesUnicos = new Set(
    clientes?.map((c) => c.nome)
  );

  // Próximo horário de hoje
  const hoje = new Date().toISOString().split("T")[0];

  const { data: proximo } = await supabase
    .from("agendamentos")
    .select("horario")
    .eq("data_agendamento", hoje)
    .order("horario", { ascending: true })
    .limit(1);

  setTotalServicos(servicos || 0);
  setTotalAgendamentos(agendamentos || 0);
  setTotalClientes(clientesUnicos.size || 0);

  if (proximo && proximo.length > 0) {
    setProximoHorario(proximo[0].horario.slice(0, 5));
  }
}

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-[#C2994B]">
        Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
          <h2 className="text-sm text-gray-400">
            Agendamentos
          </h2>

          <p className="mt-2 text-4xl font-bold text-white">
            {totalAgendamentos}
          </p>
        </div>

        <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
          <h2 className="text-sm text-gray-400">
            Clientes
          </h2>

          <p className="mt-2 text-4xl font-bold text-white">
            {totalClientes}
          </p>
        </div>

        <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
          <h2 className="text-sm text-gray-400">
            Serviços
          </h2>

          <p className="mt-2 text-4xl font-bold text-white">
            {totalServicos}
          </p>
        </div>

        <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
          <h2 className="text-sm text-gray-400">
            Próximo Horário
          </h2>

          <p className="mt-2 text-4xl font-bold text-white">
            {proximoHorario}
          </p>
        </div>
      </div>
    </div>
  );
}