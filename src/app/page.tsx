"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { Quiz } from "@/components/Quiz";

export type QuizAnswers = {
  q1: string; // nome
  q2: string; // data nascimento
  q3: string; // como se sente hoje
  q4: string; // nível atividade física
  q5: string[]; // incômodo físico (múltipla)
  q6: string; // humor
  q7: string; // objetivo principal
  q8: string; // tempo disponível
  q9: string; // o que quer mudar
  q10: string; // o que atrapalha
  q11: string; // frase que combina
};

export default function Home() {
  const router = useRouter();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleQuizComplete = (answers: QuizAnswers) => {
    // Salvar respostas no localStorage para usar na página de diagnóstico
    localStorage.setItem("quizAnswers", JSON.stringify(answers));
    // Redireciona para a página de diagnóstico
    router.push("/diagnostico_ia");
  };

  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  return <Quiz onComplete={handleQuizComplete} />;
}
