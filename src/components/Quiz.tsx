"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

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

type QuizProps = {
  onComplete: (answers: QuizAnswers) => void;
};

export function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: [],
    q6: "",
    q7: "",
    q8: "",
    q9: "",
    q10: "",
    q11: "",
  });

  const questions = [
    {
      id: "q1",
      type: "text",
      label: "Qual é o seu nome?",
      placeholder: "Digite seu nome",
    },
    {
      id: "q2",
      type: "date",
      label: "Data de nascimento",
    },
    {
      id: "q3",
      type: "single",
      label: "Como você se sente hoje?",
      options: [
        "😃 Bem",
        "😐 Normal",
        "😔 Cansado",
        "😫 Estressado",
      ],
    },
    {
      id: "q4",
      type: "single",
      label: "Nível de atividade física:",
      options: [
        "Nenhuma",
        "Leve 1-2x/semana",
        "Moderada 3-4x/semana",
        "Intensa 5x ou mais/semana",
      ],
    },
    {
      id: "q5",
      type: "multi",
      label: "Incômodos físicos (pode marcar mais de um):",
      options: [
        "Coluna",
        "Pescoço",
        "Ombros",
        "Joelhos",
        "Nenhum",
      ],
    },
    {
      id: "q6",
      type: "scale",
      label: "Como está seu humor atualmente?",
      scaleMin: 1,
      scaleMax: 5,
      scaleLabels: ["Muito mal", "Mal", "Normal", "Bem", "Muito bem"],
    },
    {
      id: "q7",
      type: "single",
      label: "Qual é o seu objetivo principal?",
      options: [
        "Emagrecer",
        "Ganhar massa muscular",
        "Reduzir estresse",
        "Melhorar disposição",
        "Outro",
      ],
    },
    {
      id: "q8",
      type: "single",
      label: "Tempo disponível por dia:",
      options: [
        "Menos de 10 min",
        "10–20 min",
        "20–40 min",
        "Mais de 40 min",
      ],
    },
    {
      id: "q9",
      type: "single",
      label: "O que você mais quer mudar?",
      options: [
        "Energia",
        "Sono",
        "Peso",
        "Postura",
        "Outro",
      ],
    },
    {
      id: "q10",
      type: "single",
      label: "O que mais te atrapalha?",
      options: [
        "Falta de tempo",
        "Desmotivação",
        "Falta de orientação",
        "Cansaço",
        "Outro",
      ],
    },
    {
      id: "q11",
      type: "single",
      label: "Frase que mais combina com você:",
      options: [
        "Quero me sentir mais confiante",
        "Preciso ter mais energia",
        "Quero cuidar do meu corpo e mente",
        "Quero transformar minha rotina",
      ],
    },
  ];

  const currentQuestion = questions[step];

  const handleSelect = (value: string) => {
    const key = currentQuestion.id as keyof QuizAnswers;

    if (currentQuestion.type === "multi") {
      const currentValues = (answers[key] as string[]) || [];
      if (currentValues.includes(value)) {
        setAnswers({
          ...answers,
          [key]: currentValues.filter((v) => v !== value),
        });
      } else {
        setAnswers({
          ...answers,
          [key]: [...currentValues, value],
        });
      }
    } else {
      setAnswers({
        ...answers,
        [key]: value,
      });
    }
  };

  const handleTextInput = (value: string) => {
    const key = currentQuestion.id as keyof QuizAnswers;
    setAnswers({
      ...answers,
      [key]: value,
    });
  };

  const isSelected = (value: string) => {
    const key = currentQuestion.id as keyof QuizAnswers;
    const answer = answers[key];

    if (Array.isArray(answer)) {
      return answer.includes(value);
    }
    return answer === value;
  };

  const canProceed = () => {
    const key = currentQuestion.id as keyof QuizAnswers;
    const answer = answers[key];

    if (currentQuestion.type === "text" || currentQuestion.type === "date") {
      return typeof answer === "string" && answer.trim().length > 0;
    }

    if (currentQuestion.type === "multi") {
      return Array.isArray(answer) && answer.length > 0;
    }
    
    if (currentQuestion.type === "scale") {
      return typeof answer === "string" && answer.trim().length > 0;
    }
    
    return !!answer;
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Salvar no localStorage e chamar onComplete
      localStorage.setItem("quizAnswers", JSON.stringify(answers));
      onComplete(answers as QuizAnswers);
    }
  };

  const progressPercentage = ((step + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm font-medium">
              Pergunta {step + 1} de {questions.length}
            </span>
            <span className="text-emerald-600 text-sm font-bold">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="h-2 bg-white rounded-full overflow-hidden shadow-sm">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl p-8 md:p-10 rounded-3xl">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-emerald-500" />
                <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wide">
                  Quiz AtiveMind
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                {currentQuestion.label}
              </h2>
            </div>

            {/* Text Input */}
            {currentQuestion.type === "text" && (
              <Input
                value={(answers[currentQuestion.id as keyof QuizAnswers] as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="bg-gray-50 border-gray-200 text-gray-800 text-lg py-6 rounded-2xl focus:border-emerald-500 focus:ring-emerald-500"
              />
            )}

            {/* Date Input */}
            {currentQuestion.type === "date" && (
              <Input
                type="date"
                value={(answers[currentQuestion.id as keyof QuizAnswers] as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                className="bg-gray-50 border-gray-200 text-gray-800 text-lg py-6 rounded-2xl focus:border-emerald-500 focus:ring-emerald-500"
              />
            )}

            {/* Scale Input (1-5) */}
            {currentQuestion.type === "scale" && (
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleTextInput(num.toString())}
                      className={`flex-1 aspect-square rounded-2xl border-2 transition-all font-bold text-2xl shadow-sm hover:shadow-md ${
                        answers.q6 === num.toString()
                          ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                          : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 px-1">
                  <span>Muito mal</span>
                  <span>Muito bem</span>
                </div>
              </div>
            )}

            {/* Options */}
            {currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all text-left font-medium shadow-sm hover:shadow-md ${
                      isSelected(option)
                        ? "border-emerald-500 bg-emerald-50 text-gray-800"
                        : "border-gray-200 bg-white text-gray-600 hover:border-emerald-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base md:text-lg">{option}</span>
                      {isSelected(option) && (
                        <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "multi" && (
              <p className="text-sm text-gray-500 text-center">
                ✨ Você pode selecionar mais de uma opção
              </p>
            )}
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex gap-3">
          {step > 0 && (
            <Button
              onClick={() => setStep(step - 1)}
              variant="outline"
              className="flex-1 border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 py-6 rounded-2xl font-semibold"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`${
              step > 0 ? "flex-1" : "w-full"
            } bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-6 rounded-2xl shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all`}
          >
            {step === questions.length - 1
              ? "Ver meu diagnóstico"
              : "Continuar"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
