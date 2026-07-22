"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [dataFiltro, setDataFiltro] = useState("");
 

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  async function carregarAgendamentos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("agendamentos")
      .select("*")
      .order("data_agendamento", { ascending: true })
      .order("horario", { ascending: true });

    if (error) {
      console.error(error);
      alert("Erro ao carregar agendamentos");
      return;
    }

    setAgendamentos(data || []);
    setLoading(false);
  }

  async function excluirAgendamento(id: number) {
    const confirmar = confirm(
      "Tem certeza que deseja excluir este agendamento?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("agendamentos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Erro ao excluir agendamento");
      return;
    }

    carregarAgendamentos();
  }

  async function atualizarStatus(id: number, status: string) {
  console.log("ID:", id);
  console.log("NOVO STATUS:", status);

  const { data, error } = await supabase
    .from("agendamentos")
    .update({ status })
    .eq("id", id)
    .select();

  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error(error);
    alert("Erro ao atualizar status");
    return;
  }

  carregarAgendamentos();
}

  const agendamentosFiltrados = useMemo(() => {
    return agendamentos.filter((item) => {
      const nomeMatch = item.nome
        ?.toLowerCase()
        .includes(busca.toLowerCase());

      const dataMatch =
        !dataFiltro || item.data_agendamento === dataFiltro;

      return nomeMatch && dataMatch;
    });
  }, [agendamentos, busca, dataFiltro]);

  const total = agendamentos.length;

  const pendentes = agendamentos.filter(
    (a) => a.status === "Pendente"
  ).length;

  const concluidos = agendamentos.filter(
    (a) => a.status === "Concluído"
  ).length;

  const cancelados = agendamentos.filter(
    (a) => a.status === "Cancelado"
  ).length;

  return (
    <div className="min-h-screen bg-[#070705] p-8 text-white">
      <h1 className="mb-8 text-4xl font-bold text-[#C2994B]">
        Painel Administrativo
      </h1>

      {/* Dashboard */}
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-[#111] p-4 border border-[#C2994B]/20">
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-3xl font-bold">{total}</p>
        </div>

        <div className="rounded-xl bg-[#111] p-4 border border-[#C2994B]/20">
          <p className="text-sm text-gray-400">Pendentes</p>
          <p className="text-3xl font-bold">{pendentes}</p>
        </div>

        <div className="rounded-xl bg-[#111] p-4 border border-[#C2994B]/20">
          <p className="text-sm text-gray-400">Concluídos</p>
          <p className="text-3xl font-bold">{concluidos}</p>
        </div>

        <div className="rounded-xl bg-[#111] p-4 border border-[#C2994B]/20">
          <p className="text-sm text-gray-400">Cancelados</p>
          <p className="text-3xl font-bold">{cancelados}</p>
        </div>
      </div>

      {/* Filtros */}
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="rounded-lg border border-white/10 bg-[#111] p-3"
        />

        <input
          type="date"
          value={dataFiltro}
          onChange={(e) => setDataFiltro(e.target.value)}
          className="rounded-lg border border-white/10 bg-[#111] p-3"
        />
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : agendamentosFiltrados.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#C2994B]/20">
          <table className="w-full">
            <thead className="bg-[#111]">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Telefone</th>
                <th className="p-4 text-left">Serviço</th>
                <th className="p-4 text-left">Data</th>
                <th className="p-4 text-left">Horário</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Ações</th>
              </tr>
            </thead>

            <tbody>
              {agendamentosFiltrados.map((agendamento) => (
                <tr
                  key={agendamento.id}
                  className="border-t border-white/10"
                >
                  <td className="p-4">{agendamento.nome}</td>

                  <td className="p-4">{agendamento.telefone}</td>

                  <td className="p-4">{agendamento.servico}</td>

                  <td className="p-4">
                    {agendamento.data_agendamento}
                  </td>

                  <td className="p-4">
                    {agendamento.horario}
                  </td>

                  <td className="p-4">
                    <select
                      value={agendamento.status || "Pendente"}
                      onChange={(e) =>
                        atualizarStatus(
                          agendamento.id,
                          e.target.value
                        )
                      }
                      className="rounded bg-[#222] p-2"
                    >
                      <option value="Pendente">
                        Pendente
                      </option>

                      <option value="Concluído">
                        Concluído
                      </option>

                      <option value="Cancelado">
                        Cancelado
                      </option>
                    </select>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          window.open(
                            `https://wa.me/55${agendamento.telefone}`
                          )
                        }
                        className="rounded bg-green-600 px-3 py-2 text-sm"
                      >
                        WhatsApp
                      </button>

                      <button
                        onClick={() =>
                          excluirAgendamento(agendamento.id)
                        }
                        className="rounded bg-red-600 px-3 py-2 text-sm"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}