"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function verificarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (ativo && session) {
        router.replace("/admin");
      }
    }

    verificarSessao();

    return () => {
      ativo = false;
    };
  }, [router]);

  async function fazerLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos");
      return;
    }

    setCarregando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      console.error(error);
      alert("E-mail ou senha incorretos");
      setCarregando(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#070705] px-6 text-white">

      <div className="w-full max-w-md rounded-2xl border border-[#C2994B]/20 bg-[#111] p-8 shadow-2xl">

        {/* LOGO */}
        <div className="mb-8 text-center">

          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#C2994B] text-3xl font-bold text-black">
            B
          </div>

          <h1 className="text-3xl font-bold text-[#C2994B]">
            Barber Dev
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Acesse o painel administrativo
          </p>

        </div>

        {/* FORMULÁRIO */}
        <form
          onSubmit={fazerLogin}
          className="space-y-5"
        >

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
              placeholder="admin@email.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white outline-none transition focus:border-[#C2994B]"
            />

          </div>

          {/* SENHA */}
          <div className="space-y-2">

            <label
              htmlFor="senha"
              className="text-sm font-medium text-[#C2994B]"
            >
              Senha
            </label>

            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) =>
                setSenha(e.target.value)
              }
              className="w-full rounded-lg border border-white/10 bg-[#0b0b0b] p-3 text-white outline-none transition focus:border-[#C2994B]"
            />

          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            disabled={carregando}
            className="w-full rounded-lg bg-[#C2994B] py-3 font-semibold text-black transition hover:bg-[#d4aa5a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {carregando
              ? "Entrando..."
              : "Entrar"}
          </button>

        </form>

      </div>

    </main>
  );
}