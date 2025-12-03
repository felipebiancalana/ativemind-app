"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  CheckCircle2, 
  Circle, 
  Droplet, 
  ArrowUpDown, 
  Footprints, 
  Brain, 
  Moon,
  Dumbbell,
  Heart,
  Wind,
  Flame,
  Apple,
  Camera,
  Trophy,
  Share2,
  MessageCircle,
  Target,
  Calendar,
  Clock,
  Zap,
  TrendingUp,
  Award,
  Users,
  ChefHat,
  Utensils,
  Coffee,
  Sun,
  Sunset,
  Activity,
  BarChart3,
  Star,
  Sparkles,
  ArrowRight,
  User,
  Stethoscope,
  BookOpen,
  CheckCheck
} from "lucide-react";
import type { UserProfile } from "../page";

type DashboardProps = {
  userProfile: UserProfile;
};

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

type Achievement = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ReactNode;
};

type Meal = {
  id: string;
  name: string;
  time: string;
  icon: React.ReactNode;
};

type Professional = {
  id: string;
  name: string;
  role: string;
  certification: string;
  description: string;
  icon: React.ReactNode;
};

export function Dashboard({ userProfile }: DashboardProps) {
  const [currentTab, setCurrentTab] = useState<"habitos" | "treinos" | "alimentacao" | "mind">("habitos");
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const [showHabitSelector, setShowHabitSelector] = useState(false);
  
  // Estados para Hábitos
  const [habits, setHabits] = useState<Habit[]>([]);

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

  // Estados para Treinos
  const [selectedCategory, setSelectedCategory] = useState<"performance" | "emagrecimento" | "hipertrofia">("emagrecimento");
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([
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
      { id: "abdomen", name: "Treino de Abdômen", duration: "30 min", category: "hipertrofia", icon: <Dumbbell className="w-6 h-6" />, description: "Core forte e definido" },
      { id: "ombros", name: "Treino de Ombros", duration: "40 min", category: "hipertrofia", icon: <Dumbbell className="w-6 h-6" />, description: "Ombros largos e fortes" },
    ],
  };

  const workoutExercises: Record<string, Exercise[]> = {
    // Performance
    agilidade: [
      { id: "1", name: "Escada de Agilidade", sets: "3", reps: "10 repetições", rest: "30s", description: "Movimentos rápidos entre os degraus" },
      { id: "2", name: "Cone Drill", sets: "4", reps: "8 repetições", rest: "45s", description: "Mudanças rápidas de direção" },
      { id: "3", name: "Sprint Intervalado", sets: "5", reps: "20m", rest: "60s", description: "Corridas explosivas curtas" },
    ],
    explosao: [
      { id: "1", name: "Box Jump", sets: "4", reps: "10", rest: "60s", description: "Saltos explosivos na caixa" },
      { id: "2", name: "Medicine Ball Slam", sets: "3", reps: "12", rest: "45s", description: "Arremesso explosivo da bola" },
      { id: "3", name: "Burpees", sets: "4", reps: "15", rest: "60s", description: "Movimento completo explosivo" },
    ],
    resistencia: [
      { id: "1", name: "Corrida Contínua", sets: "1", reps: "20 min", rest: "-", description: "Ritmo moderado constante" },
      { id: "2", name: "Bike Ergométrica", sets: "1", reps: "15 min", rest: "-", description: "Resistência cardiovascular" },
      { id: "3", name: "Remo", sets: "3", reps: "5 min", rest: "2 min", description: "Resistência de corpo inteiro" },
    ],
    // Emagrecimento
    hiit: [
      { id: "1", name: "Burpees", sets: "4", reps: "30s", rest: "30s", description: "Máxima intensidade" },
      { id: "2", name: "Mountain Climbers", sets: "4", reps: "30s", rest: "30s", description: "Cardio intenso" },
      { id: "3", name: "Jump Squats", sets: "4", reps: "30s", rest: "30s", description: "Explosão de pernas" },
    ],
    cardio: [
      { id: "1", name: "Corrida na Esteira", sets: "1", reps: "20 min", rest: "-", description: "Ritmo acelerado" },
      { id: "2", name: "Pular Corda", sets: "5", reps: "2 min", rest: "1 min", description: "Cardio intenso" },
      { id: "3", name: "Bike Sprint", sets: "6", reps: "1 min", rest: "1 min", description: "Alta intensidade" },
    ],
    funcional: [
      { id: "1", name: "Kettlebell Swing", sets: "4", reps: "15", rest: "45s", description: "Movimento funcional completo" },
      { id: "2", name: "TRX Row", sets: "3", reps: "12", rest: "60s", description: "Força funcional de costas" },
      { id: "3", name: "Agachamento com Salto", sets: "4", reps: "12", rest: "60s", description: "Potência de pernas" },
    ],
    // Hipertrofia
    peito: [
      { id: "1", name: "Supino Reto", sets: "4", reps: "10-12", rest: "90s", description: "Exercício principal para peito" },
      { id: "2", name: "Supino Inclinado", sets: "3", reps: "10-12", rest: "90s", description: "Foco na parte superior" },
      { id: "3", name: "Crucifixo", sets: "3", reps: "12-15", rest: "60s", description: "Isolamento do peitoral" },
      { id: "4", name: "Tríceps Testa", sets: "3", reps: "12", rest: "60s", description: "Finalização de tríceps" },
    ],
    costas: [
      { id: "1", name: "Barra Fixa", sets: "4", reps: "8-10", rest: "90s", description: "Exercício completo de costas" },
      { id: "2", name: "Remada Curvada", sets: "4", reps: "10-12", rest: "90s", description: "Espessura das costas" },
      { id: "3", name: "Pulldown", sets: "3", reps: "12", rest: "60s", description: "Largura das costas" },
      { id: "4", name: "Remada Unilateral", sets: "3", reps: "12", rest: "60s", description: "Simetria e força" },
    ],
    pernas: [
      { id: "1", name: "Agachamento Livre", sets: "4", reps: "10-12", rest: "120s", description: "Rei dos exercícios de pernas" },
      { id: "2", name: "Leg Press", sets: "4", reps: "12-15", rest: "90s", description: "Volume para pernas" },
      { id: "3", name: "Cadeira Extensora", sets: "3", reps: "15", rest: "60s", description: "Isolamento de quadríceps" },
      { id: "4", name: "Mesa Flexora", sets: "3", reps: "15", rest: "60s", description: "Posterior de coxa" },
    ],
    abdomen: [
      { id: "1", name: "Abdominal Supra", sets: "4", reps: "20", rest: "45s", description: "Parte superior do abdômen" },
      { id: "2", name: "Elevação de Pernas", sets: "4", reps: "15", rest: "45s", description: "Parte inferior do abdômen" },
      { id: "3", name: "Prancha", sets: "3", reps: "60s", rest: "60s", description: "Core completo" },
      { id: "4", name: "Abdominal Bicicleta", sets: "3", reps: "20", rest: "45s", description: "Oblíquos e rotação" },
    ],
    ombros: [
      { id: "1", name: "Desenvolvimento com Barra", sets: "4", reps: "10-12", rest: "90s", description: "Ombros completos" },
      { id: "2", name: "Elevação Lateral", sets: "4", reps: "12-15", rest: "60s", description: "Ombro medial" },
      { id: "3", name: "Elevação Frontal", sets: "3", reps: "12", rest: "60s", description: "Ombro anterior" },
      { id: "4", name: "Crucifixo Inverso", sets: "3", reps: "15", rest: "60s", description: "Ombro posterior" },
    ],
  };

  // Estados para Alimentação
  const [caloriesConsumed, setCaloriesConsumed] = useState(1450);
  const [caloriesGoal] = useState(2000);
  const [selectedMeal, setSelectedMeal] = useState<"cafe" | "almoco" | "jantar" | "lanche">("cafe");

  const meals: Meal[] = [
    { id: "cafe", name: "Café da Manhã", time: "07:00 - 09:00", icon: <Coffee className="w-5 h-5" /> },
    { id: "almoco", name: "Almoço", time: "12:00 - 14:00", icon: <Utensils className="w-5 h-5" /> },
    { id: "lanche", name: "Lanche", time: "16:00 - 17:00", icon: <Apple className="w-5 h-5" /> },
    { id: "jantar", name: "Jantar", time: "19:00 - 21:00", icon: <ChefHat className="w-5 h-5" /> },
  ];

  const mealSuggestions: Record<string, string[]> = {
    cafe: ["🥚 Ovos mexidos com aveia", "🥑 Pão integral com abacate", "🥤 Smoothie de frutas com whey", "🥞 Panqueca de banana"],
    almoco: ["🍗 Frango grelhado com arroz integral", "🥗 Salada completa com atum", "🍝 Macarrão integral com legumes", "🥩 Carne magra com batata doce"],
    lanche: ["🍎 Frutas com pasta de amendoim", "🥜 Mix de castanhas", "🧀 Queijo branco com tapioca", "🥤 Iogurte natural com granola"],
    jantar: ["🐟 Salmão com legumes", "🍗 Frango com salada", "🥗 Omelete de claras com vegetais", "🍲 Sopa de legumes com proteína"],
  };

  const professionals: Professional[] = [
    {
      id: "personal",
      name: "Carlos Silva",
      role: "Personal Trainer",
      certification: "CREF 123456-G/SP",
      description: "Especialista em treinamento funcional e hipertrofia com 10 anos de experiência. Formado em Educação Física pela USP.",
      icon: <Dumbbell className="w-6 h-6" />
    },
    {
      id: "medico",
      name: "Dra. Ana Paula Costa",
      role: "Médica do Esporte",
      certification: "CRM 98765/SP",
      description: "Médica especializada em medicina esportiva e reabilitação. Pós-graduada em Nutrologia Esportiva.",
      icon: <Stethoscope className="w-6 h-6" />
    },
    {
      id: "nutricionista",
      name: "Marina Santos",
      role: "Nutricionista",
      certification: "CRN-3 45678",
      description: "Nutricionista especializada em nutrição esportiva e emagrecimento saudável. Mestre em Ciências da Nutrição pela UNIFESP.",
      icon: <Apple className="w-6 h-6" />
    },
  ];

  // Estados para Mind e Conquistas
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: "1", title: "Primeira Semana", description: "Complete 7 dias consecutivos", completed: true, icon: <Trophy className="w-5 h-5" /> },
    { id: "2", title: "Hidratação Master", description: "Beba 2L de água por 5 dias", completed: true, icon: <Droplet className="w-5 h-5" /> },
    { id: "3", title: "Guerreiro do Treino", description: "Complete 10 treinos", completed: false, icon: <Dumbbell className="w-5 h-5" /> },
    { id: "4", title: "Mente Sã", description: "Medite por 7 dias seguidos", completed: false, icon: <Brain className="w-5 h-5" /> },
    { id: "5", title: "Transformação", description: "30 dias de consistência", completed: false, icon: <Award className="w-5 h-5" /> },
  ]);

  const [dailyGoals] = useState([
    { id: "1", text: "Complete 3 hábitos hoje", completed: false },
    { id: "2", text: "Faça 1 treino", completed: false },
    { id: "3", text: "Registre suas refeições", completed: false },
  ]);

  const [appRating, setAppRating] = useState(0);
  const [appReview, setAppReview] = useState("");

  const toggleHabit = (id: string) => {
    setHabits(habits.map(h => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const toggleAchievement = (id: string) => {
    setAchievements(achievements.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const completedHabits = habits.filter(h => h.completed).length;
  const progressPercentage = habits.length > 0 ? (completedHabits / habits.length) * 100 : 0;
  const caloriesPercentage = (caloriesConsumed / caloriesGoal) * 100;
  const completedAchievements = achievements.filter(a => a.completed).length;

  return (
    <div className="min-h-screen bg-[#F7F9F9]">
      {/* Header */}
      <header className="border-b border-[#E8ECEC] bg-white sticky top-0 z-50 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#27AE60]">AtiveMind</h1>
              <p className="text-[#7F8C8D] text-sm">Olá, {userProfile.name}! 👋</p>
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold text-[#27AE60]">{completedHabits}/{habits.length}</div>
              <div className="text-xs text-[#7F8C8D]">hábitos hoje</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setCurrentTab("habitos")}
              className={`py-3 px-2 rounded-xl font-bold text-xs md:text-sm transition-all shadow-sm ${
                currentTab === "habitos"
                  ? "bg-[#27AE60] text-white shadow-md"
                  : "bg-white text-[#7F8C8D] hover:bg-[#F7F9F9] border border-[#E8ECEC]"
              }`}
            >
              <Target className={`w-4 h-4 mx-auto mb-1 ${currentTab === "habitos" ? "text-white" : "text-[#27AE60]"}`} />
              Hábitos
            </button>
            <button
              onClick={() => setCurrentTab("treinos")}
              className={`py-3 px-2 rounded-xl font-bold text-xs md:text-sm transition-all shadow-sm ${
                currentTab === "treinos"
                  ? "bg-[#27AE60] text-white shadow-md"
                  : "bg-white text-[#7F8C8D] hover:bg-[#F7F9F9] border border-[#E8ECEC]"
              }`}
            >
              <Dumbbell className={`w-4 h-4 mx-auto mb-1 ${currentTab === "treinos" ? "text-white" : "text-[#27AE60]"}`} />
              Treinos
            </button>
            <button
              onClick={() => setCurrentTab("alimentacao")}
              className={`py-3 px-2 rounded-xl font-bold text-xs md:text-sm transition-all shadow-sm ${
                currentTab === "alimentacao"
                  ? "bg-[#27AE60] text-white shadow-md"
                  : "bg-white text-[#7F8C8D] hover:bg-[#F7F9F9] border border-[#E8ECEC]"
              }`}
            >
              <Apple className={`w-4 h-4 mx-auto mb-1 ${currentTab === "alimentacao" ? "text-white" : "text-[#27AE60]"}`} />
              Alimentação
            </button>
            <button
              onClick={() => setCurrentTab("mind")}
              className={`py-3 px-2 rounded-xl font-bold text-xs md:text-sm transition-all shadow-sm ${
                currentTab === "mind"
                  ? "bg-[#27AE60] text-white shadow-md"
                  : "bg-white text-[#7F8C8D] hover:bg-[#F7F9F9] border border-[#E8ECEC]"
              }`}
            >
              <Trophy className={`w-4 h-4 mx-auto mb-1 ${currentTab === "mind" ? "text-white" : "text-[#27AE60]"}`} />
              Mind
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* TAB: HÁBITOS E ROTINA */}
        {currentTab === "habitos" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#27AE60]">Hábitos e Rotina 🎯</h2>
              <p className="text-[#7F8C8D]">
                Escolha 3 hábitos saudáveis para realizar hoje!
              </p>
              
              {/* Progress Card */}
              {habits.length > 0 && (
                <Card className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#7F8C8D] text-sm">Progresso de hoje</span>
                      <span className="text-[#27AE60] text-2xl font-bold">{Math.round(progressPercentage)}%</span>
                    </div>
                    <div className="h-3 bg-[#F7F9F9] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#27AE60] transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Botão para adicionar hábitos */}
            {habits.length < 3 && (
              <Button
                onClick={() => setShowHabitSelector(!showHabitSelector)}
                className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-6 rounded-2xl shadow-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                {habits.length === 0 ? "Escolher meus 3 hábitos" : `Adicionar hábito (${habits.length}/3)`}
              </Button>
            )}

            {/* Seletor de Hábitos */}
            {showHabitSelector && habits.length < 3 && (
              <Card className="bg-white border-2 border-[#27AE60] shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-[#27AE60] mb-4">Sugestões de Hábitos Saudáveis</h3>
                <div className="grid gap-3">
                  {availableHabits.map((habit) => {
                    const isSelected = habits.find(h => h.id === habit.id);
                    return (
                      <button
                        key={habit.id}
                        onClick={() => addHabit(habit.id)}
                        disabled={!!isSelected}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          isSelected
                            ? "bg-[#F7F9F9] border-[#E8ECEC] opacity-50 cursor-not-allowed"
                            : "bg-white border-[#E8ECEC] hover:border-[#27AE60] shadow-sm hover:shadow-md"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-full ${isSelected ? "bg-[#F7F9F9]" : "bg-[#27AE60]/10"}`}>
                            <div className={isSelected ? "text-[#7F8C8D]" : "text-[#27AE60]"}>
                              {habit.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-[#1A1A1A]">{habit.name}</h4>
                            <p className="text-sm text-[#7F8C8D]">{habit.category} • Meta: {habit.goal}</p>
                          </div>
                          {isSelected && (
                            <CheckCheck className="w-5 h-5 text-[#27AE60]" />
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
              <div className="grid gap-3">
                {habits.map((habit) => (
                  <div key={habit.id} className="relative">
                    <button
                      onClick={() => toggleHabit(habit.id)}
                      className={`w-full p-5 rounded-2xl border-2 transition-all text-left shadow-sm hover:shadow-md ${
                        habit.completed
                          ? "bg-[#27AE60]/10 border-[#27AE60]"
                          : "bg-white border-[#E8ECEC] hover:border-[#27AE60]/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full ${habit.completed ? "bg-[#27AE60]" : "bg-[#F7F9F9]"}`}>
                          {habit.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-white" />
                          ) : (
                            <Circle className="w-5 h-5 text-[#7F8C8D]" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-bold text-lg ${habit.completed ? "text-[#1A1A1A]" : "text-[#7F8C8D]"}`}>
                            {habit.name}
                          </h3>
                          <p className="text-sm text-[#7F8C8D]">Meta: {habit.goal}</p>
                        </div>
                        <div className={habit.completed ? "text-[#27AE60]" : "text-[#7F8C8D]"}>
                          {habit.icon}
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => removeHabit(habit.id)}
                      className="absolute top-2 right-2 p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-600 text-xs font-medium"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: TREINOS */}
        {currentTab === "treinos" && (
          <div className="space-y-6">
            {!selectedWorkout ? (
              <>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-[#27AE60]">Treinos 💪</h2>
                  <p className="text-[#7F8C8D]">
                    Escolha seu objetivo e comece a treinar agora!
                  </p>
                </div>

                {/* Category Selector */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setSelectedCategory("performance")}
                    className={`py-4 px-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                      selectedCategory === "performance"
                        ? "bg-[#27AE60] text-white shadow-md"
                        : "bg-white text-[#7F8C8D] hover:bg-[#F7F9F9] border border-[#E8ECEC]"
                    }`}
                  >
                    <Zap className={`w-5 h-5 mx-auto mb-1 ${selectedCategory === "performance" ? "text-white" : "text-[#27AE60]"}`} />
                    Performance
                  </button>
                  <button
                    onClick={() => setSelectedCategory("emagrecimento")}
                    className={`py-4 px-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                      selectedCategory === "emagrecimento"
                        ? "bg-[#27AE60] text-white shadow-md"
                        : "bg-white text-[#7F8C8D] hover:bg-[#F7F9F9] border border-[#E8ECEC]"
                    }`}
                  >
                    <Flame className={`w-5 h-5 mx-auto mb-1 ${selectedCategory === "emagrecimento" ? "text-white" : "text-[#27AE60]"}`} />
                    Emagrecimento
                  </button>
                  <button
                    onClick={() => setSelectedCategory("hipertrofia")}
                    className={`py-4 px-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
                      selectedCategory === "hipertrofia"
                        ? "bg-[#27AE60] text-white shadow-md"
                        : "bg-white text-[#7F8C8D] hover:bg-[#F7F9F9] border border-[#E8ECEC]"
                    }`}
                  >
                    <Dumbbell className={`w-5 h-5 mx-auto mb-1 ${selectedCategory === "hipertrofia" ? "text-white" : "text-[#27AE60]"}`} />
                    Hipertrofia
                  </button>
                </div>

                {/* Workouts */}
                <div className="space-y-4">
                  {workouts[selectedCategory].map((workout) => (
                    <Card key={workout.id} className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl hover:shadow-lg transition-all">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="p-4 bg-[#27AE60]/10 rounded-2xl text-[#27AE60]">
                              {workout.icon}
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-[#1A1A1A]">{workout.name}</h3>
                              <p className="text-sm text-[#7F8C8D]">{workout.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-[#27AE60]">{workout.duration}</div>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => setSelectedWorkout(workout.id)}
                          className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-6 rounded-2xl shadow-lg"
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
                  <h3 className="text-xl font-bold text-[#27AE60] flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Histórico de Atividades
                  </h3>
                  <div className="space-y-3">
                    {workoutHistory.map((item) => (
                      <Card key={item.id} className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-5 rounded-2xl">
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
                <div className="space-y-4">
                  <Button
                    onClick={() => setSelectedWorkout(null)}
                    className="bg-white hover:bg-[#F7F9F9] text-[#27AE60] border-2 border-[#27AE60] font-bold py-3 px-6 rounded-xl shadow-sm"
                  >
                    ← Voltar
                  </Button>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-[#27AE60]">
                      {workouts[selectedCategory].find(w => w.id === selectedWorkout)?.name}
                    </h2>
                    <p className="text-[#7F8C8D]">
                      Exercícios indicados pelo seu personal trainer
                    </p>
                  </div>

                  <div className="space-y-3">
                    {workoutExercises[selectedWorkout]?.map((exercise, index) => (
                      <Card key={exercise.id} className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
                        <div className="space-y-3">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-[#27AE60] rounded-full flex items-center justify-center text-white font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-lg text-[#1A1A1A] mb-2">{exercise.name}</h3>
                              <p className="text-sm text-[#7F8C8D] mb-3">{exercise.description}</p>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="bg-[#F7F9F9] p-3 rounded-lg text-center">
                                  <div className="text-xs text-[#7F8C8D] mb-1">Séries</div>
                                  <div className="text-[#27AE60] font-bold">{exercise.sets}</div>
                                </div>
                                <div className="bg-[#F7F9F9] p-3 rounded-lg text-center">
                                  <div className="text-xs text-[#7F8C8D] mb-1">Repetições</div>
                                  <div className="text-[#27AE60] font-bold">{exercise.reps}</div>
                                </div>
                                <div className="bg-[#F7F9F9] p-3 rounded-lg text-center">
                                  <div className="text-xs text-[#7F8C8D] mb-1">Descanso</div>
                                  <div className="text-[#27AE60] font-bold">{exercise.rest}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <Button className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-6 rounded-2xl shadow-lg">
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                    Concluir treino
                  </Button>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB: ALIMENTAÇÃO */}
        {currentTab === "alimentacao" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#27AE60]">Alimentação 🍎</h2>
              <p className="text-[#7F8C8D]">
                Acompanhe suas calorias e receba sugestões personalizadas!
              </p>
            </div>

            {/* Contador de Calorias */}
            <Card className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#27AE60]">Calorias de Hoje</h3>
                  <BarChart3 className="w-5 h-5 text-[#27AE60]" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-[#27AE60]">{caloriesConsumed}</div>
                  <div className="text-[#7F8C8D]">de {caloriesGoal} kcal</div>
                </div>
                <div className="h-3 bg-[#F7F9F9] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#27AE60] transition-all duration-500"
                    style={{ width: `${Math.min(caloriesPercentage, 100)}%` }}
                  />
                </div>
              </div>
            </Card>

            {/* Análise por Foto */}
            <Card className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-[#27AE60] flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Análise de Refeição por Foto
                </h3>
                <p className="text-sm text-[#7F8C8D]">
                  Tire uma foto da sua refeição e receba informações nutricionais instantâneas!
                </p>
                <Button className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-6 rounded-2xl shadow-lg">
                  <Camera className="w-5 h-5 mr-2" />
                  Tirar foto da refeição
                </Button>
              </div>
            </Card>

            {/* Seletor de Refeição */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#27AE60]">Sugestões por Refeição</h3>
              <div className="grid grid-cols-2 gap-3">
                {meals.map((meal) => (
                  <button
                    key={meal.id}
                    onClick={() => setSelectedMeal(meal.id as any)}
                    className={`p-4 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md ${
                      selectedMeal === meal.id
                        ? "border-[#27AE60] bg-[#27AE60]/10"
                        : "border-[#E8ECEC] bg-white hover:border-[#27AE60]/50"
                    }`}
                  >
                    <div className={`mb-2 ${selectedMeal === meal.id ? "text-[#27AE60]" : "text-[#7F8C8D]"}`}>
                      {meal.icon}
                    </div>
                    <div className="text-sm font-bold text-[#1A1A1A]">{meal.name}</div>
                    <div className="text-xs text-[#7F8C8D]">{meal.time}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sugestões */}
            <Card className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#27AE60] mb-4">Sugestões para {meals.find(m => m.id === selectedMeal)?.name}</h3>
              <div className="space-y-3">
                {mealSuggestions[selectedMeal].map((suggestion, index) => (
                  <div key={index} className="p-4 bg-[#F7F9F9] rounded-xl text-[#1A1A1A] border border-[#E8ECEC]">
                    {suggestion}
                  </div>
                ))}
              </div>
            </Card>

            {/* Dicas */}
            <Card className="bg-[#27AE60]/10 border-2 border-[#27AE60] shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#27AE60] mb-3">💡 Dica do Dia</h3>
              <p className="text-[#1A1A1A]">
                Beba água antes das refeições para melhorar a digestão e aumentar a sensação de saciedade!
              </p>
            </Card>

            {/* Profissionais */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#27AE60]">Profissionais Certificados</h3>
              <div className="space-y-4">
                {professionals.map((professional) => (
                  <Card key={professional.id} className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
                    <div className="space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="p-4 bg-[#27AE60]/10 rounded-2xl text-[#27AE60]">
                          {professional.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-[#1A1A1A]">{professional.name}</h4>
                          <p className="text-sm text-[#27AE60] mb-1">{professional.role}</p>
                          <p className="text-xs text-[#7F8C8D] mb-2">Registro: {professional.certification}</p>
                          <p className="text-sm text-[#7F8C8D]">{professional.description}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: MIND E CONQUISTAS */}
        {currentTab === "mind" && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-[#27AE60]">Mind & Conquistas 🏆</h2>
              <p className="text-[#7F8C8D]">
                Acompanhe seu progresso e compartilhe suas vitórias!
              </p>
            </div>

            {/* Objetivos do Dia */}
            <Card className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#27AE60] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5" />
                Objetivos de Hoje
              </h3>
              <div className="space-y-3">
                {dailyGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center gap-3 p-4 bg-[#F7F9F9] rounded-xl border border-[#E8ECEC]">
                    {goal.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#27AE60]" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#7F8C8D]" />
                    )}
                    <span className={goal.completed ? "text-[#1A1A1A]" : "text-[#7F8C8D]"}>{goal.text}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Conquistas */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#27AE60] flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Suas Conquistas ({completedAchievements}/{achievements.length})
              </h3>
              <div className="grid gap-3">
                {achievements.map((achievement) => (
                  <button
                    key={achievement.id}
                    onClick={() => toggleAchievement(achievement.id)}
                    className={`p-5 rounded-2xl border-2 transition-all text-left shadow-sm hover:shadow-md ${
                      achievement.completed
                        ? "bg-[#27AE60]/10 border-[#27AE60]"
                        : "bg-white border-[#E8ECEC] hover:border-[#27AE60]/50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full ${achievement.completed ? "bg-[#27AE60]" : "bg-[#F7F9F9]"}`}>
                        {achievement.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <div className="text-[#7F8C8D]">{achievement.icon}</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold text-lg ${achievement.completed ? "text-[#1A1A1A]" : "text-[#7F8C8D]"}`}>
                          {achievement.title}
                        </h4>
                        <p className="text-sm text-[#7F8C8D]">{achievement.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Compartilhar */}
            <Card className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#27AE60] mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Compartilhe seu Progresso
              </h3>
              <p className="text-[#7F8C8D] text-sm mb-4">
                Inspire outras pessoas compartilhando suas conquistas nas redes sociais!
              </p>
              <Button className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-6 rounded-2xl shadow-lg">
                <Share2 className="w-5 h-5 mr-2" />
                Compartilhar no Instagram
              </Button>
            </Card>

            {/* Comunidade */}
            <Card className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#27AE60] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Comunidade de Especialistas
              </h3>
              <p className="text-[#7F8C8D] text-sm mb-4">
                Tire suas dúvidas com profissionais qualificados!
              </p>
              <div className="space-y-3">
                <Button className="w-full bg-white hover:bg-[#F7F9F9] text-[#1A1A1A] border-2 border-[#E8ECEC] font-semibold py-5 rounded-2xl justify-start shadow-sm hover:shadow-md">
                  <ChefHat className="w-5 h-5 mr-3 text-[#27AE60]" />
                  Perguntar ao Nutricionista
                </Button>
                <Button className="w-full bg-white hover:bg-[#F7F9F9] text-[#1A1A1A] border-2 border-[#E8ECEC] font-semibold py-5 rounded-2xl justify-start shadow-sm hover:shadow-md">
                  <Heart className="w-5 h-5 mr-3 text-[#27AE60]" />
                  Perguntar ao Médico do Esporte
                </Button>
                <Button className="w-full bg-white hover:bg-[#F7F9F9] text-[#1A1A1A] border-2 border-[#E8ECEC] font-semibold py-5 rounded-2xl justify-start shadow-sm hover:shadow-md">
                  <Dumbbell className="w-5 h-5 mr-3 text-[#27AE60]" />
                  Perguntar ao Personal Trainer
                </Button>
              </div>
            </Card>

            {/* Avaliação do App */}
            <Card className="bg-white border-0 shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-[#27AE60] mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Avalie o AtiveMind
              </h3>
              <p className="text-[#7F8C8D] text-sm mb-4">
                Sua opinião é muito importante para nós! Como está sendo sua experiência?
              </p>
              
              {/* Rating Stars */}
              <div className="flex gap-2 mb-4 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setAppRating(star)}
                    className="transition-all hover:scale-110"
                  >
                    <Star
                      className={`w-10 h-10 ${
                        star <= appRating
                          ? "fill-[#27AE60] text-[#27AE60]"
                          : "text-[#E8ECEC]"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Review Text */}
              <Textarea
                placeholder="Conte-nos sobre sua experiência com o AtiveMind..."
                value={appReview}
                onChange={(e) => setAppReview(e.target.value)}
                className="bg-[#F7F9F9] border-[#E8ECEC] text-[#1A1A1A] placeholder:text-[#7F8C8D] mb-4 min-h-[100px] rounded-2xl"
              />

              <Button className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-4 rounded-2xl shadow-lg">
                Enviar avaliação
              </Button>
            </Card>

            {/* Mensagem Motivacional */}
            {userProfile.futureAchievement && (
              <Card className="bg-[#27AE60]/10 border-2 border-[#27AE60] shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-[#27AE60] mb-3">🎯 Sua Meta:</h3>
                <p className="text-[#1A1A1A] italic">"{userProfile.futureAchievement}"</p>
                <p className="text-[#7F8C8D] text-sm mt-3">Continue firme! Você está no caminho certo! 💪</p>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
