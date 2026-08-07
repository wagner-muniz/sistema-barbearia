import type { ReactNode } from "react";

type SectionCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  accent?: boolean;
};

export function SectionCard({ title, description, icon, accent = false }: SectionCardProps) {
  return (
    <div
      className={`rounded-3xl border p-6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)] transition duration-300 hover:-translate-y-1 hover:border-[#C2994B]/40 ${
        accent
          ? "border-[#C2994B]/30 bg-[#111]"
          : "border-white/10 bg-[#0f0f0d]"
      }`}
    >
      {icon ? <div className="mb-4 text-[#C2994B]">{icon}</div> : null}
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/70">{description}</p>
    </div>
  );
}
