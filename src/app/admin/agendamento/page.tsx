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
    <div className="min-h-screen bg-[#070705] p-4 text-white sm:p-6 lg:p-8">
      <h1 className="mb-6 text-2xl font-bold text-[#C2994B] sm:mb-8 sm:text-3xl lg:text-4xl">
        Painel Administrativo
      </h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-4">
          <p className="text-sm text-gray-400">Total</p>
          <p className="text-2xl font-bold sm:text-3xl">{total}</p>
        </div>

        <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-4">
          <p className="text-sm text-gray-400">Pendentes</p>
          <p className="text-2xl font-bold sm:text-3xl">{pendentes}</p>
        </div>

        <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-4">
          <p className="text-sm text-gray-400">Concluídos</p>
          <p className="text-2xl font-bold sm:text-3xl">{concluidos}</p>
        </div>

        <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-4">
          <p className="text-sm text-gray-400">Cancelados</p>
          <p className="text-2xl font-bold sm:text-3xl">{cancelados}</p>
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-[#111] p-3"
        />

        <input
          type="date"
          value={dataFiltro}
          onChange={(e) => setDataFiltro(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-[#111] p-3"
        />
      </div>

      {loading ? (
        <p className="text-gray-300">Carregando...</p>
      ) : agendamentosFiltrados.length === 0 ? (
        <p className="text-gray-300">Nenhum agendamento encontrado.</p>
      ) : (
        <>
          <div className="hidden overflow-x-auto rounded-xl border border-[#C2994B]/20 lg:block">
            <table className="w-full min-w-[900px]">
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
                    <td className="p-4">{agendamento.data_agendamento}</td>
                    <td className="p-4">{agendamento.horario}</td>
                    <td className="p-4">
                      <select
                        value={agendamento.status || "Pendente"}
                        onChange={(e) =>
                          atualizarStatus(agendamento.id, e.target.value)
                        }
                        className="w-full rounded bg-[#222] p-2"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            window.open(`https://wa.me/55${agendamento.telefone}`)
                          }
                          className="rounded bg-green-600 px-3 py-2 text-sm"
                        >
                          WhatsApp
                        </button>

                        <button
                          type="button"
                          onClick={() => excluirAgendamento(agendamento.id)}
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

          <div className="space-y-4 lg:hidden">
            {agendamentosFiltrados.map((agendamento) => (
              <div
                key={agendamento.id}
                className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-4"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{agendamento.nome}</p>
                    <p className="text-sm text-gray-400">{agendamento.telefone}</p>
                  </div>
                  <span className="rounded-full bg-[#C2994B]/20 px-3 py-1 text-xs text-[#C2994B]">
                    {agendamento.status || "Pendente"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                  <div>
                    <p className="text-gray-400">Serviço</p>
                    <p>{agendamento.servico}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Data</p>
                    <p>{agendamento.data_agendamento}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Horário</p>
                    <p>{agendamento.horario}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Status</p>
                    <select
                      value={agendamento.status || "Pendente"}
                      onChange={(e) =>
                        atualizarStatus(agendamento.id, e.target.value)
                      }
                      className="mt-1 w-full rounded bg-[#222] p-2"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(`https://wa.me/55${agendamento.telefone}`)
                    }
                    className="rounded bg-green-600 px-3 py-2 text-sm"
                  >
                    WhatsApp
                  </button>

                  <button
                    type="button"
                    onClick={() => excluirAgendamento(agendamento.id)}
                    className="rounded bg-red-600 px-3 py-2 text-sm"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}