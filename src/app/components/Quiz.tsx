"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import type { UserProfile } from "../page";

type QuizProps = {
  onComplete: (profile: UserProfile) => void;
};

export function Quiz({ onComplete }: QuizProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<UserProfile>>({
    name: "",
    age: "",
    birthDate: "",
    healthConditions: [],
    currentHabits: [],
    sleepQuality: "",
    stressLevel: "",
    fitnessGoal: "",
    personalGoal: "",
    mainInsecurities: [],
    futureAchievement: "",
    routine: "",
    activityLevel: "",
    physicalPain: [],
    emotionalPain: [],
    goals: [],
    availableTime: "",
  });

  const questions = [
    {
      id: "name",
      question: "Qual é o seu nome?",
      type: "text",
      placeholder: "Digite seu nome completo",
    },
    {
      id: "age",
      question: "Quantos anos você tem?",
      type: "text",
      placeholder: "Ex: 25",
    },
    {
      id: "birthDate",
      question: "Qual sua data de nascimento?",
      type: "text",
      placeholder: "DD/MM/AAAA",
    },
    {
      id: "healthConditions",
      question: "Você tem alguma condição de saúde que devemos saber?",
      multiple: true,
      options: [
        { value: "diabetes", label: "💉 Diabetes" },
        { value: "hipertensao", label: "❤️ Hipertensão" },
        { value: "asma", label: "🫁 Asma" },
        { value: "lesoes", label: "🩹 Lesões anteriores" },
        { value: "nenhuma", label: "✅ Nenhuma" },
      ],
    },
    {
      id: "currentHabits",
      question: "Quais hábitos você já pratica?",
      multiple: true,
      options: [
        { value: "agua", label: "💧 Bebo água regularmente" },
        { value: "exercicio", label: "🏃 Pratico exercícios" },
        { value: "alimentacao", label: "🥗 Como de forma saudável" },
        { value: "sono", label: "😴 Durmo bem" },
        { value: "meditacao", label: "🧘 Medito ou relaxo" },
        { value: "nenhum", label: "❌ Nenhum ainda" },
      ],
    },
    {
      id: "sleepQuality",
      question: "Como é a qualidade do seu sono?",
      options: [
        { value: "otima", label: "😴 Ótima - durmo bem todas as noites" },
        { value: "boa", label: "😊 Boa - durmo bem na maioria das vezes" },
        { value: "regular", label: "😐 Regular - acordo cansado às vezes" },
        { value: "ruim", label: "😔 Ruim - tenho dificuldade para dormir" },
      ],
    },
    {
      id: "stressLevel",
      question: "Qual seu nível de estresse no dia a dia?",
      options: [
        { value: "baixo", label: "😌 Baixo - me sinto tranquilo" },
        { value: "moderado", label: "😐 Moderado - às vezes fico estressado" },
        { value: "alto", label: "😰 Alto - frequentemente estressado" },
        { value: "muito-alto", label: "😫 Muito alto - constantemente ansioso" },
      ],
    },
    {
      id: "fitnessGoal",
      question: "Qual seu principal objetivo físico?",
      multiple: true,
      options: [
        { value: "emagrecimento", label: "🔥 Emagrecer e definir" },
        { value: "hipertrofia", label: "💪 Ganhar massa muscular" },
        { value: "performance", label: "⚡ Melhorar performance esportiva" },
        { value: "saude", label: "❤️ Melhorar saúde geral" },
        { value: "flexibilidade", label: "🤸 Ganhar flexibilidade" },
      ],
    },
    {
      id: "personalGoal",
      question: "Por que você quer desenvolver sua forma física e pessoal?",
      type: "textarea",
      placeholder: "Compartilhe sua motivação... (Ex: Quero ter mais energia para brincar com meus filhos, me sentir mais confiante, etc.)",
    },
    {
      id: "mainInsecurities",
      question: "Quais são suas principais inseguranças?",
      multiple: true,
      options: [
        { value: "corpo", label: "🪞 Meu corpo/aparência" },
        { value: "energia", label: "⚡ Falta de energia" },
        { value: "disciplina", label: "📅 Falta de disciplina" },
        { value: "tempo", label: "⏰ Falta de tempo" },
        { value: "conhecimento", label: "📚 Não sei por onde começar" },
        { value: "motivacao", label: "🎯 Dificuldade em manter motivação" },
      ],
    },
    {
      id: "futureAchievement",
      question: "Imagine que você atingiu seus objetivos. Descreva uma conquista que você alcançou!",
      type: "textarea",
      placeholder: "Seja específico e positivo! (Ex: Consegui correr 5km sem parar, perdi 10kg e me sinto incrível, etc.)",
    },
    {
      id: "activityLevel",
      question: "Qual seu nível de atividade física atual?",
      options: [
        { value: "sedentario", label: "🛋️ Sedentário - não pratico exercícios" },
        { value: "leve", label: "🚶 Leve - caminho ocasionalmente" },
        { value: "moderado", label: "🏃 Moderado - exercito 2-3x por semana" },
        { value: "ativo", label: "💪 Ativo - exercito 4+ vezes por semana" },
      ],
    },
    {
      id: "availableTime",
      question: "Quanto tempo você tem disponível por dia?",
      options: [
        { value: "10-15", label: "⏱️ 10-15 minutos" },
        { value: "20-30", label: "⏰ 20-30 minutos" },
        { value: "30-45", label: "🕐 30-45 minutos" },
        { value: "45+", label: "⏳ Mais de 45 minutos" },
      ],
    },
  ];

  const currentQuestion = questions[step];

  const handleSelect = (value: string) => {
    const key = currentQuestion.id as keyof UserProfile;
    
    if (currentQuestion.multiple) {
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
    const key = currentQuestion.id as keyof UserProfile;
    setAnswers({
      ...answers,
      [key]: value,
    });
  };

  const isSelected = (value: string) => {
    const key = currentQuestion.id as keyof UserProfile;
    const answer = answers[key];
    
    if (Array.isArray(answer)) {
      return answer.includes(value);
    }
    return answer === value;
  };

  const canProceed = () => {
    const key = currentQuestion.id as keyof UserProfile;
    const answer = answers[key];
    
    if (currentQuestion.type === "text" || currentQuestion.type === "textarea") {
      return typeof answer === "string" && answer.trim().length > 0;
    }
    
    if (currentQuestion.multiple) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return !!answer;
  };

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Preencher campos compatibilidade
      const completeProfile: UserProfile = {
        ...answers as UserProfile,
        routine: answers.activityLevel || "",
        physicalPain: [],
        emotionalPain: answers.stressLevel ? [answers.stressLevel] : [],
        goals: [answers.fitnessGoal || ""],
      };
      onComplete(completeProfile);
    }
  };

  const progressPercentage = ((step + 1) / questions.length) * 100;

  // Tela final motivacional
  if (step === questions.length) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full bg-gray-950 border-0 p-8 md:p-12">
          <div className="text-center space-y-8">
            <div className="w-20 h-20 mx-auto bg-[#00FF00] rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-12 h-12 text-black" />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#00FF00]">
                Incrível, {answers.name}! 🎉
              </h2>
              <p className="text-gray-400 text-lg">
                Sua jornada de transformação começa agora. Preparamos tudo especialmente para você!
              </p>
              
              {answers.futureAchievement && (
                <div className="bg-[#00FF00]/10 border-2 border-[#00FF00] rounded-2xl p-6 mt-6">
                  <p className="text-sm text-[#00FF00] font-bold mb-2">🎯 SUA CONQUISTA FUTURA:</p>
                  <p className="text-white text-lg italic">"{answers.futureAchievement}"</p>
                </div>
              )}
            </div>

            <Button
              onClick={() => onComplete(answers as UserProfile)}
              className="w-full bg-[#00FF00] hover:bg-[#00DD00] text-black font-bold text-lg py-7 rounded-2xl"
            >
              Começar minha transformação ✨
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm font-medium">
              Pergunta {step + 1} de {questions.length}
            </span>
            <span className="text-[#00FF00] text-sm font-bold">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#00FF00] transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="bg-gray-950 border-0 p-8 md:p-10">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {currentQuestion.question}
            </h2>

            {/* Text Input */}
            {currentQuestion.type === "text" && (
              <Input
                value={(answers[currentQuestion.id as keyof UserProfile] as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                placeholder={currentQuestion.placeholder}
                className="bg-gray-900 border-gray-800 text-white text-lg py-6 rounded-2xl focus:border-[#00FF00]"
              />
            )}

            {/* Textarea Input */}
            {currentQuestion.type === "textarea" && (
              <Textarea
                value={(answers[currentQuestion.id as keyof UserProfile] as string) || ""}
                onChange={(e) => handleTextInput(e.target.value)}
                placeholder={currentQuestion.placeholder}
                rows={5}
                className="bg-gray-900 border-gray-800 text-white text-lg p-6 rounded-2xl focus:border-[#00FF00] resize-none"
              />
            )}

            {/* Options */}
            {currentQuestion.options && (
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full p-5 rounded-2xl border-2 transition-all text-left font-medium ${
                      isSelected(option.value)
                        ? "border-[#00FF00] bg-[#00FF00]/10 text-white"
                        : "border-gray-800 bg-gray-900/50 text-gray-400 hover:border-gray-700 hover:bg-gray-900"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base md:text-lg">{option.label}</span>
                      {isSelected(option.value) && (
                        <CheckCircle2 className="w-6 h-6 text-[#00FF00] flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.multiple && (
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
              className="flex-1 border-gray-800 text-gray-400 hover:bg-gray-900 hover:text-white py-6 rounded-2xl font-semibold"
            >
              Voltar
            </Button>
          )}
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`${step > 0 ? 'flex-1' : 'w-full'} bg-[#00FF00] hover:bg-[#00DD00] text-black font-bold py-6 rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed`}
          >
            {step === questions.length - 1 ? "Finalizar ✨" : "Continuar"}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
