"use client";

import { useEffect, useState } from "react";

export default function DiagnosticoPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("quizAnswers");
    if (stored) setData(JSON.parse(stored));
  }, []);

  if (!data) return <p>Carregando...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Seu diagnóstico inicial</h1>
      <p><strong>Nome:</strong> {data.q1}</p>
      <p><strong>Idade:</strong> {data.q2}</p>
      <p><strong>Como se sente hoje:</strong> {data.q3}</p>
      <p><strong>Objetivo principal:</strong> {data.q4}</p>
      <p><strong>Exercícios por semana:</strong> {data.q5}</p>
      <p><strong>Alimentação:</strong> {data.q6}</p>
      <p><strong>Objetivo pessoal:</strong> {data.q7}</p>
      <p className="pt-4 text-gray-600">
        Aqui ficará seu diagnóstico personalizado com IA.
      </p>
    </div>
  );
}