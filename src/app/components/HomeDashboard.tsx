"use client";

import { Card } from "@/components/ui/card";
import { Target, Dumbbell, Apple, Brain } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function HomeDashboard() {
  const router = useRouter();

  const cards = [
    {
      id: "habitos",
      title: "Hábitos do Dia",
      subtitle: "Crie sua rotina saudável",
      icon: <Target className="w-10 h-10 text-[#27AE60]" />,
      path: "/habitos",
      gradient: "from-[#27AE60]/10 to-[#27AE60]/5",
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop&q=80",
    },
    {
      id: "treinos",
      title: "Treinos Personalizados",
      subtitle: "Sessões rápidas e eficientes",
      icon: <Dumbbell className="w-10 h-10 text-[#27AE60]" />,
      path: "/treinos",
      gradient: "from-[#27AE60]/10 to-[#27AE60]/5",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop&q=80",
    },
    {
      id: "alimentacao",
      title: "Alimentação Inteligente",
      subtitle: "Analise e registre suas refeições",
      icon: <Apple className="w-10 h-10 text-[#27AE60]" />,
      path: "/alimentacao",
      gradient: "from-[#27AE60]/10 to-[#27AE60]/5",
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop&q=80",
    },
    {
      id: "mind",
      title: "Mind & Bem-estar",
      subtitle: "Conquistas, humor e foco diário",
      icon: <Brain className="w-10 h-10 text-[#27AE60]" />,
      path: "/mind",
      gradient: "from-[#27AE60]/10 to-[#27AE60]/5",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold text-[#27AE60]">
            Bem-vindo à AtiveMind
          </h1>
          <p className="text-[#7F8C8D] text-xl max-w-2xl mx-auto leading-relaxed">
            Sua jornada de transformação começa aqui. Escolha uma área e dê o primeiro passo.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card) => (
            <Card
              key={card.id}
              onClick={() => router.push(card.path)}
              className="group bg-white border border-[#E8ECEC] hover:border-[#27AE60] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
            >
              <div className="space-y-0">
                {/* Image Container */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Icon Overlay */}
                  <div className={`absolute bottom-4 left-4 w-16 h-16 rounded-xl bg-gradient-to-br ${card.gradient} backdrop-blur-sm bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    {card.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h2 className="text-2xl font-bold text-[#27AE60] group-hover:text-[#229954] transition-colors">
                    {card.title}
                  </h2>
                  <p className="text-[#7F8C8D] text-base leading-relaxed">
                    {card.subtitle}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="flex items-center text-[#27AE60] font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300 pt-2">
                    <span>Começar</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white border border-[#E8ECEC] rounded-2xl px-8 py-4 shadow-lg">
            <p className="text-[#7F8C8D] text-sm">
              💚 Construa hábitos que transformam vidas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
