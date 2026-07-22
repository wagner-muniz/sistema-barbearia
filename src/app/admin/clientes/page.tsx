"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardPage() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .order("data_agendamento", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setAgendamentos(data || []);
    setLoading(false);
  }

  const total = agendamentos.length;

  const pendentes = agendamentos.filter(
    (item) => item.status === "Pendente"
  ).length;

  const concluidos = agendamentos.filter(
    (item) => item.status === "Concluído"
  ).length;

  const cancelados = agendamentos.filter(
    (item) => item.status === "Cancelado"
  ).length;

  const ultimos = agendamentos.slice(0, 5);

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-[#C2994B]">
        Dashboard
      </h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
              <p className="text-gray-400">Agendamentos</p>
              <h2 className="mt-2 text-3xl font-bold">{total}</h2>
            </div>

            <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
              <p className="text-gray-400">Pendentes</p>
              <h2 className="mt-2 text-3xl font-bold">{pendentes}</h2>
            </div>

            <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
              <p className="text-gray-400">Concluídos</p>
              <h2 className="mt-2 text-3xl font-bold">{concluidos}</h2>
            </div>

            <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
              <p className="text-gray-400">Cancelados</p>
              <h2 className="mt-2 text-3xl font-bold">{cancelados}</h2>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
            <h2 className="mb-4 text-2xl font-semibold text-[#C2994B]">
              Últimos Agendamentos
            </h2>

            <div className="space-y-4">
              {ultimos.map((agendamento) => (
                <div
                  key={agendamento.id}
                  className="rounded-lg border border-white/10 p-4"
                >
                  <p>
                    <strong>{agendamento.nome}</strong>
                  </p>

                  <p>{agendamento.servico}</p>

                  <p>
                    {agendamento.data_agendamento} às{" "}
                    {agendamento.horario}
                  </p>

                  <p>Status: {agendamento.status}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}