"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type DataBloqueada = {
  id: number;
  data: string;
  motivo: string | null;
};

export default function DatasBloqueadasPage() {
  const [datasBloqueadas, setDatasBloqueadas] = useState<
    DataBloqueada[]
  >([]);

  const [data, setData] = useState("");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarDatasBloqueadas();
  }, []);

  async function carregarDatasBloqueadas() {
    setLoading(true);

    const { data, error } = await supabase
      .from("datas_bloqueadas")
      .select("*")
      .order("data", { ascending: true });

    if (error) {
      console.error(error);
      alert(error.message);
      setLoading(false);
      return;
    }

    setDatasBloqueadas(data || []);
    setLoading(false);
  }

  async function bloquearData() {
    if (!data) {
      alert("Selecione uma data");
      return;
    }

    setSalvando(true);

    const { error } = await supabase
      .from("datas_bloqueadas")
      .insert([
        {
          data,
          motivo: motivo || "Data bloqueada",
        },
      ]);

    setSalvando(false);

    if (error) {
      console.error(error);

      if (error.code === "23505") {
        alert("Esta data já está bloqueada.");
      } else {
        alert(error.message);
      }

      return;
    }

    alert("Data bloqueada com sucesso!");

    setData("");
    setMotivo("");

    carregarDatasBloqueadas();
  }

  async function excluirData(id: number) {
    const confirmar = confirm(
      "Deseja realmente desbloquear esta data?"
    );

    if (!confirmar) return;

    const { error } = await supabase
      .from("datas_bloqueadas")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    alert("Data desbloqueada com sucesso!");

    carregarDatasBloqueadas();
  }

  function formatarData(data: string) {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div>
      <h1 className="mb-8 text-4xl font-bold text-[#C2994B]">
        Datas Bloqueadas
      </h1>

      {/* Formulário */}
      <div className="mb-8 rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Bloquear uma data
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Data
            </label>

            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-400">
              Motivo
            </label>

            <input
              type="text"
              placeholder="Ex: Feriado, férias..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white"
            />
          </div>
        </div>

        <button
          onClick={bloquearData}
          disabled={salvando}
          className="mt-6 rounded-lg bg-[#C2994B] px-6 py-3 font-semibold text-black transition hover:bg-[#d4aa5a] disabled:opacity-50"
        >
          {salvando ? "Bloqueando..." : "Bloquear Data"}
        </button>
      </div>

      {/* Lista */}
      <div className="rounded-xl border border-[#C2994B]/20 bg-[#111] p-6">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Datas bloqueadas
        </h2>

        {loading ? (
          <p className="text-gray-400">
            Carregando...
          </p>
        ) : datasBloqueadas.length === 0 ? (
          <p className="text-gray-400">
            Nenhuma data bloqueada.
          </p>
        ) : (
          <div className="space-y-4">
            {datasBloqueadas.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0b0b0b] p-4"
              >
                <div>
                  <p className="font-semibold text-white">
                    {formatarData(item.data)}
                  </p>

                  <p className="text-sm text-gray-400">
                    {item.motivo}
                  </p>
                </div>

                <button
                  onClick={() => excluirData(item.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Desbloquear
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}