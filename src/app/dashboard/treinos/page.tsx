"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell,
  Zap,
  Flame,
  Heart,
  Wind,
  Activity,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Calendar,
  ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";

type Workout = {
  id: string;
  name: string;
  duration: string;
  category: "performance" | "emagrecimento" | "hipertrofia";
  icon: React.ReactNode;
  description: string;
};

type Exercise = {
  id: string;
  name: string;
  sets: string;
  reps: string;
  rest: string;
  description: string;
};

type WorkoutHistory = {
  id: string;
  name: string;
  date: string;
  duration: string;
  category: string;
};

export default function TreinosPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<"performance" | "emagrecimento" | "hipertrofia">("emagrecimento");
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [workoutHistory] = useState<WorkoutHistory[]>([
    { id: "1", name: "HIIT Cardio", date: "Hoje, 08:30", duration: "25 min", category: "Emagrecimento" },
    { id: "2", name: "Treino de Pernas", date: "Ontem, 18:00", duration: "45 min", category: "Hipertrofia" },
    { id: "3", name: "Agilidade", date: "Há 2 dias", duration: "30 min", category: "Performance" },
  ]);

  const workouts: Record<string, Workout[]> = {
    performance: [
      { id: "agilidade", name: "Treino de Agilidade", duration: "30 min", category: "performance", icon: <Zap className="w-6 h-6" />, description: "Melhore sua velocidade e coordenação" },
      { id: "explosao", name: "Potência Explosiva", duration: "25 min", category: "performance", icon: <Activity className="w-6 h-6" />, description: "Desenvolva força explosiva para esportes" },
      { id: "resistencia", name: "Resistência Esportiva", duration: "40 min", category: "performance", icon: <TrendingUp className="w-6 h-6" />, description: "Aumente sua resistência em campo" },
    ],
    emagrecimento: [
      { id: "hiit", name: "HIIT Cardio", duration: "25 min", category: "emagrecimento", icon: <Flame className="w-6 h-6" />, description: "Queime calorias rapidamente" },
      { id: "cardio", name: "Cardio Intenso", duration: "30 min", category: "emagrecimento", icon: <Heart className="w-6 h-6" />, description: "Acelere seu metabolismo" },
      { id: "funcional", name: "Treino Funcional", duration: "35 min", category: "emagrecimento", icon: <Wind className="w-6 h-6" />, description: "Corpo todo em movimento" },
    ],
    hipertrofia: [
      { id: "peito", name: "Treino de Peito", duration: "45 min", category: "hipertrofia", icon: <Dumbbell className="w-6 h-6" />, description: "Desenvolva peitoral e tríceps" },
      { id: "costas", name: "Treino de Costas", duration: "50 min", category: "hipertrofia", icon: <Dumbbell className="w-6 h-6" />, description: "Fortaleça suas costas" },
      { id: "pernas", name: "Treino de Pernas", duration: "55 min", category: "hipertrofia", icon: <Dumbbell className="w-6 h-6" />, description: "Construa pernas fortes" },
    ],
  };

  const workoutExercises: Record<string, Exercise[]> = {
    hiit: [
      { id: "1", name: "Burpees", sets: "4", reps: "30s", rest: "30s", description: "Máxima intensidade" },
      { id: "2", name: "Mountain Climbers", sets: "4", reps: "30s", rest: "30s", description: "Cardio intenso" },
      { id: "3", name: "Jump Squats", sets: "4", reps: "30s", rest: "30s", description: "Explosão de pernas" },
    ],
    peito: [
      { id: "1", name: "Supino Reto", sets: "4", reps: "10-12", rest: "90s", description: "Exercício principal para peito" },
      { id: "2", name: "Supino Inclinado", sets: "3", reps: "10-12", rest: "90s", description: "Foco na parte superior" },
      { id: "3", name: "Crucifixo", sets: "3", reps: "12-15", rest: "60s", description: "Isolamento do peitoral" },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-white">
      {/* Hero Banner com Foto de Fundo */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&h=600&fit=crop')" }}>
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
          <h1 className="text-4xl font-bold text-white">Treinos Personalizados</h1>
          <p className="text-white/90 text-lg mt-2">Escolha seu objetivo e comece</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {!selectedWorkout ? (
            <>
              {/* Category Selector */}
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedCategory("performance")}
                  className={`py-6 px-4 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md ${
                    selectedCategory === "performance"
                      ? "bg-[#27AE60] text-white"
                      : "bg-white text-[#7F8C8D] border-2 border-[#E8ECEC] hover:border-[#27AE60]"
                  }`}
                >
                  <Zap className={`w-6 h-6 mx-auto mb-2 ${selectedCategory === "performance" ? "text-white" : "text-[#27AE60]"}`} />
                  Performance
                </button>
                <button
                  onClick={() => setSelectedCategory("emagrecimento")}
                  className={`py-6 px-4 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md ${
                    selectedCategory === "emagrecimento"
                      ? "bg-[#27AE60] text-white"
                      : "bg-white text-[#7F8C8D] border-2 border-[#E8ECEC] hover:border-[#27AE60]"
                  }`}
                >
                  <Flame className={`w-6 h-6 mx-auto mb-2 ${selectedCategory === "emagrecimento" ? "text-white" : "text-[#27AE60]"}`} />
                  Emagrecimento
                </button>
                <button
                  onClick={() => setSelectedCategory("hipertrofia")}
                  className={`py-6 px-4 rounded-2xl font-bold text-sm transition-all shadow-sm hover:shadow-md ${
                    selectedCategory === "hipertrofia"
                      ? "bg-[#27AE60] text-white"
                      : "bg-white text-[#7F8C8D] border-2 border-[#E8ECEC] hover:border-[#27AE60]"
                  }`}
                >
                  <Dumbbell className={`w-6 h-6 mx-auto mb-2 ${selectedCategory === "hipertrofia" ? "text-white" : "text-[#27AE60]"}`} />
                  Hipertrofia
                </button>
              </div>

              {/* Workouts */}
              <div className="space-y-4">
                {workouts[selectedCategory].map((workout) => (
                  <Card key={workout.id} className="bg-white border border-[#E8ECEC] p-6 rounded-2xl hover:border-[#27AE60] transition-all shadow-lg hover:shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-4 bg-[#27AE60]/10 rounded-2xl text-[#27AE60]">
                            {workout.icon}
                          </div>
                          <div>
                            <h3 className="font-bold text-xl text-[#1A1A1A]">{workout.name}</h3>
                            <p className="text-sm text-[#7F8C8D] mt-1">{workout.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-[#27AE60]">{workout.duration}</div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => setSelectedWorkout(workout.id)}
                        className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-6 rounded-full shadow-lg"
                      >
                        Ver exercícios
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Histórico */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#1A1A1A] flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-[#27AE60]" />
                  Histórico de Atividades
                </h3>
                <div className="space-y-3">
                  {workoutHistory.map((item) => (
                    <Card key={item.id} className="bg-white border border-[#E8ECEC] p-5 rounded-2xl shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-[#1A1A1A]">{item.name}</h4>
                          <p className="text-sm text-[#7F8C8D]">{item.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-[#27AE60] font-bold">{item.duration}</div>
                          <div className="text-xs text-[#7F8C8D]">{item.category}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Detalhes do Treino */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold text-[#27AE60]">
                    {workouts[selectedCategory].find(w => w.id === selectedWorkout)?.name}
                  </h2>
                  <p className="text-[#7F8C8D] text-lg">
                    Exercícios indicados pelo seu personal trainer
                  </p>
                </div>

                <div className="space-y-4">
                  {workoutExercises[selectedWorkout]?.map((exercise, index) => (
                    <Card key={exercise.id} className="bg-white border border-[#E8ECEC] p-6 rounded-2xl shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 bg-[#27AE60] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">{exercise.name}</h3>
                            <p className="text-sm text-[#7F8C8D] mb-4">{exercise.description}</p>
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-[#F7F9F9] p-4 rounded-xl text-center border border-[#E8ECEC]">
                                <div className="text-xs text-[#7F8C8D] mb-1">Séries</div>
                                <div className="text-[#27AE60] font-bold text-lg">{exercise.sets}</div>
                              </div>
                              <div className="bg-[#F7F9F9] p-4 rounded-xl text-center border border-[#E8ECEC]">
                                <div className="text-xs text-[#7F8C8D] mb-1">Repetições</div>
                                <div className="text-[#27AE60] font-bold text-lg">{exercise.reps}</div>
                              </div>
                              <div className="bg-[#F7F9F9] p-4 rounded-xl text-center border border-[#E8ECEC]">
                                <div className="text-xs text-[#7F8C8D] mb-1">Descanso</div>
                                <div className="text-[#27AE60] font-bold text-lg">{exercise.rest}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Button className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-7 rounded-full shadow-lg">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Concluir treino
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
