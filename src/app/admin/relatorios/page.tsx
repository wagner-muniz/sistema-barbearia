"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Agendamento = {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  servico: string;
  data_agendamento: string;
  horario: string;
  status: string;
};

type Servico = {
  id: number;
  nome: string;
  preco: number;
};

export default function RelatoriosPage() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);

    const [
      { data: agendamentosData, error: agendamentosError },
      { data: servicosData, error: servicosError },
    ] = await Promise.all([
      supabase
        .from("agendamentos")
        .select("*")
        .order("data_agendamento", {
          ascending: true,
        }),

      supabase
        .from("servicos")
        .select("id, nome, preco"),
    ]);

    if (agendamentosError) {
      console.error(agendamentosError);
      alert("Erro ao carregar agendamentos");
      setLoading(false);
      return;
    }

    if (servicosError) {
      console.error(servicosError);
      alert("Erro ao carregar serviços");
      setLoading(false);
      return;
    }

    setAgendamentos(agendamentosData || []);
    setServicos(servicosData || []);

    setLoading(false);
  }

  const agendamentosFiltrados = useMemo(() => {
    return agendamentos.filter((agendamento) => {
      const data = agendamento.data_agendamento;

      const depoisDoInicio =
        !dataInicio || data >= dataInicio;

      const antesDoFim =
        !dataFim || data <= dataFim;

      return depoisDoInicio && antesDoFim;
    });
  }, [agendamentos, dataInicio, dataFim]);

  /*
  =====================================
  FUNÇÃO PARA ENCONTRAR O PREÇO
  =====================================
  */

  function buscarPrecoServico(nomeServico: string) {
    const servicoEncontrado = servicos.find(
      (servico) =>
        servico.nome.toLowerCase() ===
        nomeServico.toLowerCase()
    );

    return Number(servicoEncontrado?.preco || 0);
  }

  /*
  =====================================
  FATURAMENTO DO PERÍODO
  =====================================
  */

  const faturamento = useMemo(() => {
    return agendamentosFiltrados
      .filter(
        (agendamento) =>
          agendamento.status === "Concluído"
      )
      .reduce((total, agendamento) => {
        const preco = buscarPrecoServico(
          agendamento.servico
        );

        return total + preco;
      }, 0);
  }, [agendamentosFiltrados, servicos]);

  /*
  =====================================
  TOTAL DE AGENDAMENTOS
  =====================================
  */

  const totalAgendamentos =
    agendamentosFiltrados.length;

  const totalConcluidos =
    agendamentosFiltrados.filter(
      (agendamento) =>
        agendamento.status === "Concluído"
    ).length;

  const totalPendentes =
    agendamentosFiltrados.filter(
      (agendamento) =>
        agendamento.status === "Pendente"
    ).length;

  const totalCancelados =
    agendamentosFiltrados.filter(
      (agendamento) =>
        agendamento.status === "Cancelado"
    ).length;

  const clientesUnicos = new Set(
    agendamentosFiltrados.map(
      (agendamento) => agendamento.nome
    )
  ).size;

  /*
  =====================================
  SERVIÇOS MAIS AGENDADOS
  =====================================
  */

  const servicosMaisAgendados = useMemo(() => {
    const contagem: Record<string, number> = {};

    agendamentosFiltrados.forEach((agendamento) => {
      const servico = agendamento.servico;

      contagem[servico] =
        (contagem[servico] || 0) + 1;
    });

    return Object.entries(contagem)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
  }, [agendamentosFiltrados]);

  /*
  =====================================
  FORMATAR VALOR
  =====================================
  */

  function formatarValor(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  /*
  =====================================
  FORMATAR DATA
  =====================================
  */

  function formatarData(data: string) {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  /*
  =====================================
  LIMPAR FILTROS
  =====================================
  */

  function limparFiltros() {
    setDataInicio("");
    setDataFim("");
  }

  return (
    <div className="w-full min-w-0 overflow-x-hidden">
      {/* CABEÇALHO */}

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#C2994B] sm:text-4xl">
            Relatórios
          </h1>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Acompanhe os dados da sua barbearia
          </p>
        </div>

        <button
          onClick={carregarDados}
          className="w-full rounded-lg bg-[#C2994B] px-5 py-3 font-semibold text-black transition hover:bg-[#d4aa5a] sm:w-auto"
        >
          Atualizar
        </button>
      </div>

      {/* FILTROS */}

      <div className="mb-8 rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Filtrar período
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Data inicial
            </label>

            <input
              type="date"
              value={dataInicio}
              onChange={(e) =>
                setDataInicio(e.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Data final
            </label>

            <input
              type="date"
              value={dataFim}
              onChange={(e) =>
                setDataFim(e.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={limparFiltros}
              className="w-full rounded-lg bg-gray-700 px-5 py-3 font-semibold text-white transition hover:bg-gray-600"
            >
              Limpar filtros
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">
          Carregando relatório...
        </p>
      ) : (
        <>
          {/* CARDS PRINCIPAIS */}

            <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {/* CANCELAMENTOS */}

            <div className="rounded-xl border border-red-500/30 bg-[#111] p-4 sm:p-6">
              <p className="text-sm text-gray-400">
                Cancelamentos
              </p>

              <p className="mt-2 break-words text-3xl font-bold text-red-500 sm:text-4xl">
                {totalCancelados}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Agendamentos cancelados
              </p>
            </div>

            {/* TOTAL */}

            <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
              <p className="text-sm text-gray-400">
                Total de agendamentos
              </p>

              <p className="mt-2 text-4xl font-bold text-white">
                {totalAgendamentos}
              </p>
            </div>

            {/* CONCLUÍDOS */}

            <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
              <p className="text-sm text-gray-400">
                Concluídos
              </p>

              <p className="mt-2 text-4xl font-bold text-green-500">
                {totalConcluidos}
              </p>
            </div>

            {/* PENDENTES */}

            <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
              <p className="text-sm text-gray-400">
                Pendentes
              </p>

              <p className="mt-2 break-words text-3xl font-bold text-yellow-500 sm:text-4xl">
                {totalPendentes}
              </p>
            </div>

            {/* CLIENTES */}

            <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
              <p className="text-sm text-gray-400">
                Clientes únicos
              </p>

              <p className="mt-2 text-4xl font-bold text-white">
                {clientesUnicos}
              </p>
            </div>

            {/* FATURAMENTO */}

            <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
              <p className="text-sm text-gray-400">
                Faturamento
              </p>

              <p className="mt-2 text-4xl font-bold text-green-500">
                {formatarValor(faturamento)}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Apenas serviços concluídos
              </p>
            </div>
          </div>

          

          {/* RESUMO FINANCEIRO */}

          <div className="mb-8 rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
            <h2 className="mb-6 text-xl font-semibold text-white">
              Resumo financeiro
            </h2>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-white/10 bg-[#0b0b0b] p-5">
                <p className="text-sm text-gray-400">
                  Faturamento no período
                </p>

                <p className="mt-2 text-3xl font-bold text-green-500">
                  {formatarValor(faturamento)}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#0b0b0b] p-5">
                <p className="text-sm text-gray-400">
                  Ticket médio
                </p>

                <p className="mt-2 text-3xl font-bold text-[#C2994B]">
                  {formatarValor(
                    totalConcluidos > 0
                      ? faturamento /
                          totalConcluidos
                      : 0
                  )}
                </p>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#0b0b0b] p-5">
                <p className="text-sm text-gray-400">
                  Serviços concluídos
                </p>

                <p className="mt-2 text-3xl font-bold text-white">
                  {totalConcluidos}
                </p>
              </div>
            </div>
          </div>

          {/* SERVIÇOS MAIS AGENDADOS */}

          <div className="mb-8 rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
            <h2 className="mb-6 text-xl font-semibold text-white">
              Serviços mais agendados
            </h2>

            {servicosMaisAgendados.length === 0 ? (
              <p className="text-gray-400">
                Nenhum serviço encontrado.
              </p>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {servicosMaisAgendados.map(
                  ([servico, quantidade]) => (
                    <div
                      key={servico}
                      className="flex flex-col gap-3 rounded-lg border border-white/10 bg-[#0b0b0b] p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <span className="text-white">
                        {servico}
                      </span>

                      <span className="rounded-full bg-[#C2994B]/20 px-4 py-2 text-center font-semibold text-[#C2994B]">
                        {quantidade} agendamento(s)
                      </span>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          {/* LISTA DE AGENDAMENTOS */}

          <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
            <h2 className="mb-6 text-xl font-semibold text-white">
              Agendamentos do período
            </h2>

            {agendamentosFiltrados.length === 0 ? (
              <p className="text-gray-400">
                Nenhum agendamento encontrado.
              </p>
            ) : (
              <div className="overflow-x-auto pb-2">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-gray-400">
                      <th className="p-4">
                        Cliente
                      </th>

                      <th className="p-4">
                        Serviço
                      </th>

                      <th className="p-4">
                        Data
                      </th>

                      <th className="p-4">
                        Horário
                      </th>

                      <th className="p-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {agendamentosFiltrados.map(
                      (agendamento) => (
                        <tr
                          key={agendamento.id}
                          className="border-b border-white/10"
                        >
                          <td className="max-w-[180px] p-4 break-words text-white">
                            {agendamento.nome}
                          </td>

                          <td className="p-4 text-gray-300">
                            {agendamento.servico}
                          </td>

                          <td className="p-4 text-gray-300">
                            {formatarData(
                              agendamento.data_agendamento
                            )}
                          </td>

                          <td className="p-4 text-gray-300">
                            {agendamento.horario}
                          </td>

                          <td className="p-4">
                            <span
                              className={`rounded-full px-3 py-1 text-sm ${
                                agendamento.status ===
                                "Concluído"
                                  ? "bg-green-500/20 text-green-400"
                                  : agendamento.status ===
                                    "Cancelado"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-yellow-500/20 text-yellow-400"
                              }`}
                            >
                              {agendamento.status ||
                                "Pendente"}
                            </span>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}