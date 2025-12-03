"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

type WelcomeScreenProps = {
  onStart: () => void;
};

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9F9] to-white flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8">
        {/* Hero Image/Banner */}
        <div className="relative h-64 rounded-3xl overflow-hidden bg-gradient-to-br from-[#27AE60] to-[#229954] flex items-center justify-center shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=600&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 text-center space-y-4 p-6">
            <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="w-10 h-10 text-[#27AE60]" />
            </div>
            <h1 className="text-4xl font-bold text-white">AtiveMind</h1>
          </div>
        </div>

        {/* Content Card */}
        <Card className="bg-white border-0 shadow-xl p-8 rounded-3xl space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">
              Bem-vindo ao seu novo estilo de vida
            </h2>
            <p className="text-[#7F8C8D] text-lg leading-relaxed">
              Sua plataforma de bem-estar para o corpo e a mente.
            </p>
          </div>

          {/* Buttons */}
          <div className="space-y-4 pt-4">
            <Button
              onClick={onStart}
              className="w-full bg-[#27AE60] hover:bg-[#229954] text-white font-bold text-lg py-7 rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Entrar
            </Button>
            <Button
              onClick={onStart}
              variant="outline"
              className="w-full bg-white border-2 border-[#27AE60] text-[#27AE60] hover:bg-[#27AE60]/10 font-bold text-lg py-7 rounded-full transition-all"
            >
              Criar conta
            </Button>
          </div>

          {/* Features */}
          <div className="pt-6 space-y-3 border-t border-[#E8ECEC]">
            <div className="flex items-center gap-3 text-[#7F8C8D]">
              <div className="w-2 h-2 rounded-full bg-[#27AE60]"></div>
              <span className="text-sm">Treinos personalizados</span>
            </div>
            <div className="flex items-center gap-3 text-[#7F8C8D]">
              <div className="w-2 h-2 rounded-full bg-[#27AE60]"></div>
              <span className="text-sm">Alimentação inteligente</span>
            </div>
            <div className="flex items-center gap-3 text-[#7F8C8D]">
              <div className="w-2 h-2 rounded-full bg-[#27AE60]"></div>
              <span className="text-sm">Hábitos saudáveis</span>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-sm text-[#7F8C8D]">
          Transforme sua vida, um dia de cada vez ✨
        </p>
      </div>
    </div>
  );
}
