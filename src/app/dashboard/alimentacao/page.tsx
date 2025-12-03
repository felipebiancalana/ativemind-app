"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Apple,
  Camera,
  BarChart3,
  Coffee,
  Utensils,
  ChefHat,
  ArrowLeft,
  Stethoscope
} from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function AlimentacaoPage() {
  const router = useRouter();
  const [caloriesConsumed] = useState(1450);
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
      id: "nutricionista",
      name: "Marina Santos",
      role: "Nutricionista",
      certification: "CRN-3 45678",
      description: "Nutricionista especializada em nutrição esportiva e emagrecimento saudável. Mestre em Ciências da Nutrição pela UNIFESP.",
      icon: <Apple className="w-6 h-6" />
    },
    {
      id: "medico",
      name: "Dra. Ana Paula Costa",
      role: "Médica do Esporte",
      certification: "CRM 98765/SP",
      description: "Médica especializada em medicina esportiva e reabilitação. Pós-graduada em Nutrologia Esportiva.",
      icon: <Stethoscope className="w-6 h-6" />
    },
  ];

  const caloriesPercentage = (caloriesConsumed / caloriesGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-white">
      {/* Hero Banner com Foto de Fundo */}
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop')" }}>
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
          <h1 className="text-4xl font-bold text-white">Alimentação Inteligente</h1>
          <p className="text-white/90 text-lg mt-2">Acompanhe suas calorias e nutrição</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Contador de Calorias */}
          <Card className="bg-white border border-[#E8ECEC] p-8 rounded-2xl shadow-lg">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#27AE60]">Calorias de Hoje</h3>
                <BarChart3 className="w-6 h-6 text-[#27AE60]" />
              </div>
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-[#27AE60]">{caloriesConsumed}</div>
                <div className="text-[#7F8C8D] text-lg">de {caloriesGoal} kcal</div>
              </div>
              <div className="h-4 bg-[#F7F9F9] rounded-full overflow-hidden border border-[#E8ECEC]">
                <div 
                  className="h-full bg-gradient-to-r from-[#27AE60] to-[#229954] transition-all duration-500"
                  style={{ width: `${Math.min(caloriesPercentage, 100)}%` }}
                />
              </div>
            </div>
          </Card>

          {/* Análise por Foto */}
          <Card className="bg-white border border-[#E8ECEC] p-8 rounded-2xl shadow-lg">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#27AE60] flex items-center gap-2">
                <Camera className="w-6 h-6" />
                Análise de Refeição por Foto
              </h3>
              <p className="text-[#7F8C8D] text-base leading-relaxed">
                Tire uma foto da sua refeição e receba informações nutricionais instantâneas!
              </p>
              <Button className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold py-7 rounded-full shadow-lg">
                <Camera className="w-5 h-5 mr-2" />
                Tirar foto da refeição
              </Button>
            </div>
          </Card>

          {/* Seletor de Refeição */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#1A1A1A]">Sugestões por Refeição</h3>
            <div className="grid grid-cols-2 gap-4">
              {meals.map((meal) => (
                <button
                  key={meal.id}
                  onClick={() => setSelectedMeal(meal.id as any)}
                  className={`p-6 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md ${
                    selectedMeal === meal.id
                      ? "border-[#27AE60] bg-[#27AE60]/10"
                      : "border-[#E8ECEC] bg-white hover:border-[#27AE60]/50"
                  }`}
                >
                  <div className={`mb-3 ${selectedMeal === meal.id ? "text-[#27AE60]" : "text-[#7F8C8D]"}`}>
                    {meal.icon}
                  </div>
                  <div className="text-sm font-bold text-[#1A1A1A]">{meal.name}</div>
                  <div className="text-xs text-[#7F8C8D] mt-1">{meal.time}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sugestões */}
          <Card className="bg-white border border-[#E8ECEC] p-8 rounded-2xl shadow-lg">
            <h3 className="text-xl font-bold text-[#27AE60] mb-6">Sugestões para {meals.find(m => m.id === selectedMeal)?.name}</h3>
            <div className="space-y-3">
              {mealSuggestions[selectedMeal].map((suggestion, index) => (
                <div key={index} className="p-5 bg-[#F7F9F9] rounded-xl text-[#1A1A1A] border border-[#E8ECEC] text-base">
                  {suggestion}
                </div>
              ))}
            </div>
          </Card>

          {/* Dicas */}
          <Card className="bg-[#27AE60]/10 border-2 border-[#27AE60] p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-[#27AE60] mb-3">💡 Dica do Dia</h3>
            <p className="text-[#1A1A1A] text-base leading-relaxed">
              Beba água antes das refeições para melhorar a digestão e aumentar a sensação de saciedade!
            </p>
          </Card>

          {/* Profissionais */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-[#1A1A1A]">Profissionais Certificados</h3>
            <div className="space-y-4">
              {professionals.map((professional) => (
                <Card key={professional.id} className="bg-white border border-[#E8ECEC] p-8 rounded-2xl shadow-lg">
                  <div className="space-y-3">
                    <div className="flex items-start gap-4">
                      <div className="p-4 bg-[#27AE60]/10 rounded-2xl text-[#27AE60]">
                        {professional.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-[#1A1A1A]">{professional.name}</h4>
                        <p className="text-sm text-[#27AE60] font-semibold mb-1">{professional.role}</p>
                        <p className="text-xs text-[#7F8C8D] mb-2">Registro: {professional.certification}</p>
                        <p className="text-sm text-[#7F8C8D] leading-relaxed">{professional.description}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
