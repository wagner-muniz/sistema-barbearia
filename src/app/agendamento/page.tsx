"use client";

import { DayPicker } from "react-day-picker";
import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/lib/supabase";

export default function AgendamentoPage() {
  const [selected, setSelected] = useState<Date | undefined>();
  const [horario, setHorario] = useState("");

  const [servicos, setServicos] = useState<any[]>([]);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const [servicoSelecionado, setServicoSelecionado] =
    useState("");

  // NOVO: guarda o preço do serviço selecionado
  const [valorServico, setValorServico] =
    useState("");

  // Controle da data bloqueada
  const [dataBloqueada, setDataBloqueada] =
    useState(false);

  const horarios = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
  ];

  // =========================
  // BUSCAR SERVIÇOS
  // =========================

  async function buscarServicos() {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .order("nome");

    if (error) {
      console.error(
        "Erro ao buscar serviços:",
        error
      );

      return;
    }

    setServicos(data || []);
  }

  // =========================
  // VERIFICAR DATA BLOQUEADA
  // =========================

  async function verificarDataBloqueada(
    data: string
  ) {
    const { data: bloqueio, error } =
      await supabase
        .from("datas_bloqueadas")
        .select("id")
        .eq("data", data)
        .maybeSingle();

    if (error) {
      console.error(
        "Erro ao verificar data bloqueada:",
        error
      );

      return false;
    }

    return !!bloqueio;
  }

  // =========================
  // FORMATAR HORÁRIO
  // =========================

  function formatHorarioDB(hora: string) {
    return `${hora}:00`;
  }

  function formatHorarioUI(horarioDb: string) {
    return horarioDb.slice(0, 5);
  }

  // =========================
  // BUSCAR HORÁRIOS OCUPADOS
  // =========================

  async function buscarHorariosOcupados(
    data: string
  ) {
    setCarregandoHorarios(true);

    const {
      data: agendamentos,
      error,
    } = await supabase
      .from("agendamentos")
      .select("horario")
      .eq("data_agendamento", data)
      .order("horario", {
        ascending: true,
      });

    setCarregandoHorarios(false);

    if (error) {
      console.error(error);
      return;
    }

    const ocupados = (
      agendamentos || []
    ).map((item: any) =>
      formatHorarioUI(item.horario)
    );

    setHorariosOcupados(ocupados);
  }

  // =========================
  // CARREGAR SERVIÇOS
  // =========================

  useEffect(() => {
    buscarServicos();
  }, []);

  // =========================
  // VERIFICAR DATA SELECIONADA
  // =========================

  useEffect(() => {
    async function verificarData() {
      if (!selected) {
        setHorariosOcupados([]);
        setDataBloqueada(false);
        setHorario("");

        return;
      }

      const dataFormatada = selected
        .toISOString()
        .split("T")[0];

      const bloqueada =
        await verificarDataBloqueada(
          dataFormatada
        );

      if (bloqueada) {
        setDataBloqueada(true);
        setHorariosOcupados([]);
        setHorario("");

        return;
      }

      setDataBloqueada(false);

      await buscarHorariosOcupados(
        dataFormatada
      );
    }

    verificarData();
  }, [selected]);

  // =========================
  // HORÁRIOS DISPONÍVEIS
  // =========================

  const horariosDisponiveis =
    horarios.filter(
      (hora) =>
        !horariosOcupados.includes(hora)
    );

  // =========================
  // REALIZAR AGENDAMENTO
  // =========================

  async function agendar() {
    if (
      !nome ||
      !telefone ||
      !email ||
      !servicoSelecionado ||
      !valorServico ||
      !selected ||
      !horario
    ) {
      alert("Preencha todos os campos");
      return;
    }

    const dataFormatada = selected
      .toISOString()
      .split("T")[0];

    // Segurança extra
    const bloqueada =
      await verificarDataBloqueada(
        dataFormatada
      );

    if (bloqueada) {
      alert(
        "Esta data está bloqueada para agendamentos."
      );

      setDataBloqueada(true);
      setHorario("");

      return;
    }

    const horarioBanco =
      formatHorarioDB(horario);

    // Verifica se o horário já está ocupado
    const {
      data: horarioExistente,
      error: erroBusca,
    } = await supabase
      .from("agendamentos")
      .select("id")
      .eq("data_agendamento", dataFormatada)
      .eq("horario", horarioBanco)
      .limit(1);

    if (erroBusca) {
      console.error(erroBusca);

      alert(
        "Erro ao verificar disponibilidade."
      );

      return;
    }

    if (
      horarioExistente &&
      horarioExistente.length > 0
    ) {
      alert(
        "Este horário já está ocupado. Escolha outro horário."
      );

      await buscarHorariosOcupados(
        dataFormatada
      );

      setHorario("");

      return;
    }

    // =========================
    // SALVAR AGENDAMENTO
    // =========================

    const { error } = await supabase
      .from("agendamentos")
      .insert([
        {
          nome,
          telefone,
          email,

          servico: servicoSelecionado,

          // NOVO: salva o valor do serviço
          valor: Number(valorServico),

          data_agendamento:
            dataFormatada,

          horario: horarioBanco,
        },
      ]);

    if (error) {
      console.error(error);

      if (error.code === "23505") {
        alert(
          "Este horário já foi reservado. Escolha outro horário."
        );
      } else {
        alert(
          "Erro ao realizar agendamento."
        );
      }

      return;
    }

    alert(
      "Agendamento realizado com sucesso!"
    );

    setNome("");
    setTelefone("");
    setEmail("");
    setServicoSelecionado("");
    setValorServico("");
    setHorario("");
    setSelected(undefined);
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#070705] text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">

        <h1 className="mb-10 text-4xl font-bold text-[#C2994B]">
          Agendamento
        </h1>

        <div className="grid gap-8 rounded-3xl border border-white/10 bg-[#111] p-8 lg:grid-cols-2">

          {/* LADO ESQUERDO */}

          <div>
            <h2 className="mb-6 text-2xl font-semibold text-[#C2994B]">
              Preencha os detalhes
            </h2>

            <div className="space-y-5">

              {/* NOME */}

              <div className="space-y-2">
                <label
                  htmlFor="nome"
                  className="text-sm font-medium text-[#C2994B]"
                >
                  Nome completo
                </label>

                <input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) =>
                    setNome(e.target.value)
                  }
                  placeholder="Digite seu nome"
                  className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
                />
              </div>

              {/* TELEFONE */}

              <div className="space-y-2">
                <label
                  htmlFor="telefone"
                  className="text-sm font-medium text-[#C2994B]"
                >
                  Telefone
                </label>

                <input
                  id="telefone"
                  type="tel"
                  value={telefone}
                  onChange={(e) =>
                    setTelefone(e.target.value)
                  }
                  placeholder="(00) 00000-0000"
                  className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
                />
              </div>

              {/* EMAIL */}

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-[#C2994B]"
                >
                  E-mail
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="seu@email.com"
                  className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
                />
              </div>

              {/* SERVIÇO */}

              <div className="space-y-2">
                <label
                  htmlFor="servico"
                  className="text-sm font-medium text-[#C2994B]"
                >
                  Serviço
                </label>

                <select
                  id="servico"
                  value={servicoSelecionado}
                  onChange={(e) => {
                    const nomeServico =
                      e.target.value;

                    const servico =
                      servicos.find(
                        (item) =>
                          item.nome ===
                          nomeServico
                      );

                    setServicoSelecionado(
                      nomeServico
                    );

                    setValorServico(
                      servico?.preco || ""
                    );
                  }}
                  className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
                >
                  <option value="">
                    Selecione um serviço
                  </option>

                  {servicos.map((servico) => (
                    <option
                      key={servico.id}
                      value={servico.nome}
                    >
                      {servico.nome} - R${" "}
                      {Number(
                        servico.preco
                      ).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* LADO DIREITO */}

          <div>
            <h2 className="mb-6 text-xl font-semibold">
              Escolha uma data
            </h2>

            <div className="rounded-2xl border border-[#C2994B]/20 bg-[#111] p-4">
              <div className="flex justify-center">
                <DayPicker
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                  locale={ptBR}
                  className="text-white"
                  styles={{
                    caption: {
                      color: "#C2994B",
                    },

                    head_cell: {
                      color: "#C2994B",
                    },

                    day: {
                      color: "white",
                    },

                    nav_button: {
                      color: "#C2994B",
                      background:
                        "transparent",
                      border: "none",
                    },

                    chevron: {
                      fill: "#C2994B",
                    },
                  }}
                  modifiersStyles={{
                    selected: {
                      backgroundColor:
                        "#C2994B",
                      color: "#000",
                      borderRadius:
                        "9999px",
                    },

                    today: {
                      color: "#C2994B",
                      fontWeight: "bold",
                    },
                  }}
                />
              </div>
            </div>

            {/* DATA BLOQUEADA */}

            {dataBloqueada && (
              <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400">
                Esta data está bloqueada para agendamentos.
              </div>
            )}

            {/* HORÁRIO */}

            <div className="mt-6 space-y-2">
              <label
                htmlFor="horario"
                className="text-sm font-medium text-[#C2994B]"
              >
                Horário
              </label>

              <select
                id="horario"
                value={horario}
                onChange={(e) =>
                  setHorario(e.target.value)
                }
                className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
                disabled={
                  !selected ||
                  carregandoHorarios ||
                  dataBloqueada
                }
              >
                <option value="">
                  {carregandoHorarios
                    ? "Carregando horários..."
                    : !selected
                    ? "Selecione uma data primeiro"
                    : dataBloqueada
                    ? "Data bloqueada"
                    : horariosDisponiveis.length ===
                      0
                    ? "Nenhum horário disponível"
                    : "Selecione o horário"}
                </option>

                {horariosDisponiveis.map(
                  (hora) => (
                    <option
                      key={hora}
                      value={hora}
                    >
                      {hora}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* BOTÃO */}

            <button
              onClick={agendar}
              disabled={
                dataBloqueada ||
                carregandoHorarios
              }
              className="mt-6 w-full rounded-lg bg-[#C2994B] py-3 font-semibold text-black transition hover:bg-[#d4aa5a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Agendar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}