"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, TrendingUp, ArrowRight, Loader2 } from "lucide-react";

type QuizAnswers = {
  q1: string; // nome
  q2: string; // data nascimento
  q3: string; // como se sente hoje
  q4: string; // nível atividade física
  q5: string[]; // incômodo físico (múltipla)
  q6: string; // humor (escala 1-5)
  q7: string; // objetivo principal
  q8: string; // tempo disponível
  q9: string; // o que quer mudar
  q10: string; // o que atrapalha
  q11: string; // frase que combina
};

export default function DiagnosticoIA() {
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);
  const [diagnostico, setDiagnostico] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ler respostas do localStorage
    const storedAnswers = localStorage.getItem("quizAnswers");
    
    if (!storedAnswers) {
      // Se não houver respostas, redirecionar para o quiz
      router.push("/");
      return;
    }

    const parsedAnswers: QuizAnswers = JSON.parse(storedAnswers);
    setAnswers(parsedAnswers);

    // Gerar diagnóstico com IA
    gerarDiagnostico(parsedAnswers);
  }, [router]);

  const gerarDiagnostico = async (data: QuizAnswers) => {
    setLoading(true);

    try {
      // Preparar prompt para a IA
      const prompt = `
Você é um coach de saúde e bem-estar do AtiveMind. Com base nas respostas abaixo, crie um diagnóstico motivador e personalizado em 3 parágrafos:

1. Situação atual do usuário (humor, energia, incômodos físicos)
2. Áreas de melhoria e sugestões iniciais de hábitos/treinos simples
3. Motivação para continuar a jornada e despertar curiosidade pelo app

**Dados do usuário:**
Nome: ${data.q1}
Data de Nascimento: ${data.q2}
Como se sente hoje: ${data.q3}
Nível de atividade física: ${data.q4}
Incômodos físicos: ${data.q5.join(", ")}
Humor (1-5): ${data.q6}
Objetivo principal: ${data.q7}
Tempo disponível: ${data.q8}
O que quer mudar: ${data.q9}
O que atrapalha: ${data.q10}
Frase escolhida: ${data.q11}

**Instruções:**
- Tom acolhedor, inspirador e motivador
- Use o nome do usuário (${data.q1}) no texto
- NÃO mencione preços ou vendas
- Foque em despertar esperança e curiosidade
- Seja específico sobre os desafios mencionados
- Sugira pequenas ações práticas
- Máximo 3 parágrafos (cada um com 3-4 frases)
`;

      const response = await fetch("/api/generate-diagnostico", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar diagnóstico");
      }

      const result = await response.json();
      setDiagnostico(result.diagnostico);
    } catch (error) {
      console.error("Erro ao gerar diagnóstico:", error);
      // Fallback: diagnóstico genérico
      setDiagnostico(gerarDiagnosticoFallback(data));
    } finally {
      setLoading(false);
    }
  };

  const gerarDiagnosticoFallback = (data: QuizAnswers): string => {
    const nome = data.q1;
    const humor = parseInt(data.q6);
    const objetivo = data.q7.toLowerCase();
    const incomodos = data.q5.join(", ").toLowerCase();
    const atrapalha = data.q10.toLowerCase();

    return `${nome}, é um prazer conhecer você! Percebo que você está se sentindo ${data.q3.toLowerCase()} e seu humor está em ${humor} de 5. ${
      incomodos !== "nenhum"
        ? `Você também mencionou sentir incômodos em ${incomodos}, o que é muito comum e pode ser trabalhado com exercícios específicos.`
        : "É ótimo saber que você não está sentindo incômodos físicos no momento!"
    }

Com base no seu objetivo de ${objetivo} e considerando que ${atrapalha} tem sido um desafio, vou sugerir começar com pequenas mudanças. ${
      data.q8.includes("10")
        ? "Com apenas 10 minutos por dia, você pode fazer exercícios de mobilidade e respiração que vão fazer diferença."
        : "O tempo que você tem disponível é perfeito para criar uma rotina consistente e eficaz."
    } Pequenos passos diários são a chave para transformações duradouras.

${nome}, você está no caminho certo ao buscar mudanças. A jornada de transformação começa com consciência, e você já deu esse primeiro passo. O AtiveMind foi criado para pessoas como você, que querem ${data.q11.toLowerCase()}. Estamos aqui para te apoiar em cada etapa dessa jornada. Vamos juntos?`;
  };

  if (loading || !answers) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl p-12 rounded-3xl text-center">
          <Loader2 className="w-16 h-16 text-emerald-500 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Analisando suas respostas...
          </h2>
          <p className="text-gray-600">
            Estamos criando seu diagnóstico personalizado
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-emerald-500" />
            <span className="text-emerald-600 font-bold text-lg uppercase tracking-wide">
              Seu Diagnóstico Personalizado
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Olá, {answers.q1}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Preparamos uma análise especial para você
          </p>
        </div>

        {/* Diagnóstico Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl p-8 md:p-12 rounded-3xl">
          <div className="space-y-6">
            {diagnostico.split("\n\n").map((paragrafo, index) => {
              const icons = [Heart, TrendingUp, Sparkles];
              const Icon = icons[index] || Sparkles;
              
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {paragrafo}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-6 rounded-2xl border-0 shadow-lg">
            <div className="text-3xl font-bold mb-2">{answers.q7}</div>
            <div className="text-emerald-100 text-sm">Seu objetivo principal</div>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-6 rounded-2xl border-0 shadow-lg">
            <div className="text-3xl font-bold mb-2">{answers.q8}</div>
            <div className="text-blue-100 text-sm">Tempo disponível</div>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-6 rounded-2xl border-0 shadow-lg">
            <div className="text-3xl font-bold mb-2">{answers.q9}</div>
            <div className="text-purple-100 text-sm">Foco de mudança</div>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-8 md:p-10 rounded-3xl border-0 shadow-2xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para começar sua transformação?
            </h2>
            <p className="text-xl text-emerald-50">
              O AtiveMind tem o plano perfeito para você alcançar seus objetivos
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-100 font-bold py-6 px-10 rounded-2xl text-lg shadow-xl"
            >
              Explorar o AtiveMind
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
