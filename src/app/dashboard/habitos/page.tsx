"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Circle, 
  Droplet, 
  ArrowUpDown, 
  Footprints, 
  Brain, 
  Moon,
  Sparkles,
  CheckCheck,
  ArrowLeft,
  BookOpen,
  Sun,
  Wind,
  Activity,
  Heart
} from "lucide-react";
import { useRouter } from "next/navigation";

type Habit = {
  id: string;
  name: string;
  icon: React.ReactNode;
  completed: boolean;
  goal: string;
};

type AvailableHabit = {
  id: string;
  name: string;
  icon: React.ReactNode;
  goal: string;
  category: string;
};

export default function HabitosPage() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showHabitSelector, setShowHabitSelector] = useState(false);

  const availableHabits: AvailableHabit[] = [
    { id: "agua", name: "Beber 2L de água", icon: <Droplet className="w-5 h-5" />, goal: "8 copos", category: "Hidratação" },
    { id: "alongar", name: "Alongar 10min", icon: <ArrowUpDown className="w-5 h-5" />, goal: "1x ao dia", category: "Mobilidade" },
    { id: "caminhar", name: "Caminhar 5000 passos", icon: <Footprints className="w-5 h-5" />, goal: "5000 passos", category: "Movimento" },
    { id: "meditacao", name: "Meditar 5min", icon: <Brain className="w-5 h-5" />, goal: "5 minutos", category: "Mental" },
    { id: "sono", name: "Dormir 8h", icon: <Moon className="w-5 h-5" />, goal: "8 horas", category: "Descanso" },
    { id: "leitura", name: "Ler 15min", icon: <BookOpen className="w-5 h-5" />, goal: "15 minutos", category: "Mental" },
    { id: "sol", name: "Tomar sol 10min", icon: <Sun className="w-5 h-5" />, goal: "10 minutos", category: "Saúde" },
    { id: "respiracao", name: "Exercício de respiração", icon: <Wind className="w-5 h-5" />, goal: "3x ao dia", category: "Mental" },
    { id: "postura", name: "Corrigir postura", icon: <Activity className="w-5 h-5" />, goal: "5x ao dia", category: "Saúde" },
    { id: "gratidao", name: "Praticar gratidão", icon: <Heart className="w-5 h-5" />, goal: "1x ao dia", category: "Mental" },
  ];

  const addHabit = (habitId: string) => {
    if (habits.length >= 3) {
      alert("Você já selecionou 3 hábitos para hoje!");
      return;
    }
    
    const availableHabit = availableHabits.find(h => h.id === habitId);
    if (availableHabit && !habits.find(h => h.id === habitId)) {
      setHabits([...habits, {
        id: availableHabit.id,
        name: availableHabit.name,
        icon: availableHabit.icon,
        goal: availableHabit.goal,
        completed: false
      }]);
    }
  };

  const removeHabit = (habitId: string) => {
    setHabits(habits.filter(h => h.id !== habitId));
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const progressPercentage = habits.length > 0 ? (completedHabits / habits.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-white">
      {/* Hero Banner com Foto de Fundo */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="relative z-10 h-full flex flex-col justify-end p-6 max-w-4xl mx-auto">
          <Button
            onClick={() => router.push("/dashboard")}
            variant="ghost"
            className="mb-4 text-white hover:bg-white/20 rounded-full self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="text-4xl font-bold">Hábitos do Dia</h1>
              <p className="text-white/90 text-lg mt-2">Construa sua rotina saudável</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{completedHabits}/{habits.length}</div>
              <div className="text-sm text-white/80">concluídos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Progress Card */}
          {habits.length > 0 && (
            <Card className="bg-white border border-[#E8ECEC] p-8 rounded-2xl shadow-lg">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#7F8C8D] text-lg font-medium">Progresso de hoje</span>
                  <span className="text-[#27AE60] text-3xl font-bold">{Math.round(progressPercentage)}%</span>
                </div>
                <div className="h-4 bg-[#F7F9F9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#27AE60] to-[#229954] transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Botão para adicionar hábitos */}
          {habits.length < 3 && (
            <Button
              onClick={() => setShowHabitSelector(!showHabitSelector)}
              className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-7 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {habits.length === 0 ? "Escolher meus 3 hábitos" : `Adicionar hábito (${habits.length}/3)`}
            </Button>
          )}

          {/* Seletor de Hábitos */}
          {showHabitSelector && habits.length < 3 && (
            <Card className="bg-white border-2 border-[#27AE60] p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold text-[#27AE60] mb-6">Sugestões de Hábitos Saudáveis</h3>
              <div className="grid gap-4">
                {availableHabits.map((habit) => {
                  const isSelected = habits.find(h => h.id === habit.id);
                  return (
                    <button
                      key={habit.id}
                      onClick={() => addHabit(habit.id)}
                      disabled={!!isSelected}
                      className={`p-6 rounded-2xl border-2 transition-all text-left shadow-sm hover:shadow-md ${
                        isSelected
                          ? "bg-[#F7F9F9] border-[#E8ECEC] opacity-50 cursor-not-allowed"
                          : "bg-white border-[#E8ECEC] hover:border-[#27AE60]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${isSelected ? "bg-[#F7F9F9]" : "bg-[#27AE60]/10"}`}>
                          <div className={isSelected ? "text-[#7F8C8D]" : "text-[#27AE60]"}>
                            {habit.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-[#1A1A1A]">{habit.name}</h4>
                          <p className="text-sm text-[#7F8C8D] mt-1">{habit.category} • Meta: {habit.goal}</p>
                        </div>
                        {isSelected && (
                          <CheckCheck className="w-6 h-6 text-[#27AE60]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Habits List */}
          {habits.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-[#1A1A1A]">Seus hábitos de hoje</h3>
              <div className="grid gap-4">
                {habits.map((habit) => (
                  <div key={habit.id} className="relative">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`w-full p-6 rounded-2xl border-2 transition-all text-left shadow-sm hover:shadow-md ${
                        habit.completed
                          ? "bg-[#27AE60]/10 border-[#27AE60]"
                          : "bg-white border-[#E8ECEC] hover:border-[#27AE60]/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${habit.completed ? "bg-[#27AE60]" : "bg-[#F7F9F9]"}`}>
                          {habit.completed ? (
                            <CheckCircle2 className="w-6 h-6 text-white" />
                          ) : (
                            <Circle className="w-6 h-6 text-[#7F8C8D]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-xl ${habit.completed ? "text-[#1A1A1A]" : "text-[#7F8C8D]"}`}>
                            {habit.name}
                          </h3>
                          <p className="text-sm text-[#7F8C8D] mt-1">Meta: {habit.goal}</p>
                        </div>
                        <div className={habit.completed ? "text-[#27AE60]" : "text-[#7F8C8D]"}>
                          {habit.icon}
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => removeHabit(habit.id)}
                      className="absolute top-3 right-3 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-full text-red-600 text-xs font-bold transition-all"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {habits.length === 0 && !showHabitSelector && (
            <Card className="bg-white border border-[#E8ECEC] p-12 rounded-2xl text-center shadow-lg">
              <div className="space-y-4">
                <div className="w-20 h-20 mx-auto bg-[#27AE60]/10 rounded-full flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-[#27AE60]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A1A1A]">Comece sua jornada</h3>
                <p className="text-[#7F8C8D] text-lg max-w-md mx-auto">
                  Escolha 3 hábitos saudáveis para praticar hoje e transforme sua rotina!
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
