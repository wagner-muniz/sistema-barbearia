"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ServicosPage() {
  const [servicos, setServicos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [duracao, setDuracao] = useState("");

  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos() {
    const { data, error } = await supabase
      .from("servicos")
      .select("*")
      .order("nome");

    if (error) {
      console.error(error);
      return;
    }

    setServicos(data || []);
    setLoading(false);
  }

  function editarServico(servico: any) {
    setEditandoId(servico.id);
    setNome(servico.nome);
    setDescricao(servico.descricao || "");
    setPreco(servico.preco.toString());
    setDuracao(servico.duracao_minutos.toString());

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function limparFormulario() {
    setEditandoId(null);
    setNome("");
    setDescricao("");
    setPreco("");
    setDuracao("");
  }

  async function adicionarServico() {
    if (!nome || !descricao || !preco || !duracao) {
      alert("Preencha todos os campos");
      return;
    }

    if (editandoId) {
  const { data, error } = await supabase
    .from("servicos")
    .update({
      nome,
      descricao,
      preco: Number(preco),
      duracao_minutos: Number(duracao),
    })
    .eq("id", editandoId)
    .select();

  console.log("ID:", editandoId);
  console.log("DATA:", data);
  console.log("ERROR:", error);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  alert("Serviço atualizado com sucesso!");

  limparFormulario();
  carregarServicos();
  return;
}

    const { error } = await supabase
      .from("servicos")
      .insert([
        {
          nome,
          descricao,
          preco: Number(preco),
          duracao_minutos: Number(duracao),
          ativo: true,
        },
      ]);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Serviço cadastrado com sucesso!");

    limparFormulario();
    carregarServicos();
  }

  async function excluirServico(id: number) {
    const confirmar = confirm(
      "Deseja realmente excluir este serviço?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("servicos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Serviço excluído com sucesso!");
    carregarServicos();
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-[#C2994B]">
        Serviços
      </h1>

      {/* Formulário */}
      <div className="mb-8 rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          {editandoId ? "Editar Serviço" : "Novo Serviço"}
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="text"
            placeholder="Nome do serviço"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
          />

          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
          />

          <input
            type="number"
            placeholder="Duração em minutos"
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
          />

          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
          />
        </div>

                <div className="mt-4 flex gap-3">
          <button
            onClick={adicionarServico}
            className="rounded-lg bg-[#C2994B] px-6 py-3 font-semibold text-black transition hover:bg-[#d4aa5a]"
          >
            {editandoId ? "Salvar Alterações" : "Adicionar Serviço"}
          </button>

          {editandoId && (
            <button
              onClick={limparFormulario}
              className="rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white transition hover:bg-gray-700"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      {/* Lista */}
      <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">
          Serviços Cadastrados
        </h2>

        {loading ? (
          <p>Carregando...</p>
        ) : servicos.length === 0 ? (
          <p>Nenhum serviço cadastrado.</p>
        ) : (
          <div className="space-y-4">
            {servicos.map((servico) => (
              <div
                key={servico.id}
                className="flex items-center justify-between rounded-lg border border-white/10 p-4"
              >
                <div>
                  <p className="font-semibold text-white">
                    {servico.nome}
                  </p>

                  <p className="text-gray-400">
                    {servico.descricao}
                  </p>

                  <p className="text-gray-400">
                    R$ {Number(servico.preco).toFixed(2)}
                  </p>

                  <p className="text-gray-500 text-sm">
                    {servico.duracao_minutos} minutos
                  </p>

                  <p
                    className={`text-sm ${
                      servico.ativo
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {servico.ativo ? "Ativo" : "Inativo"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => editarServico(servico)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => excluirServico(servico.id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}